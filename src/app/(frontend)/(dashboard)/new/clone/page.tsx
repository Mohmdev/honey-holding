import React, { Fragment } from 'react'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { fetchMe } from '@cloud/_api/fetchMe.js'
import { fetchTemplates } from '@cloud/_api/fetchTemplates.js'
import { mergeOpenGraph } from '@seo/mergeOpenGraph.js'

import { Gutter } from '@components/Gutter'
import { NewProjectBlock } from '@components/NewProject'
import { RenderParams } from '@components/RenderParams'

export default async () => {
  const { user } = await fetchMe()

  if (!user) {
    redirect(
      `/login?redirect=${encodeURIComponent('/new/clone')}&warning=${encodeURIComponent(
        'You must first login to clone a template'
      )}`
    )
  }

  const templates = await fetchTemplates()

  return (
    <Fragment>
      <Gutter>
        <RenderParams />
      </Gutter>
      <NewProjectBlock templates={templates} />
    </Fragment>
  )
}

export const metadata: Metadata = {
  title: 'Clone Template | Payload Cloud',
  openGraph: mergeOpenGraph({
    title: 'Clone Template | Payload Cloud',
    url: '/new/clone'
  })
}
