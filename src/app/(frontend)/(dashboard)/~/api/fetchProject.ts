import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getClientSideURL } from '@utils/getURL'

import type { Subscription } from './fetchSubscriptions'
import type { Customer, TeamWithCustomer } from './fetchTeam'
import type { Project } from '@dashboard/types'

import { mergeProjectEnvironment } from '@dashboard/utils/merge-project-environment'

import { payloadCloudToken } from './token'

import { PROJECT_QUERY } from '@data/project'

export type ProjectWithSubscription = Project & {
  stripeSubscription: Subscription
}

export const fetchProject = async (args: {
  projectSlug?: string
  teamID?: string
}): Promise<Project> => {
  const { projectSlug, teamID } = args || {}
  const token = (await cookies()).get(payloadCloudToken)?.value ?? null
  if (!token) throw new Error('No token provided')

  const doc: Project = await fetch(`${getClientSideURL()}/api/graphql`, {
    body: JSON.stringify({
      query: PROJECT_QUERY,
      variables: {
        projectSlug,
        teamID
      }
    }),
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `JWT ${token}` } : {})
    },
    method: 'POST',
    next: { tags: [`project_${projectSlug}`] }
  })
    ?.then((res) => res.json())
    ?.then((res) => {
      if (res.errors)
        throw new Error(res?.errors?.[0]?.message ?? 'Error fetching doc')
      return res?.data?.Projects?.docs?.[0]
    })

  return doc
}

export const fetchProjectAndRedirect = async (args: {
  environmentSlug?: string
  projectSlug?: string
  teamSlug?: string
}): Promise<{
  project: ProjectWithSubscription
  team: TeamWithCustomer
}> => {
  const { environmentSlug, projectSlug, teamSlug } = args || {}
  const project = await fetchProjectWithSubscription({
    environmentSlug,
    projectSlug,
    teamSlug
  })

  if (!project) {
    redirect('/404')
  }

  if (project?.status === 'draft') {
    redirect(`/cloud/${teamSlug}/${projectSlug}/configure`)
  }

  return {
    project,
    team: project?.team
  }
}

type ProjectWithSubscriptionWithTeamAndCustomer = ProjectWithSubscription & {
  customer: Customer
  team: TeamWithCustomer
}

export const fetchProjectWithSubscription = async (args: {
  environmentSlug?: string
  projectSlug?: string
  teamSlug?: string
}): Promise<
  ProjectWithSubscription & {
    customer: Customer
    team: TeamWithCustomer
  }
> => {
  const { environmentSlug, projectSlug, teamSlug } = args || {}
  const token = (await cookies()).get(payloadCloudToken)?.value ?? null
  if (!token) throw new Error('No token provided')

  const projectWithSubscription = await fetch(
    `${getClientSideURL()}/api/projects/${projectSlug}/with-subscription`,
    {
      body: JSON.stringify({
        projectSlug,
        teamSlug
      }),
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `JWT ${token}` } : {})
      },
      method: 'POST'
    }
  )
    ?.then((res) => res.json())
    ?.then((res) => {
      if (res.errors)
        throw new Error(res?.errors?.[0]?.message ?? 'Error fetching doc')
      return res
    })

  if (environmentSlug) {
    return mergeProjectEnvironment({
      environmentSlug,
      project: projectWithSubscription
    }) as ProjectWithSubscriptionWithTeamAndCustomer
  }

  return projectWithSubscription
}
