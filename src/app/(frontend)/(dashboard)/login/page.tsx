import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'

import { Login } from './page_client'

import { getMeUser } from '@data/getMeUser'

export default async function Page() {
  const { user } = await getMeUser()

  if (user) {
    redirect(
      `/dashboard?warning=${encodeURIComponent('You are already logged in')}`
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
