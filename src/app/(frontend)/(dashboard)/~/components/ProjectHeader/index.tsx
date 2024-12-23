'use client'

import React from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'

import { cloudSlug } from '@cloud/slug.js'
import { generateRoutePath } from '@utilities/generate-route-path'

import { Select } from '@forms/fields/Select'
import Form from '@forms/Form'

import classes from './index.module.scss'

import { PRODUCTION_ENVIRONMENT_SLUG } from '@constants.js'

export function ProjectHeader({ environmentOptions, title }) {
  const {
    'environment-slug': environmentSlug = PRODUCTION_ENVIRONMENT_SLUG,
    'project-slug': projectSlug,
    'team-slug': teamSlug
  }: { [key: string]: string } = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const baseProjectURL = `/${cloudSlug}/${teamSlug}/${projectSlug}`

  const handleEnvironmentChange = React.useCallback(
    (environmentToSet: string) => {
      if (environmentToSet !== environmentSlug) {
        const routeSegment = pathname
          .replace(baseProjectURL, '')
          .replace(`/env/${environmentSlug}`, '')
        router.push(
          generateRoutePath({
            environmentSlug:
              environmentToSet !== PRODUCTION_ENVIRONMENT_SLUG
                ? environmentToSet
                : undefined,
            projectSlug,
            suffix: routeSegment,
            teamSlug
          })
        )
      }
    },
    [baseProjectURL, environmentSlug, pathname, projectSlug, router, teamSlug]
  )

  return (
    <div className={classes.projectHeader}>
      <h3>{title}</h3>
      {Array.isArray(environmentOptions) && environmentOptions.length > 1 && (
        <div className={classes.projectHeader__environmentSelector}>
          <Form
            initialState={{
              environment: {
                errorMessage: '',
                initialValue: environmentSlug,
                valid: true,
                value: environmentSlug
              }
            }}
          >
            <Select
              className={classes.projectHeader__environmentSelector__select}
              initialValue={environmentSlug}
              isSearchable={false}
              label="Environment:"
              name="environment"
              onChange={handleEnvironmentChange}
              options={environmentOptions}
              path="environment"
              value={environmentSlug}
            />
          </Form>
        </div>
      )}
    </div>
  )
}
