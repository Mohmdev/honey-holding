import { Collections } from './collections'
import { Deployment } from './deployment'
import { GettingStarted } from './getting-started'

export const Tabs = {
  'getting-started': {
    title: 'Getting Started',
    component: GettingStarted
  },
  collections: {
    title: 'Collections',
    component: Collections
  },
  deployment: {
    title: 'Deployment',
    component: Deployment
  }
} as const
