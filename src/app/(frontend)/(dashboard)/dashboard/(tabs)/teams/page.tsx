import React from 'react'
import { Metadata } from 'next'

import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'

import { LinkGrid } from '@blocks/LinkGrid'

import { Gutter } from '@components/Gutter'
import { fetchMe } from '@dashboard/api/fetchMe.js'
import { fetchTeams } from '@dashboard/api/fetchTeam'
import { TeamDrawer, TeamDrawerToggler } from '@dashboard/components/TeamDrawer'

import classes from './page.module.scss'

import { DASHBOARD_SLUG } from '@constants'

const drawerSlug = 'team-drawer'

export default async function Page() {
  const { user } = await fetchMe()

  const teams = await fetchTeams(
    user?.teams?.map(({ team }) =>
      team && typeof team === 'object' ? team.id : team || ''
    ) || []
  )

  const hasTeams = Boolean(teams?.length && teams.length > 0)

  return (
    <React.Fragment>
      <div className={classes.teams}>
        <Gutter className={classes.introContent}>
          {!hasTeams && (
            <p>
              {`You are not a member of any teams. `}
              <TeamDrawerToggler
                className={classes.createTeamLink}
                drawerSlug={drawerSlug}
              >
                Create a new team
              </TeamDrawerToggler>
              {' to get started.'}
            </p>
          )}
          {Boolean(teams?.length) && (
            <p>
              {`You are a member of ${teams?.length || 0} team${
                (teams?.length || 0) > 1 ? 's' : ''
              }. `}
              <TeamDrawerToggler
                className={classes.createTeamLink}
                drawerSlug={drawerSlug}
              >
                Create a new team
              </TeamDrawerToggler>
              {'.'}
            </p>
          )}
        </Gutter>
        {hasTeams && (
          <LinkGrid
            blockType="linkGrid"
            className={classes.linkGrid}
            linkGridFields={{
              links:
                teams?.map((team, index) => {
                  if (!team || typeof team === 'string') return null as any

                  return {
                    link: {
                      type: 'custom',
                      url: `/${DASHBOARD_SLUG}/${team.slug}`,
                      label: team.name
                    }
                  }
                }) || []
            }}
          />
        )}
      </div>
      <TeamDrawer drawerSlug={drawerSlug} redirectOnCreate />
    </React.Fragment>
  )
}

export const metadata: Metadata = {
  title: `My Teams`,
  openGraph: mergeOpenGraph({
    title: `My Teams`,
    url: `/cloud/teams`
  })
}
