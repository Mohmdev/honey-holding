'use client'

import React, { Fragment, useCallback } from 'react'

import { useModal } from '@faceless-ui/modal'
import { toast } from 'sonner'

import { useAuth } from '@providers/Auth'

import type { User, UserPhoto } from '@payload-types'

import { Text } from '@forms/fields/Text'
import Form from '@forms/Form'
import FormProcessing from '@forms/FormProcessing'
import FormSubmissionError from '@forms/FormSubmissionError'
import Submit from '@forms/Submit'
import { OnSubmit } from '@forms/types'

import { Button } from '@components/ButtonComponent'
import { Heading } from '@components/Heading'
import { HR } from '@components/HR'
import { ModalWindow } from '@components/ModalWindow'
import { revalidateCache } from '@dashboard/actions/revalidateCache'
import { SectionHeader } from '@dashboard/components/_layoutComponents/SectionHeader'

import { DeletionConfirmationForm } from './DeletionConfirmationForm'
import classes from './page.module.scss'

const modalSlug = 'delete-account'

export const SettingsPage: React.FC<{
  user: User
}> = (props) => {
  const { user } = props

  const { updateUser } = useAuth()
  const { openModal } = useModal()
  const [formToShow, setFormToShow] = React.useState<'account' | 'password'>(
    'account'
  )

  const handleSubmit: OnSubmit = useCallback(
    async ({ data, dispatchFields }): Promise<void> => {
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 0)

      if (data?.password && data.password !== data.passwordConfirm) {
        dispatchFields({
          type: 'UPDATE',
          payload: [
            {
              path: 'passwordConfirm',
              errorMessage: 'Passwords do not match',
              valid: false,
              value: data.passwordConfirm
            },
            {
              path: 'password',
              errorMessage: 'Passwords do not match',
              valid: false,
              value: data.password
            }
          ]
        })

        throw new Error(
          'Please confirm that your passwords match and try again'
        )
      }

      try {
        // match Partial<User> type from AuthContext
        const updates: Partial<User> = {
          username: data?.username || undefined,
          firstName: data?.firstName || undefined,
          lastName: data?.lastName || undefined,
          email: data?.email || undefined
        }

        // Only add password if it exists
        if (data?.password) {
          updates.password = data.password
        }

        await updateUser(updates)

        toast.success('Your account has been updated successfully.')

        setFormToShow('account')

        await revalidateCache({
          tag: 'user'
        })
      } catch (err) {
        const message =
          err?.message ||
          `An error occurred while attempting to update your account`
        console.error(message)
        throw new Error(message)
      }
    },
    [updateUser]
  )

  return (
    <Fragment>
      <SectionHeader title="Account Settings" />
      <p className={classes.description}>
        {formToShow === 'account' && (
          <Fragment>
            {'To change your password, '}
            <button
              className={classes.viewButton}
              type="button"
              onClick={() => {
                setFormToShow('password')
              }}
            >
              click here
            </button>
            {'.'}
          </Fragment>
        )}
        {formToShow === 'password' && (
          <Fragment>
            {'Change your password below, or '}
            <button
              className={classes.viewButton}
              type="button"
              onClick={() => {
                setFormToShow('account')
              }}
            >
              cancel
            </button>
            {'.'}
          </Fragment>
        )}
      </p>
      <Form className={classes.form} onSubmit={handleSubmit}>
        <FormSubmissionError />
        <FormProcessing message="Updating profile, one moment" />
        {formToShow === 'account' && (
          <>
            {/* TODO */}
            {/* <Media
              path="photo"
              label="Profile Photo"
              relationTo="user-photos"
              description="Upload a profile photo"
              initialValue={user?.photo}
            /> */}
            <Text
              path="username"
              label="Username"
              initialValue={user?.username || ''}
              required
            />
            <Text
              path="firstName"
              label="Your First Name"
              initialValue={user?.firstName || ''}
            />
            <Text
              path="lastName"
              label="Your Last Name"
              initialValue={user?.lastName || ''}
            />
            <Text
              path="email"
              label="Email"
              required
              initialValue={user?.email || ''}
            />
          </>
        )}
        {formToShow === 'password' && (
          <>
            <Text
              type="password"
              path="password"
              label="Password"
              required
              initialValue=""
            />
            <Text
              type="password"
              path="passwordConfirm"
              label="Password Confirm"
              required
              initialValue=""
            />
          </>
        )}
        <div className={classes.buttonWrap}>
          {formToShow === 'password' && (
            <Button
              label="Cancel"
              appearance="secondary"
              onClick={() => {
                setFormToShow('account')
              }}
            />
          )}
          <Submit label="Save" />
        </div>
      </Form>
      <HR />
      <Text
        value={user?.id}
        label="User ID"
        disabled
        description="This is your user's ID within Nexweb"
      />
      <Heading element="h2" as="h4" marginTop={false} marginBottom={false}>
        Delete account
      </Heading>
      <p className={classes.description}>
        Deleting your account is permanent and cannot be undone.
      </p>
      <Button
        className={classes.deleteAccount}
        label="Delete account"
        appearance="danger"
        onClick={() => {
          openModal(modalSlug)
        }}
      />
      <ModalWindow className={classes.modal} slug={modalSlug}>
        <DeletionConfirmationForm modalSlug={modalSlug} />
      </ModalWindow>
    </Fragment>
  )
}
