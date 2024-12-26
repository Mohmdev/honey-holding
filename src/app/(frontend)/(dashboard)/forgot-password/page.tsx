import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'

import { ForgotPassword } from './page_client'

import { getMeUser } from '@data/getMeUser'

export default async function Page() {
  const { user } = await getMeUser()

  if (user) {
    redirect(
      `/dashboard?error=${encodeURIComponent('You must be logged out to reset your password')}`
    )
  }

  return <ForgotPassword />
}

export const metadata: Metadata = {
  title: 'Forgot Password | Nexweb Cloud',
  description: 'If you forgot your password, reset it',
  openGraph: mergeOpenGraph({
    title: 'Forgot Password | Nexweb Cloud',
    url: '/forgot-password'
  })
}
