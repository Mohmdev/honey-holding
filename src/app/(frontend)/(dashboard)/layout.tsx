import { Metadata } from 'next'

import { DashboardFooter } from '@root/app/(frontend)/(dashboard)/~/components/DashboardFooter'
import { DashboardHeader } from '@root/app/(frontend)/(dashboard)/~/components/DashboardHeader'

import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'

import classes from './layout.module.scss'

export const metadata: Metadata = {
  title: {
    template: '%s | Nexweb Dashboard',
    default: 'Nexweb Dashboard'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexweb',
    description: 'The Node & React TypeScript Headless CMS',
    creator: '@mohmdev'
  },
  // TODO: Add Dashboard graphic
  openGraph: mergeOpenGraph()
}

export default async function Layout(props) {
  const { children } = props

  return (
    <div className={classes.layout}>
      <DashboardHeader />
      <div className={classes.container}>{children}</div>
      <DashboardFooter />
    </div>
  )
}
