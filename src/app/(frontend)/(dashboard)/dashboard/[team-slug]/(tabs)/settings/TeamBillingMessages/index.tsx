'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { teamHasDefaultPaymentMethod } from '@cloud/_utilities/teamHasDefaultPaymentMethod.js'

import { Message } from '@components/Message'
import { TeamWithCustomer } from '@dashboard/api/fetchTeam.js'

import classes from './index.module.scss'

import { DASHBOARD_SLUG } from '@constants'

export const TeamBillingMessages: React.FC<{
  team: TeamWithCustomer
}> = (props) => {
  const { team } = props
  const pathname = usePathname()

  const billingPath = `/${DASHBOARD_SLUG}/${team?.slug}/settings/billing`
  const isOnBillingPage = pathname === billingPath

  if (!teamHasDefaultPaymentMethod(team) && team?.hasPublishedProjects) {
    return (
      <Message
        className={classes.billingMessages}
        error={
          <React.Fragment>
            {'This team does not have a default payment method set. Please '}
            {isOnBillingPage ? (
              <React.Fragment>
                {'add or select a payment method below '}
              </React.Fragment>
            ) : (
              <Link href={billingPath}>add or select a payment method</Link>
            )}
            {' as default to ensure your projects stay online.'}
          </React.Fragment>
        }
      />
    )
  }
  return null
}
