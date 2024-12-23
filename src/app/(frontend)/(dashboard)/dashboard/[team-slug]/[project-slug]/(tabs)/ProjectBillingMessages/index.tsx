import React from 'react'

import { Gutter } from '@components/Gutter'
import { ProjectWithSubscription } from '@dashboard/api/fetchProject'
import { TeamWithCustomer } from '@dashboard/api/fetchTeam'
import { hasBadSubscription } from '@dashboard/utils/hasBadSubscription'
import { projectHasPaymentMethod } from '@dashboard/utils/projectHasPaymentMethod'
import { teamHasDefaultPaymentMethod } from '@dashboard/utils/teamHasDefaultPaymentMethod'

import { BadSubscriptionMessage } from './BadSubscription'
import classes from './index.module.scss'
import { MissingPaymentMethodMessage } from './MissingPaymentMethod'
import { TrialMessage } from './TrialMessage'

export const ProjectBillingMessages: React.FC<{
  team: TeamWithCustomer
  project: ProjectWithSubscription
}> = ({ team, project }) => {
  const isTrialing = Boolean(
    project?.stripeSubscriptionStatus === 'trialing' &&
      project?.stripeSubscription?.trial_end
  )

  // check if this plan is free, and do not show a message if it is
  // some plans are have pricing that is different than what is offered in the UI
  // so instead of checking `project.plan` we check the amount of the `stripeSubscription`
  const isFreeTier = !project.stripeSubscription?.plan?.amount // could be `0` or `null`

  if (isFreeTier) {
    return null
  }

  const hasBadSubscriptionStatus = hasBadSubscription(
    project?.stripeSubscriptionStatus
  )

  const hasPaymentError =
    !projectHasPaymentMethod(project) && !teamHasDefaultPaymentMethod(team)

  if (hasBadSubscriptionStatus) {
    return (
      <Gutter className={classes.billingMessages}>
        <BadSubscriptionMessage team={team} project={project} />
      </Gutter>
    )
  }

  if (isTrialing) {
    return (
      <Gutter className={classes.billingMessages}>
        <TrialMessage team={team} project={project} />
      </Gutter>
    )
  }

  if (hasPaymentError) {
    return (
      <Gutter className={classes.billingMessages}>
        <MissingPaymentMethodMessage team={team} project={project} />
      </Gutter>
    )
  }

  return null
}
