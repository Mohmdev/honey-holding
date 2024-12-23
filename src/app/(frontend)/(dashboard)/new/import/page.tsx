import { Fragment } from 'react'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'
import { uuid as generateUUID } from '@utils/uuid.js'

import { Breadcrumbs } from '@components/Breadcrumbs'
import { Gutter } from '@components/Gutter'
import { Heading } from '@components/Heading'
import { fetchGitHubToken } from '@dashboard/api/fetchGitHubToken.js'
import { fetchInstalls } from '@dashboard/api/fetchInstalls'
import { fetchMe } from '@dashboard/api/fetchMe.js'
import { fetchRepos, Repo, RepoResults } from '@dashboard/api/fetchRepos.js'

import { ImportProject } from './page_client.js'

const title = `Import a codebase`

export default async () => {
  const { user } = await fetchMe()

  if (!user) {
    redirect(
      `/login?redirect=${encodeURIComponent('/new/import')}&warning=${encodeURIComponent(
        'You must first login to import a repository'
      )}`
    )
  }

  const token = await fetchGitHubToken()

  if (!token) {
    redirect(`/new/authorize?redirect=${encodeURIComponent(`/new/import`)}`)
  }

  const installs = await fetchInstalls()

  let repos: RepoResults | undefined

  if (Array.isArray(installs) && installs.length > 0) {
    repos = await fetchRepos({
      install: installs[0]
    })
  }

  const uuid = generateUUID()

  return (
    <Fragment>
      <Gutter>
        <h2>{title}</h2>
      </Gutter>
      <ImportProject
        installs={installs}
        repos={repos}
        uuid={uuid}
        user={user}
      />
    </Fragment>
  )
}

export const metadata: Metadata = {
  title: 'Import Project | Payload Cloud',
  openGraph: mergeOpenGraph({
    title: 'Import Project | Payload Cloud',
    url: '/new/import'
  })
}
