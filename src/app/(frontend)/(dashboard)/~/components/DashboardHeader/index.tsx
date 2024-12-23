'use client'

import Link from 'next/link'

import { useAuth } from '@providers/Auth'

import { FullLogo } from '@graphics/FullLogo'
import { Avatar } from '@components/Avatar'

import { DashboardBreadcrumbs } from '../DashboardBreadcrumbs'
import classes from './classes.module.scss'

export const DashboardHeader = () => {
  const { user } = useAuth()

  return (
    <header className={classes.cloudHeader}>
      <FullLogo className={classes.logo} />
      <DashboardBreadcrumbs />
      <div className={classes.headerLinks}>
        {user ? (
          <ul>
            <li key={'new'}>
              <Link href="/new">New Project</Link>
            </li>
            <li key={'avatar'}>
              <Avatar />
            </li>
          </ul>
        ) : (
          <ul>
            <li key={'login'}>
              <Link href="/login">Login</Link>
            </li>
            <li key={'signup'}>
              <Link href="/signup">Sign Up</Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  )
}
