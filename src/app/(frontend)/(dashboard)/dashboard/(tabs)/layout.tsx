import React, { Fragment } from 'react'

import { DASHBOARD_SLUG } from '@lib/constants/constants'

import { Gutter } from '@components/Gutter'
import { DashboardTabs } from '@dashboard/components/DashboardTabs'

export default async function Layout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Fragment>
      <Gutter>
        <h2>Dashboard</h2>
        <DashboardTabs
          tabs={{
            teams: {
              label: 'Something',
              href: `/${DASHBOARD_SLUG}/something`
            },
            settings: {
              label: 'Settings',
              href: `/${DASHBOARD_SLUG}/settings`
            }
          }}
        />
      </Gutter>
      {children}
    </Fragment>
  )
}
