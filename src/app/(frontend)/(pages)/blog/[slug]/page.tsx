import React from 'react'
import { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'

import { fetchBlogPost, fetchPosts } from '@data'

import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'
import { getServerSideURL } from '@utils/getURL'

import { PayloadRedirects } from '@components/PayloadRedirects'
import { RefreshRouteOnSave } from '@components/RefreshRouterOnSave'

import { BlogPost } from './BlogPost'

const getPost = (slug, draft?) =>
  draft
    ? fetchBlogPost(slug)
    : unstable_cache(fetchBlogPost, ['blogPost', `post-${slug}`])(slug)

const Post = async ({
  params
}: {
  params: Promise<{
    slug: any
  }>
}) => {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await params

  const blogPost = await getPost(slug, draft)

  const url = `/blog/${slug}`

  if (!blogPost) {
    return <PayloadRedirects url={url} />
  }

  return (
    <>
      <PayloadRedirects disableNotFound url={url} />
      <RefreshRouteOnSave />
      <BlogPost {...blogPost} />
    </>
  )
}

export default Post

export async function generateStaticParams() {
  const getPosts = unstable_cache(fetchPosts, ['blogPosts'])
  const posts = await getPosts()

  return posts.map(({ slug }) => ({
    slug
  }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{
    slug: any
  }>
}): Promise<Metadata> {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await params
  const post = await getPost(slug, draft)

  const ogImage =
    typeof post?.meta?.image === 'object' &&
    post?.meta?.image !== null &&
    'url' in post?.meta?.image &&
    `${getServerSideURL()}${post.meta.image.url}`

  return {
    title: post?.meta?.title,
    description: post?.meta?.description,
    openGraph: mergeOpenGraph({
      title: post?.meta?.title ?? undefined,
      url: `/blog/${slug}`,
      description: post?.meta?.description ?? undefined,
      images: ogImage
        ? [
            {
              url: ogImage
            }
          ]
        : undefined
    })
  }
}
