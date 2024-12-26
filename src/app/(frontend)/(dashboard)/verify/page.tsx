import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'
import { getServerSideURL } from '@utils/getURL'

// force this component to use dynamic search params, see https://github.com/vercel/next.js/issues/43077
export const dynamic = 'force-dynamic'

type VerifyProps = {
  searchParams: {
    token?: string
    redirect?: string
    email?: string
  }
}

export default async function VerifyPage({ searchParams }: VerifyProps) {
  const { redirect: redirectParam, email: emailParam, token } = searchParams

  // No token provided
  if (!token) {
    redirect(
      `/login?error=${encodeURIComponent(
        'Invalid verification token. Please try again.'
      )}${redirectParam ? `&redirect=${redirectParam}` : ''}${
        emailParam ? `&email=${emailParam}` : ''
      }`
    )
  }

  try {
    const res = await fetch(`${getServerSideURL()}/api/users/verify/${token}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    })

    if (!res.ok) {
      throw new Error('Verification failed')
    }

    const data = await res.json()

    return redirect(
      `/login?success=${encodeURIComponent(
        data.message || 'Your email has been verified. You may now log in.'
      )}${redirectParam ? `&redirect=${redirectParam}` : ''}${
        emailParam ? `&email=${emailParam}` : ''
      }`
    )
  } catch (e) {
    return redirect(
      `/login?error=${encodeURIComponent(
        'Email verification failed. Please try again or contact support.'
      )}${redirectParam ? `&redirect=${redirectParam}` : ''}${
        emailParam ? `&email=${emailParam}` : ''
      }`
    )
  }
}

export const metadata: Metadata = {
  title: 'Verify Email | Nexweb Cloud',
  openGraph: mergeOpenGraph({
    title: 'Verify Email | Nexweb Cloud',
    url: '/verify'
  })
}
