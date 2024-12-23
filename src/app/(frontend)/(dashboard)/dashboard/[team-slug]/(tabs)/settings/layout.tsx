import * as React from 'react'

import { Gutter } from '@components/Gutter'
import { fetchTeamWithCustomer } from '@dashboard/api/fetchTeam'
import { Sidebar } from '@dashboard/Sidebar'

import classes from './layout.module.scss'
import { TeamBillingMessages } from './TeamBillingMessages'

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
    <Gutter className="grid">
      <div className="cols-4 cols-m-8">
        <Sidebar
          routes={[
            {
              label: 'General',
              url: `/${DASHBOARD_SLUG}/${teamSlug}/settings`
            },
            {
              label: 'Team Members',
              url: `/${DASHBOARD_SLUG}/${teamSlug}/settings/members`
            },
            {
              label: 'Billing',
              url: `/${DASHBOARD_SLUG}/${teamSlug}/settings/billing`
            },
            {
              label: 'Subscriptions',
              url: `/${DASHBOARD_SLUG}/${teamSlug}/settings/subscriptions`
            },
            {
              label: 'Invoices',
              url: `/${DASHBOARD_SLUG}/${teamSlug}/settings/invoices`
            }
          ]}
        />
      </div>
      <div className="cols-12">
        <TeamBillingMessages team={team} />
        {children}
      </div>
    </Gutter>
  )
}
