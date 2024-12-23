import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'

import { fetchGitHubToken } from '@dashboard/api/fetchGitHubToken.js'
import { fetchMe } from '@dashboard/api/fetchMe.js'

import { AuthorizePage } from './page_client.js'

export default async function Page({
  searchParams
}: {
  searchParams: Promise<{
    redirect: string
  }>
}) {
  const { redirect: redirectParam } = await searchParams
  const { user } = await fetchMe()

  if (!user) {
    redirect(
      `/login?redirect=${encodeURIComponent(
        `/new/authorize?redirect=${redirectParam}`
      )}&error=${encodeURIComponent('You must be logged in to authorize with GitHub')}`
    )
  }

  const githubToken = await fetchGitHubToken()

  if (githubToken) {
    redirect(redirectParam || '/new')
  }

  return <AuthorizePage />
}

export const metadata: Metadata = {
  title: 'Authorize | Nexweb Cloud',
  openGraph: mergeOpenGraph({
    title: 'Authorize | Nexweb Cloud',
    url: '/new/authorize'
  })
}
