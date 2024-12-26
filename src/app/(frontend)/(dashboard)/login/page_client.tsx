'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { redirect, useSearchParams } from 'next/navigation'

import { useAuth } from '@providers/Auth'
import { DASHBOARD_SLUG } from '@lib/constants/constants'

import { Text } from '@forms/fields/Text'
import Form from '@forms/Form'
import FormProcessing from '@forms/FormProcessing'
import FormSubmissionError from '@forms/FormSubmissionError'
import Submit from '@forms/Submit'
import { InitialState } from '@forms/types'

import { Gutter } from '@components/Gutter'
import { RenderParams } from '@components/RenderParams'

import classes from './page.module.scss'

const initialFormState: InitialState = {
  email: {
    value: '',
    valid: false,
    initialValue: '',
    errorMessage: 'Please enter a valid email address'
  },
  password: {
    value: '',
    valid: false,
    initialValue: '',
    errorMessage: 'Please enter a password'
  }
}
interface LoginProps {
  email?: string
  redirectPath?: string
}

export const Login: React.FC<LoginProps> = ({ email, redirectPath }) => {
  const { user, login } = useAuth()
  const [redirectTo, setRedirectTo] = useState(DASHBOARD_SLUG)

  const trustedRoutes = ['/'] // .. add more routes or external links

  useEffect(() => {
    if (redirectPath) {
      // Check if the provided 'redirectPath' is among the trusted routes
      const isTrustedRoute = trustedRoutes.includes(redirectPath)

      // If the 'redirectPath' is trusted, update the redirection target
      // If the 'redirectPath' is not trusted, redirect to the default 'DASHBOARD_SLUG'
      setRedirectTo(isTrustedRoute ? redirectPath : DASHBOARD_SLUG)
    }
  }, [redirectPath])

  const handleSubmit = useCallback(
    async ({ data, dispatchFields }) => {
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 0)
      try {
        await login({
          email: data.email,
          password: data.password
        })
        // Login successful - no need to throw error
      } catch (err) {
        if (err.message.includes('not verified')) {
          dispatchFields({
            type: 'UPDATE',
            payload: {
              path: 'email',
              errorMessage: 'Please verify your email before logging in',
              valid: false,
              value: data.email
            }
          })
        } else {
          dispatchFields({
            type: 'UPDATE',
            payload: [
              {
                path: 'email',
                errorMessage: 'Invalid email or password',
                valid: false,
                value: data.email
              },
              {
                path: 'password',
                errorMessage: 'Invalid email or password',
                valid: false,
                value: data.password
              }
            ]
          })
        }
      }
    },
    [login]
  )

  if (user === undefined) return null

  if (user) redirect(redirectTo)

  return (
    <Gutter>
      <RenderParams />
      <h1 className={classes.heading}>Log in to Nexweb Dashboard</h1>
      <div className="grid">
        <div className={['cols-6 cols-m-8'].filter(Boolean).join(' ')}>
          <Form
            onSubmit={handleSubmit}
            className={classes.form}
            initialState={initialFormState}
          >
            <FormSubmissionError />
            <FormProcessing message="Logging in, one moment..." />
            <Text
              path="email"
              label="Email"
              required
              elementAttributes={{ autoComplete: 'on' }}
              initialValue={email || undefined}
            />
            <Text path="password" label="Password" type="password" required />
            <div>
              <Submit label="Log in" className={classes.submit} />
            </div>
          </Form>
        </div>
        <div
          className={[classes.sidebarWrap, 'cols-6 start-10 cols-m-8 start-m-1']
            .filter(Boolean)
            .join(' ')}
        >
          <div className={classes.sidebar}>
            <p>
              {`Don't have an account? `}
              <Link
                href={`/signup${redirectTo ? `?redirect=${redirectTo}` : ''}`}
              >
                Register for free
              </Link>
              {'.'}
            </p>
            <p>
              {`Forgot your password? `}
              <Link
                href={`/forgot-password${redirectTo ? `?redirect=${redirectTo}` : ''}`}
              >
                Reset it here
              </Link>
              {'.'}
            </p>
          </div>
        </div>
      </div>
    </Gutter>
  )
}
