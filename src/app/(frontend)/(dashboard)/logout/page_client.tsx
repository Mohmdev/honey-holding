'use client'

import React, { useEffect, useRef } from 'react'

import { useAuth } from '@providers/Auth'

import { Button } from '@components/ButtonComponent'
import { Gutter } from '@components/Gutter'

import classes from './page.module.scss'

const threshold = 1000

export const Logout: React.FC = () => {
  const { user, status, logout } = useAuth()
  const isRequesting = useRef(false)

  useEffect(() => {
    if (user && !isRequesting.current) {
      isRequesting.current = true

      const doLogout = async () => {
        try {
          const start = Date.now()

          await logout()

          // give the illusion of a delay, so that the content doesn't blink on fast networks
          const timeElapsed = Date.now() - start
          const delay = threshold - timeElapsed
          if (delay > 0) {
            await new Promise((resolve) => setTimeout(resolve, delay))
          }
        } catch (e) {
          console.error('Error during logout:', e)
        }

        isRequesting.current = false
      }

      doLogout()
    }
  }, [logout, user])

  // Show different states based on auth status
  if (status === 'loggedOut') {
    return (
      <Gutter>
        <h3>You have been logged out.</h3>
        <p>What would you like to do next?</p>
        <div className={classes.controls}>
          <Button
            label="Log back in"
            href="/login"
            appearance="primary"
            el="link"
          />
          <Button label="Go home" href="/" appearance="secondary" el="link" />
        </div>
      </Gutter>
    )
  }

  if (!user && status === undefined) {
    return (
      <Gutter>
        <h3>You are already logged out.</h3>
        <div className={classes.controls}>
          <Button
            label="Log back in"
            href="/login"
            appearance="primary"
            el="link"
          />
          <Button label="Go home" href="/" appearance="secondary" el="link" />
        </div>
      </Gutter>
    )
  }

  return (
    <Gutter>
      <h3>Logging out...</h3>
      <p>Please wait while we log you out, this should only take a moment.</p>
    </Gutter>
  )
}
