'use client'

import React, { useCallback, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { createDraftProject } from '@app/(frontend)/(cloud)/new/createDraftProject.js'
import { Cell, Grid } from '@faceless-ui/css-grid'
import { toast } from 'sonner'

import { Checkbox } from '@forms/fields/Checkbox'
import Form from '@forms/Form'
import FormSubmissionError from '@forms/FormSubmissionError'
import Label from '@forms/Label'
import Submit from '@forms/Submit'

import { PayloadIcon } from '@graphics/PayloadIcon'
import { Gutter } from '@components/Gutter'
import { HR } from '@components/HR'
import { Message } from '@components/Message'
import { fetchInstalls, Install } from '@dashboard/api/fetchInstalls'
import { CloneOrDeployProgress } from '@dashboard/CloneOrDeployProgress'
import { InstallationSelector } from '@dashboard/InstallationSelector'
import { useTeamDrawer } from '@dashboard/TeamDrawer'
import { Team, Template, User } from '@dashboard/types'
import { UniqueRepoName } from '@dashboard/UniqueRepoName'

import classes from './page.module.scss'

import { DASHBOARD_SLUG } from '@constants'

export const CloneTemplate: React.FC<{
  template?: Template
  installs?: Install[]
  user: User | null | undefined
  uuid: string
}> = (props) => {
  const searchParams = useSearchParams()
  const teamParam = searchParams?.get('team')
  const { template, installs: initialInstalls, user, uuid } = props

  const router = useRouter()
  const [cloneError, setCloneError] = useState<string | null>(null)

  const [installs, setInstalls] = useState<Install[]>(initialInstalls || [])

  const [selectedInstall, setSelectedInstall] = useState<Install | undefined>(
    installs?.[0] || undefined
  )

  const onInstall = useCallback(async () => {
    const freshInstalls = await fetchInstalls()
    setInstalls(freshInstalls)
  }, [])

  const matchedTeam = user?.teams?.find(
    ({ team }) => typeof team !== 'string' && team?.slug === teamParam
  )?.team as Team //eslint-disable-line function-paren-newline

  const onDraftCreateProject = useCallback(
    ({ slug: draftProjectSlug, team }) => {
      toast.success(
        'Template cloned successfully, you are now being redirected...'
      )

      router.push(
        `/${DASHBOARD_SLUG}/${
          typeof team === 'string' ? team : team?.slug
        }/${draftProjectSlug}/configure`
      )
    },
    [router]
  )

  const [TeamDrawer, TeamDrawerToggler] = useTeamDrawer()
  const noTeams = !user?.teams || user?.teams.length === 0

  const handleSubmit = useCallback(
    async ({ unflattenedData }) => {
      try {
        await createDraftProject({
          repo: {
            name: unflattenedData?.repositoryName
          },
          makePrivate: unflattenedData?.makePrivate,
          projectName: template?.name,
          installID: selectedInstall?.id,
          templateID: template?.id,
          teamID: matchedTeam?.id, // the first team is used as a fallback
          onSubmit: onDraftCreateProject,
          user
        })
      } catch (err) {
        window.scrollTo(0, 0)
        const msg =
          err instanceof Error ? err.message : 'An unknown error occurred.'
        setCloneError(msg)
        console.error(msg) // eslint-disable-line no-console
      }
    },
    [user, template, selectedInstall, matchedTeam, onDraftCreateProject]
  )

  return (
    <Form onSubmit={handleSubmit}>
      <Gutter>
        {noTeams && (
          <p className={classes.noTeams}>
            {`You must be a member of a team to create a project. `}
            <TeamDrawerToggler className={classes.createTeamLink}>
              Create a new team
            </TeamDrawerToggler>
            {'.'}
          </p>
        )}
        <div className={classes.formState}>
          <FormSubmissionError />
          {cloneError && <Message error={cloneError} />}
        </div>
        <Grid>
          <Cell cols={4} colsM={8} className={classes.sidebarCell}>
            <div className={classes.sidebar}>
              <div>
                <Label label="Selected Template" htmlFor="" />
                <div className={classes.template}>
                  <div className={classes.templateIcon}>
                    <PayloadIcon />
                  </div>
                  <p className={classes.templateName}>{template?.name}</p>
                </div>
              </div>
              {template?.description && <p>{template?.description}</p>}
            </div>
          </Cell>
          <Cell cols={8} colsM={8}>
            <div className={classes.wrapper}>
              <Grid>
                <Cell cols={4}>
                  <InstallationSelector
                    description="Select where to create this repository."
                    installs={installs}
                    onChange={setSelectedInstall}
                    onInstall={onInstall}
                    uuid={uuid}
                  />
                </Cell>
                <Cell cols={4}>
                  <UniqueRepoName
                    repositoryOwner={
                      (selectedInstall?.account as { login: string })?.login
                    }
                    initialValue={template?.slug}
                  />
                </Cell>
              </Grid>
              <p className={classes.appPermissions}>
                {`Don't see your organization? `}
                <a
                  href={selectedInstall?.html_url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Adjust your GitHub app permissions
                </a>
                {'.'}
              </p>
              <div>
                <Checkbox
                  label="Create private Git repository"
                  initialValue={true}
                  path="makePrivate"
                />
              </div>
              <div className={classes.submit}>
                <Submit label="Clone Template" appearance="primary" />
              </div>
            </div>
            <HR />
            <CloneOrDeployProgress
              type="clone"
              template={template}
              selectedInstall={selectedInstall}
            />
          </Cell>
        </Grid>
      </Gutter>
      <TeamDrawer />
    </Form>
  )
}
