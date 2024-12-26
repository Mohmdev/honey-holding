'use client'

import React, { useCallback } from 'react'
import { redirect, useSearchParams } from 'next/navigation'

import { useAuth } from '@providers/Auth'

import { Text } from '@forms/fields/Text'
import Form from '@forms/Form'
import FormProcessing from '@forms/FormProcessing'
import FormSubmissionError from '@forms/FormSubmissionError'
import Submit from '@forms/Submit'

import { Gutter } from '@components/Gutter'

import classes from './page.module.scss'

const initialFormState = {
  password: {
    value: '',
    valid: false,
    errorMessage: 'Please enter a password'
  },
  passwordConfirm: {
    value: '',
    valid: false,
    errorMessage: 'Please confirm your password'
  }
}

interface ResetPasswordProps {
  token: string
}

export const ResetPassword: React.FC<ResetPasswordProps> = ({ token }) => {
  const { user, resetPassword } = useAuth()

  const handleSubmit = useCallback(
    async ({ data, dispatchFields }) => {
      // Basic validation
      if (data.password !== data.passwordConfirm) {
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
        return
      }

      try {
        await resetPassword({
          password: data.password,
          passwordConfirm: data.passwordConfirm,
          token: token as string
        })

        // Redirect to login on success
        redirect('/login?message=Password successfully reset. Please log in.')
      } catch (e: any) {
        if (e.message.includes('token')) {
          redirect('/forgot-password?error=Invalid or expired token')
        }
        throw new Error(e.message)
      }
    },
    [resetPassword, token]
  )

  if (user === undefined) return null

  if (user) {
    redirect(
      `/dashboard/settings?error=${encodeURIComponent(
        'Cannot reset password while logged in. To change your password, you may use your account settings below or log out and try again.'
      )}`
    )
  }

  if (!token) {
    redirect(`/forgot-password?error=${encodeURIComponent('Missing token')}`)
  }

  return (
    <Gutter>
      <h2>Reset password</h2>
      <div className="grid">
        <div className="cols-5 cols-m-8">
          <Form
            onSubmit={handleSubmit}
            className={classes.form}
            initialState={initialFormState}
          >
            <FormSubmissionError />
            <FormProcessing message="Resetting password, one moment..." />
            <Text
              path="password"
              type="password"
              label="New Password"
              required
            />
            <Text
              path="passwordConfirm"
              type="password"
              label="Confirm Password"
              required
            />
            <div>
              <Submit label="Reset Password" className={classes.submit} />
            </div>
          </Form>
        </div>
      </div>
    </Gutter>
  )
}
