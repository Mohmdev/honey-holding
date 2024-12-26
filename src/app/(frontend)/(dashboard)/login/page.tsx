import { Suspense } from 'react'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'

import { Spinner } from '@components/Spinner'

import { Login } from './page_client'

import { getMeUser } from '@data/getMeUser'

export default async function Page({
  searchParams
}: {
  searchParams: { email?: string; redirect?: string }
}) {
  const { user } = await getMeUser()

  if (user) {
    redirect(
      `/dashboard?warning=${encodeURIComponent('You are already logged in')}`
    )
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Login email={searchParams.email} redirectPath={searchParams.redirect} />
    </Suspense>
  )
}

export const metadata: Metadata = {
  title: 'Login | Nexweb Dashboard',
  description: 'Login to Nexweb Dashboard',
  openGraph: mergeOpenGraph({
    title: 'Login | Nexweb Dashboard',
    url: '/login'
  })
}
