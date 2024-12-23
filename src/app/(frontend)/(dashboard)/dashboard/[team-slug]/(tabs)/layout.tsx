import React from 'react'

import { fetchTeamWithCustomer } from '@cloud/_api/fetchTeam.js'
import { teamHasDefaultPaymentMethod } from '@cloud/_utilities/teamHasDefaultPaymentMethod.js'
import { cloudSlug } from '@cloud/slug.js'
import { DashboardTabs } from '@root/app/(frontend)/(dashboard)/~/components/DashboardTabs'

import { Gutter } from '@components/Gutter'

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
              href: `/${cloudSlug}/${teamSlug}/settings`,
              label: 'Team Settings',
              subpaths: [
                `/${cloudSlug}/${teamSlug}/settings/members`,
                `/${cloudSlug}/${teamSlug}/settings/subscriptions`,
                `/${cloudSlug}/${teamSlug}/settings/billing`,
                `/${cloudSlug}/${teamSlug}/settings/invoices`
              ]
            },
            [teamSlug]: {
              href: `/${cloudSlug}/${teamSlug}`,
              label: 'Team Projects'
            }
          }}
        />
      </Gutter>
      {children}
    </React.Fragment>
  )
}
