import React from 'react'
import { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'
import { slugToText } from '@utils/slug-to-text'

import { Answer, Author, Comment, GithubDiscussionPage } from './client_page'

import { fetchCommunityHelp, fetchCommunityHelps } from '@data/community'

type DateFromSource = string

const isDiscussionData = (
  data: any
): data is {
  id: string
  title?: string
  slug?: string
  discordID?: string
  githubID?: string
  communityHelpType?: 'discord' | 'github'
  communityHelpJSON: {
    answer?: Answer
    author: Author
    body: string
    commentTotal: number
    comments: Comment[]
    createdAt: DateFromSource
    title: string
    id: string
    url: string
    upvotes: number
    slug: string
  }
} => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'title' in data &&
    'slug' in data &&
    'githubID' in data &&
    'communityHelpType' in data &&
    'communityHelpJSON' in data
  )
}

const getDiscussion = (slug, draft) =>
  draft
    ? fetchCommunityHelp(slug)
    : unstable_cache(fetchCommunityHelp, [`github-discussion-${slug}`])(slug)

const Discussion = async ({ params }) => {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await params

  const discussion = await getDiscussion(slug, draft)
  if (!discussion || !discussion.helpful) return notFound()

  if (!isDiscussionData(discussion)) {
    throw new Error('Unexpected github discussion thread data')
  }

  return <GithubDiscussionPage {...discussion} />
}

export default Discussion

export async function generateStaticParams() {
  if (process.env.NEXT_PUBLIC_SKIP_BUILD_HELPS) return []

  try {
    const getGithubDiscussions = unstable_cache(fetchCommunityHelps, [
      'github-discussions'
    ])
    const discussions = await getGithubDiscussions('github')
    return discussions?.map(({ slug }) => ({ slug: slug || '404' })) ?? []
  } catch (error) {
    console.error(error)
    return []
  }
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
  const discussion = await getDiscussion(slug, draft)
  return {
    title: slugToText(slug),
    openGraph: mergeOpenGraph({
      title: slugToText(slug),
      description: discussion?.introDescription ?? undefined,
      url: `/community-help/github/${slug}`
    })
  }
}
