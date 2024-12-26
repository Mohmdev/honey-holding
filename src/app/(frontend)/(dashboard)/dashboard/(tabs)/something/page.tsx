import React from 'react'
import { Metadata } from 'next'

import { DASHBOARD_SLUG } from '@lib/constants/constants'
import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'

import { Gutter } from '@components/Gutter'

import classes from './page.module.scss'

import { getMeUser } from '@data/getMeUser'

export default async function Page() {
  const { user } = await getMeUser()

  // Testing user data display and role-based content
  const isAdmin = user?.role === 'admin'

  return (
    <React.Fragment>
      <div className={classes.teams}>
        <Gutter className={classes.introContent}>
          <h4>Under Development...</h4>
          <br></br>
          <br></br>
          <h2>Something</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          {isAdmin ? (
            <p>You have admin privileges - You can see this special message!</p>
          ) : (
            <p>Regular user view - You can see this message instead.</p>
          )}

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </Gutter>
      </div>
    </React.Fragment>
  )
}

export const metadata: Metadata = {
  title: `Under Development`,
  openGraph: mergeOpenGraph({
    title: `Under Development`,
    url: `/${DASHBOARD_SLUG}/something`
  })
}
