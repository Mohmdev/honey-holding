import React from 'react'
import { Banner } from '@payloadcms/ui/elements/Banner'
import type { ServerSideEditViewProps } from 'payload'
import classes from './Component.module.scss'
import { DocsWrapper } from './Component.client'

interface SearchParams {
  doc?: string
}

interface DocsViewProps extends ServerSideEditViewProps {
  search: SearchParams
}

export const Docs: React.FC<DocsViewProps> = ({ search = {} as SearchParams }) => {
  const docKey = search.doc || 'getting-started'

  return (
    <div className={classes['before-dashboard']}>
      <Banner
        type="default"
        className={classes['before-dashboard__banner']}
      >
        <h2>Nexweb Tabs</h2>
      </Banner>
      <DocsWrapper activeKey={docKey} />
    </div>
  )
}
