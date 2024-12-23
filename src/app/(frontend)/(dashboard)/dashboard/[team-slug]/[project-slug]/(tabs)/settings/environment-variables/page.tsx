import { fetchProjectAndRedirect } from '@dashboard/api/fetchProject'
import { Accordion } from '@components/Accordion'
import { HR } from '@components/HR
import { MaxWidth } from '@components/MaxWidth
import { PRODUCTION_ENVIRONMENT_SLUG } from '@constants.js'
import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'
import { generateRoutePath } from '@dashboard/utils/generate-route-path'
import React from 'react'

import { NoData } from '../_layoutComponents/NoData
import { SectionHeader } from '../_layoutComponents/SectionHeader
import { AddEnvs } from './AddEnvs
import { ManageEnvs } from './ManageEnvs
import { Secret } from './Secret
import classes from './page.module.scss'

export default async ({
  params,
}: {
  params: Promise<{
    'environment-slug': string
    'project-slug': string
    'team-slug': string
  }>
}) => {
  const {
    'environment-slug': environmentSlug = PRODUCTION_ENVIRONMENT_SLUG,
    'project-slug': projectSlug,
    'team-slug': teamSlug,
  } = await params
  const { project, team } = await fetchProjectAndRedirect({
    environmentSlug,
    projectSlug,
    teamSlug,
  })

  return (
    <MaxWidth>
      <SectionHeader className={classes.header} title="Environment Variables" />
      <div className={classes.description}>
        {`For security reasons, any variables you wish to provide to the Admin panel must
        be prefixed with `}
        <code>PAYLOAD_PUBLIC_</code>
        {'. '}
        <a
          className={classes.link}
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/docs/admin/webpack#admin-environment-vars`}
          rel="noopener noreferrer"
          target="_blank"
        >
          Learn more
        </a>
        .
      </div>
      <React.Fragment>
        <Accordion label="New variables" openOnInit>
          <AddEnvs
            environmentSlug={environmentSlug}
            envs={project?.environmentVariables}
            projectID={project?.id}
          />
        </Accordion>
        <HR />
        {(project?.environmentVariables || []).length === 0 ? (
          <NoData message="This project currently has no environment variables." />
        ) : (
          <ManageEnvs
            environmentSlug={environmentSlug}
            envs={project?.environmentVariables}
            projectID={project?.id}
          />
        )}
      </React.Fragment>
      <HR />
      <SectionHeader className={classes.header} title="Payload Secret" />
      <div className={classes.description}>
        {`This is a secure string used to authenticate with Payload. It was automatically generated
        for you when this project was created. `}
        <a
          className={classes.link}
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/docs/getting-started/installation`}
          rel="noopener noreferrer"
          target="_blank"
        >
          Learn more
        </a>
        .
      </div>
      <Secret project={project} />
    </MaxWidth>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    'environment-slug': string
    'project-slug': string
    'team-slug': string
  }>
}) {
  const {
    'environment-slug': environmentSlug = PRODUCTION_ENVIRONMENT_SLUG,
    'project-slug': projectSlug,
    'team-slug': teamSlug,
  } = await params
  return {
    openGraph: mergeOpenGraph({
      title: 'Environment Variables',
      url: generateRoutePath({
        environmentSlug,
        projectSlug,
        suffix: 'settings/environment-variables',
        teamSlug,
      }),
    }),
    title: 'Environment Variables',
  }
}
