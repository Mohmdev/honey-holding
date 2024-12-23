import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'

import { fetchMe } from '@dashboard/api/fetchMe.js'

import { Login } from './page_client.js'

export default async () => {
  const { user } = await fetchMe()

  if (user) {
    redirect(
      `/cloud?warning=${encodeURIComponent('You are already logged in')}`
    )
  }

  return <Login />
}

export const metadata: Metadata = {
  title: 'Login | Payload Cloud',
  description: 'Login to Payload Cloud',
  openGraph: mergeOpenGraph({
    title: 'Login | Payload Cloud',
    url: '/login'
  })
}
