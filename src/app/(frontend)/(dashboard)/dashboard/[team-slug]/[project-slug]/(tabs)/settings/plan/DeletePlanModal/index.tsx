'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import { useModal } from '@faceless-ui/modal'
import { toast } from 'sonner'

import { getClientSideURL } from '@utils/getURL'

import { Text } from '@forms/fields/Text'
import Form from '@forms/Form'
import Submit from '@forms/Submit'

import { Button } from '@components/ButtonComponent'
import { Heading } from '@components/Heading'
import { ModalWindow } from '@components/ModalWindow'
import { Project } from '@dashboard/types'
import { qs } from '@dashboard/utils/qs'

import classes from './index.module.scss'

export const deletePlanModalSlug = 'delete-project'

export type DeletePlanModalProps = {
  confirmSlug: string
  canManageProject: boolean
  project: Project
  environmentSlug?: string
}

export const DeletePlanModal: React.FC<DeletePlanModalProps> = (props) => {
  const { confirmSlug, canManageProject, project, environmentSlug } = props
  const { closeModal } = useModal()
  const [isDisabled, setIsDisabled] = React.useState(true)
  const router = useRouter()

  const deleteProject = React.useCallback(async () => {
    if (canManageProject) {
      // TODO: toast messages

      try {
        const query = qs.stringify({
          env: environmentSlug
        })
        const req = await fetch(
          `${getClientSideURL()}/api/projects/${project?.id}${
            query ? `?${query}` : ''
          }`,
          {
            method: 'DELETE',
            credentials: 'include'
          }
        )

        if (req.status === 200) {
          router.push('/cloud')
          toast.success('Project was deleted successfully.')
        }
      } catch (e) {
        console.error(e)
      }
    }
  }, [project, canManageProject, router])

  return (
    <ModalWindow slug={deletePlanModalSlug}>
      <Form onSubmit={deleteProject}>
        <div className={classes.modalContent}>
          <Heading marginTop={false} as="h4">
            Are you sure you want to delete this project?
          </Heading>
          <p>
            Deleting <b>{confirmSlug}</b> cannot be undone, it is recommended to
            back up your database before continuing. You can manually add the
            project back to the cloud in the future.
          </p>
          <Text
            label={`Confirm by typing: ${confirmSlug}`}
            path="confirmSlug"
            onChange={(value) => {
              setIsDisabled(value.toLowerCase() !== confirmSlug.toLowerCase())
            }}
            required
          />
          <div className={classes.modalActions}>
            <Button
              label="Cancel"
              appearance="secondary"
              onClick={() => closeModal(deletePlanModalSlug)}
            />
            <Submit label="Confirm" appearance="danger" disabled={isDisabled} />
          </div>
        </div>
      </Form>
    </ModalWindow>
  )
}
