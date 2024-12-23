import * as React from 'react'

import { Gutter } from '@components/Gutter'
import { Sidebar } from '@dashboard/components/Sidebar'
import { generateRoutePath } from '@dashboard/utils/generate-route-path'

import { PRODUCTION_ENVIRONMENT_SLUG } from '@constants'

const settingsSlug = 'settings'

export default async function layout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{
    'environment-slug': string
    'project-slug': string
    'team-slug': string
  }>
}) {
  const {
    'environment-slug': environmentSlug = PRODUCTION_ENVIRONMENT_SLUG,
    'project-slug': projectSlug,
    'team-slug': teamSlug
  } = await params
  return (
    <Gutter className="grid">
      <div className="cols-4 cols-m-8">
        <Sidebar
          routes={[
            {
              label: 'General',
              url: generateRoutePath({
                environmentSlug,
                projectSlug,
                suffix: settingsSlug,
                teamSlug
              })
            },
            {
              label: 'Environment Variables',
              url: generateRoutePath({
                environmentSlug,
                projectSlug,
                suffix: 'settings/environment-variables',
                teamSlug
              })
            },
            {
              label: 'Domains',
              url: generateRoutePath({
                environmentSlug,
                projectSlug,
                suffix: 'settings/domains',
                teamSlug
              })
            },
            {
              label: 'Email',
              url: generateRoutePath({
                environmentSlug,
                projectSlug,
                suffix: 'settings/email',
                teamSlug
              })
            },
            {
              label: 'Ownership',
              url: generateRoutePath({
                environmentSlug,
                projectSlug,
                suffix: 'settings/ownership',
                teamSlug
              })
            },
            {
              label: 'Plan',
              url: generateRoutePath({
                environmentSlug,
                projectSlug,
                suffix: 'settings/plan',
                teamSlug
              })
            },
            {
              label: 'Billing',
              url: generateRoutePath({
                environmentSlug,
                projectSlug,
                suffix: 'settings/billing',
                teamSlug
              })
            }
          ]}
        />
      </div>
      <div className="cols-12 cols-m-8">{children}</div>
    </Gutter>
  )
}
