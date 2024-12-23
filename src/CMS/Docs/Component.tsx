import React from 'react'

import { Banner } from '@payloadcms/ui/elements/Banner'

import type { ServerSideEditViewProps } from 'payload'

import classes from './Component.module.scss'
import { DocsView } from './DocsView'

interface SearchParams {
  doc?: string
}

interface DocsProps extends ServerSideEditViewProps {
  search: SearchParams
}

export const Docs: React.FC<DocsProps> = ({ search = {} as SearchParams }) => {
  const docKey = search.doc || 'getting-started'

  return (
    <div className={classes['before-dashboard']}>
      <Banner type="info" className={classes['before-dashboard__banner']}>
        <h2>Documentation</h2>
      </Banner>
      <DocsView activeKey={docKey} />
    </div>
  )
}
