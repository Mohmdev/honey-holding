import React from 'react'
import { Metadata } from 'next'

import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'

import { DashboardFooter } from '@dashboard/components/DashboardFooter'
import { DashboardHeader } from '@dashboard/components/DashboardHeader'

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
interface LayoutProps {
  children: React.ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <div className={classes.layout}>
      <DashboardHeader />
      <div className={classes.container}>{children}</div>
      <DashboardFooter />
    </div>
  )
}
