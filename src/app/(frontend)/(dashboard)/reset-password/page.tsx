import { Suspense } from 'react'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'

import { Spinner } from '@components/Spinner'

import { ResetPassword } from './page_client'

import { getMeUser } from '@data/getMeUser'

export default async function ResetPasswordPage({
  searchParams
}: {
  searchParams: { token?: string }
}) {
  const { user } = await getMeUser()
  const token = searchParams.token

  if (user) {
    redirect(
      `/dashboard?error=${encodeURIComponent('You must be logged out to reset your password')}`
    )
  }

  if (!token) {
    redirect(`/forgot-password?error=${encodeURIComponent('Missing token')}`)
  }

  return (
    <Suspense fallback={<Spinner />}>
      <ResetPassword token={token} />
    </Suspense>
  )
}

export const metadata: Metadata = {
  title: 'Reset Password | Nexweb Cloud',
  description: 'Reset your Nexweb account password',
  openGraph: mergeOpenGraph({
    title: 'Reset Password | Nexweb Cloud',
    url: '/reset-password'
  })
}
