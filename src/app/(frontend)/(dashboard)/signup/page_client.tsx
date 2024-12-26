'use client'

import React, { useCallback, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { useAuth } from '@providers/Auth'
import canUseDom from '@utils/canUseDOM'
import { getServerSideURL } from '@utils/getURL'

import { Text } from '@forms/fields/Text'
import Form from '@forms/Form'
import FormProcessing from '@forms/FormProcessing'
import FormSubmissionError from '@forms/FormSubmissionError'
import Submit from '@forms/Submit'
import { InitialState, OnSubmit } from '@forms/types'

import { Button } from '@components/ButtonComponent'
import { Gutter } from '@components/Gutter'

// import { Heading } from '@components/Heading'
// import { Highlight } from '@components/Highlight'

import classes from './page.module.scss'

// type Create = (args: {
//   email: string
//   password: string
//   passwordConfirm: string
// }) => Promise<void>

const initialFormState: InitialState = {
  email: {
    value: '',
    valid: false,
    initialValue: undefined,
    errorMessage: 'Please enter a valid email address'
  },
  username: {
    value: '',
    valid: false,
    initialValue: undefined,
    errorMessage: 'Please enter a username'
  },
  password: {
    value: '',
    valid: false,
    initialValue: undefined,
    errorMessage: 'Please enter a password'
  },
  passwordConfirm: {
    value: '',
    valid: false,
    initialValue: undefined,
    errorMessage: 'Please confirm your password'
  }
}
interface SignupProps {
  email?: string
  redirectPath?: string
}
export const Signup: React.FC<SignupProps> = ({ email, redirectPath }) => {
  const { user } = useAuth()
  const [successfullySubmitted, setSuccessfullySubmitted] = useState(false)

  const createAccount: OnSubmit = useCallback(
    async ({ data: formData, dispatchFields }) => {
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 0)

      if (formData.password !== formData.passwordConfirm) {
        dispatchFields({
          type: 'UPDATE',
          payload: [
            {
              path: 'passwordConfirm',
              errorMessage: 'Passwords do not match',
              valid: false,
              value: formData.passwordConfirm
            },
            {
              path: 'password',
              errorMessage: 'Passwords do not match',
              valid: false,
              value: formData.password
            }
          ]
        })

        return
      }

      try {
        const req = await fetch(`${getServerSideURL()}/api/users/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formData.email,
            username: formData.username,
            password: formData.password,
            redirect: formData.redirect
          })
        })

        const response = await req.json()

        if (req.ok) {
          setSuccessfullySubmitted(true)
        } else {
          // Handle specific error cases
          if (response.errors?.email) {
            dispatchFields({
              type: 'UPDATE',
              payload: {
                path: 'email',
                errorMessage: response.errors.email,
                valid: false,
                value: formData.email
              }
            })
          }
          if (response.errors?.username) {
            dispatchFields({
              type: 'UPDATE',
              payload: {
                path: 'username',
                errorMessage: response.errors.username,
                valid: false,
                value: formData.username
              }
            })
          }
          throw new Error(response.message || 'An error occurred during signup')
        }
      } catch (e) {
        console.error(e)
        throw new Error(e.message)
      }
    },
    []
  )

  if (user) {
    return (
      <Gutter>
        <div className="grid">
          <div className="cols-5 cols-m-8">
            <h2>Already logged in</h2>
            <p>You must first logout to create another account.</p>
            <div className={classes.buttonWrap}>
              <Button
                label="Log out"
                href="/logout"
                appearance="primary"
                el="link"
              />
              <Button
                label="Dashboard"
                href="/dashboard"
                appearance="secondary"
                el="link"
              />
            </div>
          </div>
        </div>
      </Gutter>
    )
  }

  if (successfullySubmitted) {
    return (
      <Gutter>
        <h2 id="cloud-registered-successfully">Verify your account</h2>
        <div className="grid">
          <div className="cols-5 cols-m-8">
            <p>
              Your account has been created. Please check your email to verify
              your account and login.
            </p>
            <div className={classes.links}>
              <p>
                {`Already verified your account? `}
                <Link href={`/login${canUseDom ? window.location.search : ''}`}>
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
      <h1 className={classes.heading}>Create an account</h1>
      <div className="grid">
        <div className="cols-5 cols-m-8">
          <div className={classes.links}>
            {`Already have an account? `}
            <Link
              href={`/login${redirectPath ? `?redirect=${redirectPath}` : ''}`}
            >
              Log in now
            </Link>
            {'.'}
          </div>
          <Form
            onSubmit={createAccount}
            className={classes.form}
            initialState={initialFormState}
            formId={'nexweb_dashboard_sign_up'}
          >
            <FormSubmissionError />
            <FormProcessing message="Signing up, one moment..." />
            <Text
              path="email"
              label="Email"
              required
              initialValue={email || undefined}
            />
            <Text path="username" label="Username" required />
            <Text path="password" label="Password" type="password" required />
            <Text
              path="passwordConfirm"
              label="Confirm Password"
              type="password"
              required
            />
            {typeof redirectPath === 'string' && (
              <Text path="redirect" type="hidden" value={redirectPath} />
            )}
            <div>
              <Submit label="Signup" className={classes.submit} />
            </div>
          </Form>
        </div>
      </div>
    </Gutter>
  )
}
