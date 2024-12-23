import * as React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'
import { checkTeamRoles } from '@utils/check-team-roles.js'

import { Text } from '@forms/fields/Text'

import { Heading } from '@components/Heading'
import { MaxWidth } from '@components/MaxWidth'
import { Message } from '@components/Message'
import { fetchMe } from '@dashboard/api/fetchMe.js'
import { fetchPaymentMethods } from '@dashboard/api/fetchPaymentMethods.js'
import {
  fetchProjectAndRedirect,
  ProjectWithSubscription
} from '@dashboard/api/fetchProject'
import { ProjectPaymentMethodSelector } from '@dashboard/CreditCardSelector/ProjectPaymentMethodSelector.js'
import { generateRoutePath } from '@dashboard/utils/generate-route-path'

import { SectionHeader } from '../_layoutComponents/SectionHeader'
import classes from './page.module.scss'

import { DASHBOARD_SLUG, PRODUCTION_ENVIRONMENT_SLUG } from '@constants'

const statusLabels = {
  active: 'Active',
  canceled: 'Canceled',
  incomplete: 'Incomplete',
  incomplete_expired: 'Incomplete Expired',
  past_due: 'Past Due',
  trialing: 'Trialing',
  unpaid: 'Unpaid',
  paused: 'Paused',
  unknown: 'Unknown'
}

export default async ({
  params
}: {
  params: Promise<{
    'team-slug': string
    'project-slug': string
    'environment-slug': string
  }>
}) => {
  const {
    'team-slug': teamSlug,
    'project-slug': projectSlug,
    'environment-slug': environmentSlug = PRODUCTION_ENVIRONMENT_SLUG
  } = await params
  const { user } = await fetchMe()

  const { team, project } = await fetchProjectAndRedirect({
    teamSlug,
    projectSlug,
    environmentSlug
  })

  const isCurrentTeamOwner = checkTeamRoles(user, team, ['owner'])
  const hasCustomerID = team?.stripeCustomerID
  const hasSubscriptionID = project?.stripeSubscriptionID

  const paymentMethods = await fetchPaymentMethods({
    team
  })

  // check if this plan is free, and do not show a message if it is
  // some plans are have pricing that is different than what is offered in the UI
  // so instead of checking `project.plan` we check the amount of the `stripeSubscription`
  const isFreeTier = !project.stripeSubscription?.plan?.amount // could be `0` or `null`

  return (
    <MaxWidth>
      <SectionHeader title="Project billing" className={classes.header} />
      {!hasCustomerID && (
        <p className={classes.error}>
          This team does not have a billing account. Please contact support to
          resolve this issue.
        </p>
      )}
      {!hasSubscriptionID && (
        <p className={classes.error}>
          This project does not have a subscription. Please contact support to
          resolve this issue.
        </p>
      )}
      <div className={classes.fields}>
        <Text
          value={project?.id}
          label="Project ID"
          disabled
          description="This is your project's ID within Payload"
        />
        {hasCustomerID && hasSubscriptionID && (
          <React.Fragment>
            <Text
              disabled
              value={project?.stripeSubscriptionID}
              label="Subscription ID"
              description="This is the ID of the subscription for this project."
            />
            <Text
              value={
                statusLabels?.[project?.stripeSubscriptionStatus || 'unknown']
              }
              label="Subscription Status"
              disabled
            />
            {!isCurrentTeamOwner && (
              <p className={classes.error}>
                You must be an owner of this team to manage billing.
              </p>
            )}
            {isCurrentTeamOwner && (
              <React.Fragment>
                <Heading marginBottom={false} element="h6">
                  Payment Method
                </Heading>
                {isFreeTier && (
                  <Message
                    success={`This project is on a free tier. No billing information is required.`}
                  />
                )}
                <p className={classes.description}>
                  {`Select which card to use for this project. If your payment fails, we will attempt to bill your team's default payment method (if any). To set your team's default payment method or manage all payment methods on file, please visit the `}
                  <Link
                    href={`/${DASHBOARD_SLUG}/${team.slug}/settings/billing`}
                    prefetch={false}
                  >
                    team billing page
                  </Link>
                  {`.`}
                </p>
                <ProjectPaymentMethodSelector
                  team={team}
                  project={project}
                  initialPaymentMethods={paymentMethods}
                />
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </div>
    </MaxWidth>
  )
}

export async function generateMetadata({
  params
}: {
  params: Promise<{
    'team-slug': string
    'project-slug': string
    'environment-slug': string
  }>
}): Promise<Metadata> {
  const {
    'team-slug': teamSlug,
    'project-slug': projectSlug,
    'environment-slug': environmentSlug = PRODUCTION_ENVIRONMENT_SLUG
  } = await params
  return {
    title: 'Billing',
    openGraph: mergeOpenGraph({
      title: 'Billing',
      url: generateRoutePath({
        teamSlug,
        projectSlug,
        environmentSlug,
        suffix: 'settings/billing'
      })
    })
  }
}
