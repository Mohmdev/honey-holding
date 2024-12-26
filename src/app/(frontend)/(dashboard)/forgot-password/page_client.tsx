'use client'

import React, { useCallback, useState } from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { useAuth } from '@providers/Auth'
import canUseDom from '@utils/canUseDOM'

import { Text } from '@forms/fields/Text'
import Form from '@forms/Form'
import FormProcessing from '@forms/FormProcessing'
import FormSubmissionError from '@forms/FormSubmissionError'
import Submit from '@forms/Submit'
import { InitialState } from '@forms/types'

import { Gutter } from '@components/Gutter'
import { Heading } from '@components/Heading'
import { Highlight } from '@components/Highlight'
import { RenderParams } from '@components/RenderParams'

import classes from './page.module.scss'

const initialFormState: InitialState = {
  email: {
    value: '',
    valid: false,
    initialValue: undefined,
    errorMessage: 'Please enter a valid email address'
  }
}

export const ForgotPassword: React.FC = () => {
  const { user, forgotPassword } = useAuth()
  const [successfullySubmitted, setSuccessfullySubmitted] = useState(false)

  const handleSubmit = useCallback(
    async ({ data, dispatchFields }) => {
      try {
        await forgotPassword({ email: data.email })

        // Reset form and show success
        dispatchFields({
          type: 'RESET',
          payload: initialFormState
        })
        setSuccessfullySubmitted(true)
      } catch (err) {
        // Handle specific error cases
        dispatchFields({
          type: 'UPDATE',
          payload: {
            path: 'email',
            errorMessage: err.message || 'Failed to send recovery email',
            valid: false,
            value: data.email
          }
        })
        throw new Error(err.message)
      }
    },
    [forgotPassword]
  )

  if (user === undefined) return null

  if (user) {
    redirect(
      `/dashboard/settings?error=${encodeURIComponent(
        'Cannot reset password while logged in. To change your password, you may use your account settings below or log out and try again.'
      )}`
    )
  }

  if (successfullySubmitted) {
    return (
      <Gutter>
        <Heading marginTop={false} element="h2" as="h2">
          <Highlight text="Success" />
        </Heading>
        <div className="grid">
          <div className="cols-6 cols-m-8">
            <Heading marginTop={false} element="p" as="h4">
              We have sent you an email with a link to reset your password.
              Please check your inbox.
            </Heading>
            <div className={classes.links}>
              <p>
                {`Ready to login? `}
                <Link href="/login" prefetch={false}>
                  Log in now
                </Link>
                {'.'}
              </p>
            </div>
          </div>
        </div>
      </Gutter>
    )
  }

  return (
    <Gutter>
      <RenderParams />
      <Heading marginTop={false} element="h1">
        Forgot password
      </Heading>
      <div className="grid">
        <div className="cols-6 cols-m-8">
          <div className={classes.links}>
            <p>
              {`Know your password? `}
              <Link
                href={`/login${canUseDom ? window.location.search : ''}`}
                prefetch={false}
              >
                Log in here
              </Link>
              {'.'}
            </p>
          </div>
          <Form
            onSubmit={handleSubmit}
            className={classes.form}
            initialState={initialFormState}
          >
            <FormSubmissionError />
            <FormProcessing message="Sending recovery email, one moment..." />
            <Text path="email" label="Email" required />
            <div>
              <Submit label="Recover" className={classes.submit} />
            </div>
          </Form>
        </div>
      </div>
    </Gutter>
  )
}
