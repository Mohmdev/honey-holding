import { getClientSideURL } from '@utils/getURL.js'

import type { ProjectWithSubscription } from './fetchProject'
import type { Subscription } from './fetchSubscriptions'
import type { TeamWithCustomer } from './fetchTeam'

export const updateSubscription = async (
  team: TeamWithCustomer,
  project: ProjectWithSubscription,
  subscription: Partial<Subscription>
): Promise<Subscription> => {
  const sub = await fetch(
    `${getClientSideURL()}/api/teams/${team?.id}/subscriptions/${project?.stripeSubscriptionID}`,
    {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(subscription)
    }
  )?.then((res) => {
    if (!res.ok) throw new Error('Failed to update subscription')
    return res.json()
  })

  return sub
}
