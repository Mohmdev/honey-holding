import { Suspense } from 'react'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'

import { Spinner } from '@components/Spinner'

import { Signup } from './page_client'

import { getMeUser } from '@data/getMeUser'

export default async function SignUpPage({
  searchParams
}: {
  searchParams: { email?: string; redirect?: string }
}) {
  const { user } = await getMeUser()

  if (user) {
    redirect(
      `/dashboard?error=${encodeURIComponent('You must be logged out to sign up')}`
    )
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Signup email={searchParams.email} redirectPath={searchParams.redirect} />
    </Suspense>
  )
}

export const metadata: Metadata = {
  title: 'Signup | Nexweb Cloud',
  description: 'Signup for Nexweb Cloud',
  openGraph: mergeOpenGraph({
    title: 'Signup | Nexweb Cloud',
    url: '/signup'
  })
}
