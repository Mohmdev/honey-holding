import React from 'react'
import { Metadata } from 'next'

import { SectionHeader } from '@root/app/(frontend)/(dashboard)/dashboard/[team-slug]/[project-slug]/(tabs)/settings/_layoutComponents/SectionHeader'

import { Message } from '@components/Message'
import { fetchInvoices } from '@dashboard/api/fetchInvoices'
import { fetchMe } from '@dashboard/api/fetchMe'
import { fetchTeamWithCustomer } from '@dashboard/api/fetchTeam'

import { TeamInvoicesPage } from './page_client'

export default async function Page({
  params
}: {
  params: Promise<{
    'team-slug': string
  }>
}) {
  const { 'team-slug': teamSlug } = await params
  const { user } = await fetchMe()
  const team = await fetchTeamWithCustomer(teamSlug)
  const invoices = await fetchInvoices(team)

  const hasCustomerID = team?.stripeCustomerID

  return (
    <React.Fragment>
      <SectionHeader title="Invoices" />
      {!hasCustomerID && (
        <Message error="This team does not have a billing account. Please contact support to resolve this issue." />
      )}
      <TeamInvoicesPage team={team} invoices={invoices} user={user} />
    </React.Fragment>
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
    title: `${teamSlug} - Team Invoices`,
    openGraph: {
      title: `${teamSlug} - Team Invoices`,
      url: `/cloud/${teamSlug}/invoices`
    }
  }
}
