import React from 'react'
import { Banner } from '@payloadcms/ui/elements/Banner'

import type { ServerSideEditViewProps } from 'payload'

import classes from './Component.module.scss'

// TODOD
export const Documentation: React.FC<ServerSideEditViewProps> = () => {
  return (
    <div className={classes['before-dashboard']}>
      <Banner className={classes['before-dashboard__banner']} type="success">
        <h4>Coming soon.</h4>
      </Banner>
    </div>
  )
}
