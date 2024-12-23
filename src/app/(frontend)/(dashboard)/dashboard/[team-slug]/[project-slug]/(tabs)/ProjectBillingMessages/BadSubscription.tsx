'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Message } from '@components/Message'
import { ProjectWithSubscription } from '@dashboard/api/fetchProject'
import { TeamWithCustomer } from '@dashboard/api/fetchTeam.js'
import { Project } from '@dashboard/types'

import { DASHBOARD_SLUG } from '@constants'

export const BadSubscriptionMessage: React.FC<{
  team: TeamWithCustomer
  project: ProjectWithSubscription
}> = (props) => {
  const { team, project } = props
  const subscriptionStatus = project?.stripeSubscriptionStatus

  const pathname = usePathname()

  const billingPath = `/${DASHBOARD_SLUG}/${team?.slug}/${project?.slug}/settings/billing`
  const isOnBillingPage = pathname === billingPath

  return (
    <Message
      error={
        <React.Fragment>
          {'This project has a subscription status of '}
          <strong>{subscriptionStatus}</strong>
          {'. Please '}
          {isOnBillingPage ? (
            <React.Fragment>
              {'update the payment method(s) below'}
            </React.Fragment>
          ) : (
            <Link href={billingPath}>update your payment method(s)</Link>
          )}
          {' to ensure your projects remain online.'}
        </React.Fragment>
      }
    />
  )
}
