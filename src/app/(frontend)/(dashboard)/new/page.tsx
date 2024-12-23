import React, { Fragment } from 'react'
import { Metadata } from 'next'

import { fetchTemplates } from '@cloud/_api/fetchTemplates.js'
import { mergeOpenGraph } from '@seo/mergeOpenGraph.js'

import { Gutter } from '@components/Gutter'
import { NewProjectBlock } from '@components/NewProject'
import { RenderParams } from '@components/RenderParams'

export const dynamic = 'force-dynamic'

export default async function NewProjectPage({
  searchParams
}: {
  searchParams: Promise<{
    team: string
  }>
}) {
  const { team: teamSlug } = await searchParams
  const templates = await fetchTemplates()

  return (
    <Fragment>
      <Gutter>
        <RenderParams />
      </Gutter>
      <NewProjectBlock templates={templates} teamSlug={teamSlug} />
    </Fragment>
  )
}

export const metadata: Metadata = {
  title: 'New Project | Payload Cloud',
  openGraph: mergeOpenGraph({
    title: 'New Project | Payload Cloud',
    url: '/new'
  })
}
