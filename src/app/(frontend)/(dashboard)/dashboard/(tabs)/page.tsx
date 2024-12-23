import { Metadata } from 'next'

import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'

import { fetchMe } from '@dashboard/api/fetchMe'
import { fetchProjects } from '@dashboard/api/fetchProjects'
import { fetchTemplates } from '@dashboard/api/fetchTemplates'

import { CloudPage } from './page_client.js'

export default async function Page() {
  const { user } = await fetchMe()

  const projectsRes = await fetchProjects(
    user?.teams?.map(({ team }) =>
      team && typeof team === 'object' ? team.id : team || ''
    ) || []
  )

  const templates = await fetchTemplates()

  return (
    <CloudPage initialState={projectsRes} templates={templates} user={user} />
  )
}

export const metadata: Metadata = {
  title: 'Home | Nexweb Dashboard',
  openGraph: mergeOpenGraph({
    title: 'Home | Nexweb Dashboard',
    url: '/dashboard'
  })
}
