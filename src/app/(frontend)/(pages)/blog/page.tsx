import React from 'react'
import { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'

import { fetchBlogPosts } from '@data'

import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'

import { RenderBlogArchive } from './renderBlogArchive'

const Page = async () => {
  const { isEnabled: draft } = await draftMode()
  const getBlogPosts = draft
    ? fetchBlogPosts
    : unstable_cache(fetchBlogPosts, ['blogPosts'])
  const blogPosts = await getBlogPosts()
  return <RenderBlogArchive posts={blogPosts} />
}

export default Page

export const metadata: Metadata = {
  openGraph: mergeOpenGraph({
    url: '/blog'
  })
}
