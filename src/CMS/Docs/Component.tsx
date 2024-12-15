import React from 'react'
import { Banner } from '@payloadcms/ui/elements/Banner'
import { GettingStarted } from './GettingStarted'
import { LibraryBigIcon } from 'lucide-react'

import type { ServerSideEditViewProps } from 'payload'
import classes from './Component.module.scss'

export const Docs: React.FC<ServerSideEditViewProps> = () => {
  return (
    <div className={classes['before-dashboard']}>
      <Banner
        type="default"
        icon={<LibraryBigIcon />}
        className={classes['before-dashboard__banner']}
      >
        <h2>Nexweb Documentation</h2>
      </Banner>
      <div>
        <aside>
          {/* List of documentation docs in the sidebar */}
          {/* Make a sample list for now with the first item being "Getting Started" */}
        </aside>
        <div>
          {/* Here we render the content of the selected item in the list */}
          <GettingStarted />
        </div>
      </div>
    </div>
  )
}
