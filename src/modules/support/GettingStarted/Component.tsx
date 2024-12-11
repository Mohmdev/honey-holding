import React from 'react'
import { Banner } from '@payloadcms/ui/elements/Banner'
import { SeedButton } from '@/components/BeforeDashboard/SeedButton'

import type { ServerSideEditViewProps } from 'payload'

import classes from './Component.module.scss'

export const GettingStarted: React.FC<ServerSideEditViewProps> = () => {
  return (
    <div className={classes['before-dashboard']}>
      <Banner className={classes['before-dashboard__banner']} type="success">
        <h4>Welcome to your dashboard!</h4>
      </Banner>
      Here&apos;s what to do next:
      <div className={classes['before-dashboard__instructions']}>
        <li>
          {'Modify your '}
          <a
            href="https://payloadcms.com/docs/beta/configuration/collections"
            rel="noopener noreferrer"
            target="_blank"
          >
            collections
          </a>
          {' and add more '}
          <a
            href="https://payloadcms.com/docs/beta/fields/overview"
            rel="noopener noreferrer"
            target="_blank"
          >
            fields
          </a>
          {' as needed. If you are new to Payload, we also recommend you check out the '}
          <a
            href="https://payloadcms.com/docs/beta/getting-started/what-is-payload"
            rel="noopener noreferrer"
            target="_blank"
          >
            Getting Started
          </a>
          {' docs.'}
        </li>
        <li>
          {'Visit your website from '}
          <a href="/" target="_blank">
            here
          </a>
          {'.'}
        </li>
      </div>
      {'Tip: '}
      You can{' '}
      <span>
        {' '}
        <SeedButton />{' '}
      </span>{' '}
      with a few pages, posts, and projects to jump-start your new site.
      <br />
    </div>
  )
}
