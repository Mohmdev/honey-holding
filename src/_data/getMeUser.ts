import { redirect } from 'next/navigation'

import { getServerSideURL } from '@utils/getURL'

import type { User } from '@payload-types'

export const getMeUser = async (args?: {
  nullUserRedirect?: string
  validUserRedirect?: string
}): Promise<{
  token: string | null
  user: User | null
}> => {
  const { nullUserRedirect, validUserRedirect } = args || {}

  try {
    // Dynamically import cookies to avoid build-time errors
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    const token = cookieStore.get('payload-token')?.value

    if (!token && nullUserRedirect) {
      redirect(nullUserRedirect)
    }

    const meUserReq = await fetch(`${getServerSideURL()}/api/users/me`, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })

    const {
      user
    }: {
      user: User
    } = await meUserReq.json()

    if (validUserRedirect && meUserReq.ok && user) {
      redirect(validUserRedirect)
    }

    if (nullUserRedirect && (!meUserReq.ok || !user)) {
      redirect(nullUserRedirect)
    }

    return {
      token: token || null,
      user
    }
  } catch (err) {
    // Handle build-time calls gracefully
    if (process.env.NODE_ENV === 'production') {
      return {
        token: null,
        user: null
      }
    }
    throw err
  }
}
