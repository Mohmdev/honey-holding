import type { Project } from '@dashboard/types'

export const hasBadSubscription = (
  subscriptionStatus: Project['stripeSubscriptionStatus']
): boolean => {
  const hasBadSubscriptionStatus = [
    'incomplete',
    'incomplete_expired',
    'past_due',
    'unpaid'
  ].some((status) => status === subscriptionStatus)

  return hasBadSubscriptionStatus
}
