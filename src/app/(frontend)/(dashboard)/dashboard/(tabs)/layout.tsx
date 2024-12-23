import { Fragment } from 'react'

import { cloudSlug } from '@cloud/slug.js'
import { DashboardTabs } from '@root/app/(frontend)/(dashboard)/~/components/DashboardTabs'

import { Gutter } from '@components/Gutter'

export default async (props) => {
  const { children } = props

  return (
    <Fragment>
      <Gutter>
        <h2>Cloud</h2>
        <DashboardTabs
          tabs={{
            [cloudSlug]: {
              href: `/${cloudSlug}`,
              label: 'Projects'
            },
            teams: {
              label: 'Teams',
              href: `/${cloudSlug}/teams`
            },
            settings: {
              label: 'Settings',
              href: `/${cloudSlug}/settings`
            }
          }}
        />
      </Gutter>
      {children}
    </Fragment>
  )
}
