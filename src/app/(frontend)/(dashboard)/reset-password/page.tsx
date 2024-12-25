import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'

import { fetchMe } from '@dashboard/api/fetchMe'

import { ResetPassword } from './page_client'

export default async function Page(props) {
  const { user } = await fetchMe()

  if (user) {
    redirect(
      `/dashboard?error=${encodeURIComponent('You must be logged out to reset your password')}`
    )
  }

  return <ResetPassword {...props} />
}

export const metadata: Metadata = {
  title: 'Reset Password | Nexweb Cloud',
  description: 'Reset your Nexweb account password',
  openGraph: mergeOpenGraph({
    title: 'Reset Password | Nexweb Cloud',
    url: '/reset-password'
  })
}
