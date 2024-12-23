import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'

import { fetchMe } from '@dashboard/api/fetchMe.js'

import { Signup } from './page_client.js'

export default async function Page() {
  const { user } = await fetchMe()

  if (user) {
    redirect(
      `/cloud?error=${encodeURIComponent('You must be logged out to sign up')}`
    )
  }

  return <Signup />
}

export const metadata: Metadata = {
  title: 'Signup | Nexweb Cloud',
  description: 'Signup for Nexweb Cloud',
  openGraph: mergeOpenGraph({
    title: 'Signup | Nexweb Cloud',
    url: '/signup'
  })
}
