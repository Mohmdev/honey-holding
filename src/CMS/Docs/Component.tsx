import React from 'react'
import { Banner } from '@payloadcms/ui/elements/Banner'
import { GettingStarted } from './GettingStarted'
import { LibraryBigIcon } from 'lucide-react'

import type { ServerSideEditViewProps } from 'payload'
import classes from './Component.module.scss'

export const Docs: React.FC<ServerSideEditViewProps> = () => {
  const defaultKey = 'getting-started'
  const ActiveComponent = Documentation[defaultKey].component

  return (
    <div className={classes['before-dashboard']}>
      <Banner
        type="default"
        icon={<LibraryBigIcon />}
        className={classes['before-dashboard__banner']}
      >
        <h2>Nexweb Documentation</h2>
      </Banner>
      <div className={classes['before-dashboard__content']}>
        <aside className={classes['before-dashboard__sidebar']}>
          <ul>
            {Object.entries(Documentation).map(([key, { title }]) => (
              <li
                key={key}
                className={`${classes['before-dashboard__sidebar-item']} ${
                  key === defaultKey ? classes['before-dashboard__sidebar-item--active'] : ''
                }`}
              >
                {title}
              </li>
            ))}
          </ul>
        </aside>
        <div>
          <ActiveComponent />
        </div>
      </div>
    </div>
  )
}


const Documentation = {
  'getting-started': {
    title: 'Getting Started',
    component: GettingStarted,
  },
  'collections': {
    title: 'Collections',
    component: () => (
      <div>
        <h3>Collections Documentation</h3>
        <p>Learn about how collections are structured in this project.</p>
      </div>
    ),
  },
  'deployment': {
    title: 'Deployment',
    component: () => (
      <div>
        <h3>Deployment Guide</h3>
        <p>Instructions for deploying your Nexweb application.</p>
      </div>
    ),
  },
}
