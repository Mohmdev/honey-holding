import { getClientSideURL } from '@utils/getURL'

import type { Plan } from '@dashboard/types'

import { PLANS_QUERY } from '@data/plans'

export const fetchPlans = async (): Promise<Plan[]> => {
  const doc: Plan[] = await fetch(`${getClientSideURL()}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: PLANS_QUERY
    })
  })
    ?.then((res) => res.json())
    ?.then((res) => {
      if (res.errors)
        throw new Error(res?.errors?.[0]?.message ?? 'Error fetching doc')
      return res?.data?.Plans?.docs
    })

  return doc
}
