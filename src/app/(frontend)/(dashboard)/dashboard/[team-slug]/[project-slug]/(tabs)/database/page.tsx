import { Metadata } from 'next'

import { fetchProjectAndRedirect } from '@cloud/_api/fetchProject.js'

import { ProjectDatabasePage } from './page_client.js'

import { PRODUCTION_ENVIRONMENT_SLUG } from '@constants.js'

export default async ({
  params
}: {
  params: Promise<{
    'team-slug': string
    'project-slug': string
    'environment-slug': string
  }>
}) => {
  const {
    'team-slug': teamSlug,
    'project-slug': projectSlug,
    'environment-slug': environmentSlug = PRODUCTION_ENVIRONMENT_SLUG
  } = await params
  const { team, project } = await fetchProjectAndRedirect({
    teamSlug,
    projectSlug,
    environmentSlug
  })

  return (
    <ProjectDatabasePage
      project={project}
      team={team}
      environmentSlug={environmentSlug}
    />
  )
}

export const metadata: Metadata = {
  title: 'Database'
}