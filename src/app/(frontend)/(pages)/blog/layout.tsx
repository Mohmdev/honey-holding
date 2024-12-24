import React from 'react'
import { Metadata } from 'next'

import BreadcrumbsBar from '@components/Hero/BreadcrumbsBar'

export default async function Layout({ children }) {
  return (
    <React.Fragment>
      <BreadcrumbsBar hero={{ type: 'default' }} breadcrumbs={[]} />
      {children}
    </React.Fragment>
  )
}

export const metadata: Metadata = {
  title: 'Blog | Nexweb',
  description:
    'The official Nexweb blog. Read about the product and keep up to date with new features.'
}
