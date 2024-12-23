import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'

import { fetchMe } from '@dashboard/api/fetchMe'

import { Login } from './page_client'

export default async function Page() {
  const { user } = await fetchMe()

  if (user) {
    redirect(
      `/cloud?warning=${encodeURIComponent('You are already logged in')}`
    )
  }

  return <Login />
}

export const metadata: Metadata = {
  title: 'Login | Nexweb Cloud',
  description: 'Login to Nexweb Cloud',
  openGraph: mergeOpenGraph({
    title: 'Login | Nexweb Cloud',
    url: '/login'
  })
}
