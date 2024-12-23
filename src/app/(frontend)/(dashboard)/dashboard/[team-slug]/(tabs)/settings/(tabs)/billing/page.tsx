import React from 'react'
import { Metadata } from 'next'

import { SectionHeader } from '@root/app/(frontend)/(dashboard)/dashboard/[team-slug]/[project-slug]/(tabs)/settings/_layoutComponents/SectionHeader'

import { checkTeamRoles } from '@access/check-team-roles'

import { Text } from '@forms/fields/Text'

import HR from '@components/MDX/components/HR'
import { fetchMe } from '@dashboard/api/fetchMe'
import { fetchPaymentMethods } from '@dashboard/api/fetchPaymentMethods'
import { fetchTeamWithCustomer } from '@dashboard/api/fetchTeam'
import { CreditCardList } from '@dashboard/components/CreditCardList'

import classes from './page.module.scss'

export default async function Page({
  params
}: {
  params: Promise<{
    'team-slug': string
  }>
}) {
  const { 'team-slug': teamSlug } = await params
  const { user } = await fetchMe()
  const team = await fetchTeamWithCustomer(teamSlug)

  const isCurrentTeamOwner = checkTeamRoles(user, team, ['owner'])
  const hasCustomerID = team?.stripeCustomerID

  const paymentMethods = await fetchPaymentMethods({ team })

  return (
    <React.Fragment>
      <SectionHeader
        title="Billing"
        intro={
          <React.Fragment>
            {!hasCustomerID && (
              <p className={classes.error}>
                This team does not have a billing account. Please contact
                support to resolve this issue.
              </p>
            )}
          </React.Fragment>
        }
      />
      {hasCustomerID && (
        <React.Fragment>
          {!isCurrentTeamOwner && (
            <p className={classes.error}>
              You must be an owner of this team to manage billing.
            </p>
          )}
          {isCurrentTeamOwner && (
            <React.Fragment>
              <h4>Payment Methods</h4>
              <p>
                The following payment methods are available for this team.
                Projects that do not specify a payment method will use this
                team&apos;s default payment method (if any).
              </p>
              <CreditCardList
                team={team}
                initialPaymentMethods={paymentMethods}
              />
            </React.Fragment>
          )}
          <HR />
          <div className={classes.fields}>
            <Text
              value={team?.stripeCustomerID}
              label="Customer ID"
              disabled
              description="This value was automatically generated when this team was created."
            />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export async function generateMetadata({
  params
}: {
  params: Promise<{
    'team-slug': string
  }>
}): Promise<Metadata> {
  const { 'team-slug': teamSlug } = await params
  return {
    title: `${teamSlug} - Team Billing`,
    openGraph: {
      title: `${teamSlug} - Team Billing`,
      url: `/cloud/${teamSlug}/settings/billing`
    }
  }
}
