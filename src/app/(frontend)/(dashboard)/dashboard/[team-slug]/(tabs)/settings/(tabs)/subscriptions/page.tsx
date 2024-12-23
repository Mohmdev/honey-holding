import React, { Fragment } from 'react'
import { Metadata } from 'next'

import { SectionHeader } from '@cloud/[team-slug]/[project-slug]/(tabs)/settings/_layoutComponents/SectionHeader'

import { Message } from '@components/Message'
import { fetchMe } from '@dashboard/api/fetchMe.js'
import { fetchPlans } from '@dashboard/api/fetchPlans.js'
import { fetchSubscriptions } from '@dashboard/api/fetchSubscriptions.js'
import { fetchTeamWithCustomer } from '@dashboard/api/fetchTeam'

import { TeamSubscriptionsPage } from './page_client.js'

export default async ({
  params
}: {
  params: Promise<{
    'team-slug': string
  }>
}) => {
  const { 'team-slug': teamSlug } = await params
  const { user } = await fetchMe()
  const team = await fetchTeamWithCustomer(teamSlug)
  const plans = await fetchPlans()
  const subscriptions = await fetchSubscriptions(team)

  const hasCustomerID = team?.stripeCustomerID

  return (
    <Fragment>
      <SectionHeader title="Subscriptions" />
      {!hasCustomerID && (
        <Message error="This team does not have a billing account. Please contact support to resolve this issue." />
      )}
      <TeamSubscriptionsPage
        team={team}
        plans={plans}
        subscriptions={subscriptions}
        user={user}
      />
    </Fragment>
  )
}

export async function generateMetadata({
  params
}: {
  params: Promise<{
    'team-slug': string
  }>
}): Promise<Metadata> {
  const { 'team-slug': teamSlug } = await params
  return {
    title: `${teamSlug} - Team Subscriptions`,
    openGraph: {
      title: `${teamSlug} - Team Subscriptions`,
      url: `/cloud/${teamSlug}/subscriptions`
    }
  }
}
