import { Fragment } from 'react'

import { Gutter } from '@components/Gutter'
import { DashboardTabs } from '@dashboard/components/DashboardTabs'

import { DASHBOARD_SLUG } from '@constants'

export default async function Layout(props) {
  const { children } = props

  return (
    <Fragment>
      <Gutter>
        <h2>Cloud</h2>
        <DashboardTabs
          tabs={{
            [DASHBOARD_SLUG]: {
              href: `/${DASHBOARD_SLUG}`,
              label: 'Projects'
            },
            teams: {
              label: 'Teams',
              href: `/${DASHBOARD_SLUG}/teams`
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
