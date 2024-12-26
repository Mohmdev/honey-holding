import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getClientSideURL } from '@utils/getURL'

import type { User } from '@dashboard/types'

import { payloadToken } from '../../../../../_data/token'

import { ME_QUERY } from '@data/me'

export const fetchMe = async (args?: {
  nullUserRedirect?: string
  userRedirect?: string
}): Promise<{
  token?: string
  user: User
}> => {
  const { nullUserRedirect, userRedirect } = args || {}
  const cookieStore = await cookies()
  const token = cookieStore.get(payloadToken)?.value

  const meUserReq = await fetch(`${getClientSideURL()}/api/graphql`, {
    body: JSON.stringify({
      query: ME_QUERY
    }),
    headers: {
      Authorization: `JWT ${token}`,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    next: { tags: ['user'] }
  })

  const json = await meUserReq.json()

  const user = json?.data?.meUser?.user

  if (userRedirect && meUserReq.ok && user) {
    redirect(userRedirect)
  }

  if (nullUserRedirect && (!meUserReq.ok || !user)) {
    redirect(nullUserRedirect)
  }

  return {
    token,
    user
  }
}
