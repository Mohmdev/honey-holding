import { Fragment } from 'react'
import { Metadata } from 'next'

import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'

import { Gutter } from '@components/Gutter'
import { RenderParams } from '@components/RenderParams'
import { fetchMe } from '@dashboard/api/fetchMe'

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
  // TODO: Add cloud graphic
  openGraph: mergeOpenGraph()
}

export default async function Layout(props) {
  const { children } = props

  await fetchMe({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to visit this page'
    )}`
  })

  return (
    <Fragment>
      <Gutter>
        <RenderParams />
      </Gutter>
      {children}
    </Fragment>
  )
}
