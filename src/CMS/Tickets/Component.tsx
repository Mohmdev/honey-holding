import React from 'react'
import { Banner } from '@payloadcms/ui/elements/Banner'

import type { ServerSideEditViewProps } from 'payload'

import classes from './Component.module.scss'

// TODOD
export const Tickets: React.FC<ServerSideEditViewProps> = () => {
  return (
    <div className={classes['before-dashboard']}>
      <Banner type="info" className={classes['before-dashboard__banner']}>
        <h3>Under development</h3>
      </Banner>
      <h5>Coming soon...</h5>
    </div>
  )
}
