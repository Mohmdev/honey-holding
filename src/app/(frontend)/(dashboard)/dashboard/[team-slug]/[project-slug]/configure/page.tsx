import React from 'react'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import Checkout from '@root/app/(frontend)/(dashboard)/new/(checkout)/Checkout'

import { fetchGitHubToken } from '@dashboard/api/fetchGitHubToken'
import { fetchInstalls } from '@dashboard/api/fetchInstalls'
import { fetchMe } from '@dashboard/api/fetchMe'
import { fetchPaymentMethods } from '@dashboard/api/fetchPaymentMethods'
import { fetchPlans } from '@dashboard/api/fetchPlans'
import { fetchProjectWithSubscription } from '@dashboard/api/fetchProject'
import { fetchTemplates } from '@dashboard/api/fetchTemplates'

export const dynamic = 'force-dynamic'

export default async function Page({
  params
}: {
  params: Promise<{
    'team-slug': string
    'project-slug': string
  }>
}) {
  const { 'team-slug': teamSlug, 'project-slug': projectSlug } = await params
  const { user } = await fetchMe()
  const project = await fetchProjectWithSubscription({ teamSlug, projectSlug })

  if (project.status === 'published') {
    redirect(`/dashboard/${teamSlug}/${projectSlug}`)
  }

  const token = await fetchGitHubToken()

  if (!token) {
    redirect(
      `/new/authorize?redirect=${encodeURIComponent(
        `/dashboard/${teamSlug}/${projectSlug}/configure`
      )}`
    )
  }

  const plans = await fetchPlans()
  const installs = await fetchInstalls()
  const templates = await fetchTemplates()
  const paymentMethods = await fetchPaymentMethods({
    team: project.team
  })

  return (
    <Checkout
      team={project.team}
      project={project}
      token={token}
      plans={plans}
      installs={installs}
      templates={templates}
      user={user}
      // initialPaymentMethods={paymentMethods}
    />
  )
}

export async function generateMetadata({
  params
}: {
  params: Promise<{
    'team-slug': string
    'project-slug': string
  }>
}): Promise<Metadata> {
  const { 'team-slug': teamSlug, 'project-slug': projectSlug } = await params
  return {
    title: 'Checkout | Payload Cloud',
    openGraph: {
      title: 'Checkout | Payload Cloud',
      url: `/dashboard/${teamSlug}/${projectSlug}/configure`
    }
  }
}
