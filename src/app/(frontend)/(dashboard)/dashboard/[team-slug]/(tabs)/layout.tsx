import React from 'react'

import { teamHasDefaultPaymentMethod } from '@cloud/_utilities/teamHasDefaultPaymentMethod.js'
import { DashboardTabs } from '@root/app/(frontend)/(dashboard)/~/components/DashboardTabs'

import { Gutter } from '@components/Gutter'
import { fetchTeamWithCustomer } from '@dashboard/api/fetchTeam'

import { DASHBOARD_SLUG } from '@constants'

export default async ({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{
    'team-slug': string
  }>
}) => {
  const { 'team-slug': teamSlug } = await params

  // Note: this fetch will get deduped by the page
  // each page within this layout calls this same function
  // Next.js will only call it once
  const team = await fetchTeamWithCustomer(teamSlug)

  return (
    <React.Fragment>
      <Gutter>
        <h2>{team.name}</h2>
        <DashboardTabs
          tabs={{
            settings: {
              error:
                !teamHasDefaultPaymentMethod(team) &&
                team?.hasPublishedProjects,
              href: `/${DASHBOARD_SLUG}/${teamSlug}/settings`,
              label: 'Team Settings',
              subpaths: [
                `/${DASHBOARD_SLUG}/${teamSlug}/settings/members`,
                `/${DASHBOARD_SLUG}/${teamSlug}/settings/subscriptions`,
                `/${DASHBOARD_SLUG}/${teamSlug}/settings/billing`,
                `/${DASHBOARD_SLUG}/${teamSlug}/settings/invoices`
              ]
            },
            [teamSlug]: {
              href: `/${DASHBOARD_SLUG}/${teamSlug}`,
              label: 'Team Projects'
            }
          }}
        />
      </Gutter>
      {children}
    </React.Fragment>
  )
}
