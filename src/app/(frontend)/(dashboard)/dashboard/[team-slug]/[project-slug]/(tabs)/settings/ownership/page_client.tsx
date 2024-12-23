'use client'

import * as React from 'react'
import Link from 'next/link'

import { checkTeamRoles } from '@utilities/check-team-roles.js'
import { isExpandedDoc } from '@utilities/is-expanded-doc.js'

import { useAuth } from '@providers/Auth'

import type { Team } from '@payload-cloud-types'

import { MaxWidth } from '@components/MaxWidth'

import { SectionHeader } from '../_layoutComponents/SectionHeader'
import classes from './page.module.scss'

export const ProjectOwnershipPage: React.FC<{
  environmentSlug?: string
  team: Team
}> = ({ team: currentTeam }) => {
  const { user } = useAuth()

  const isCurrentTeamOwner = checkTeamRoles(user, currentTeam, ['owner'])

  const teamOptions = user?.teams?.reduce(
    (acc, userTeam) => {
      if (
        userTeam.team &&
        userTeam.team !== 'string' &&
        isExpandedDoc<Team>(userTeam.team) &&
        userTeam?.roles?.length
      ) {
        acc.push({
          slug: userTeam.team.slug,
          label: `"${userTeam.team.name}" owns this project`,
          value: userTeam.team.id
        })
      }

      return acc
    },
    [] as { label: string; slug?: string; value: string }[]
  )

  return (
    <MaxWidth>
      <SectionHeader title="Ownership" />

      {isCurrentTeamOwner && teamOptions ? (
        <div className={classes.noAccess}>
          Contact support at{' '}
          <Link href="mailto:info@payloadcms.com">info@payloadcms.com</Link> to
          transfer project ownership. Note: Projects can only be transferred to
          teams that have a valid payment method.
        </div>
      ) : (
        <div className={classes.noAccess}>
          You do not have permission to change ownership of this project.
        </div>
      )}
    </MaxWidth>
  )
}
