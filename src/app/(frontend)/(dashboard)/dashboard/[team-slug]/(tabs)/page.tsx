import { Metadata } from 'next'

import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'

import { fetchProjects } from '@dashboard/api/fetchProjects'
import { fetchTeamWithCustomer } from '@dashboard/api/fetchTeam'
import { fetchTemplates } from '@dashboard/api/fetchTemplates'

import { TeamPage } from './page_client'

export default async function Page({
  params
}: {
  params: Promise<{
    'team-slug': string
  }>
}) {
  const { 'team-slug': teamSlug } = await params
  const team = await fetchTeamWithCustomer(teamSlug)
  const projectsRes = await fetchProjects([team?.id])

  const templates = await fetchTemplates()

  return (
    <TeamPage team={team} initialState={projectsRes} templates={templates} />
  )
}

export async function generateMetadata({
  params
}: {
  params: Promise<{
    'team-slug': string
  }>
}): Promise<Metadata> {
  const { 'team-slug': teamSlug } = await params
  return {
    title: `${teamSlug} - Team Projects`,
    openGraph: mergeOpenGraph({
      title: `${teamSlug} - Team Projects`,
      url: `/cloud/${teamSlug}`
    })
  }
}
