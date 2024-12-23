import React from 'react'

import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'

import { fetchProjectAndRedirect } from '@dashboard/api/fetchProject'
import { generateRoutePath } from '@dashboard/utils/generate-route-path'

import { ProjectDomainsPage } from './page_client'

import { PRODUCTION_ENVIRONMENT_SLUG } from '@constants'

export default async function Page({
  params
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
    'team-slug': teamSlug
  } = await params
  const { project, team } = await fetchProjectAndRedirect({
    environmentSlug,
    projectSlug,
    teamSlug
  })
  return (
    <ProjectDomainsPage
      environmentSlug={environmentSlug}
      project={project}
      team={team}
    />
  )
}

export async function generateMetadata({
  params
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
    'team-slug': teamSlug
  } = await params
  return {
    openGraph: mergeOpenGraph({
      title: 'Domains',
      url: generateRoutePath({
        environmentSlug,
        projectSlug,
        suffix: 'settings/domains',
        teamSlug
      })
    }),
    title: 'Domains'
  }
}
