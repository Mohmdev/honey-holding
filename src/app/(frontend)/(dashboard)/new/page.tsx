import React, { Fragment } from 'react'
import { Metadata } from 'next'

import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'

import { Gutter } from '@components/Gutter'
import { NewProjectBlock } from '@components/NewProject'
import { RenderParams } from '@components/RenderParams'
import { fetchTemplates } from '@dashboard/api/fetchTemplates.js'

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
