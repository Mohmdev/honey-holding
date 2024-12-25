import React from 'react'
import { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'

import { fetchPage, fetchPages } from '@data'

import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'

import { RenderBlocks } from '@blocks/RenderBlocks'

import { RenderHero } from '@components/Hero/RenderHero'
import { LivePreviewListener } from '@components/LivePreviewListener'
import { PayloadRedirects } from '@components/PayloadRedirects'

const getPage = async (slug, draft?: boolean) =>
  draft // is draft mode?
    ? fetchPage(slug) // Yes: direct fetch
    : unstable_cache(fetchPage, [`page-${slug}`])(slug) // No: cached fetch

export default async function Page({
  params
}: {
  params: Promise<{
    slug?: string
  }>
}) {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await params
  const url = '/' + (Array.isArray(slug) ? slug.join('/') : slug)

  const page = await getPage(slug, draft)

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  return (
    <React.Fragment>
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <RenderHero page={page} firstContentBlock={page.layout[0]} />
      <RenderBlocks blocks={page.layout} hero={page.hero} />
    </React.Fragment>
  )
}

export async function generateStaticParams() {
  const getPages = unstable_cache(fetchPages, ['pages'])
  const pages = await getPages()

  return pages.map(({ breadcrumbs }) => ({
    slug: breadcrumbs?.[breadcrumbs.length - 1]?.url
      ?.replace(/^\/|\/$/g, '')
      .split('/')
  }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{
    slug: any
  }>
}): Promise<Metadata> {
  const { slug } = await params
  const { isEnabled: draft } = await draftMode()
  const page = await getPage(slug, draft)

  const ogImage =
    typeof page?.meta?.image === 'object' &&
    page?.meta?.image !== null &&
    'url' in page?.meta?.image &&
    `${page.meta.image.url}`

  // check if noIndex is true
  const noIndexMeta = page?.noindex ? { robots: 'noindex' } : {}

  return {
    title: page?.meta?.title || 'Payload',
    description: page?.meta?.description,
    openGraph: mergeOpenGraph({
      title: page?.meta?.title || 'Payload',
      description: page?.meta?.description ?? undefined,
      url: Array.isArray(slug) ? slug.join('/') : '/',
      images: ogImage
        ? [
            {
              url: ogImage
            }
          ]
        : undefined
    }),
    ...noIndexMeta // Add noindex meta tag if noindex is true
  }
}
