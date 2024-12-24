import React from 'react'
import { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'
import { slugToText } from '@utils/slug-to-text'

import { DiscordThreadPage, Messages } from './client_page'

import { fetchCommunityHelp, fetchCommunityHelps } from '@data/community'

const isThreadData = (
  data: any
): data is {
  id: string
  title?: string
  slug?: string
  discordID?: string
  githubID?: string
  communityHelpType?: 'discord' | 'github'
  communityHelpJSON: {
    info: {
      name: string
      id: string
      guildId: string
      createdAt: string | number
    }
    intro: Messages
    messageCount: number
    messages: Messages[]
    slug: string
  }
} => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'title' in data &&
    'slug' in data &&
    'discordID' in data &&
    'communityHelpType' in data &&
    'communityHelpJSON' in data
  )
}

const getDiscordThread = (slug: string, draft: boolean) =>
  draft
    ? fetchCommunityHelp(slug)
    : unstable_cache(fetchCommunityHelp, [`community-help-${slug}`])(slug)

const Thread = async ({ params }) => {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await params

  const thread = await getDiscordThread(slug, draft)

  // Algolia is return all threads as helpful, regardless of the value of the helpful field
  // So they are showing up in the archive at /community-help

  // This is a temporary fix to still show the page even if the thread is not marked as helpful

  // if (!thread || !thread.helpful) return notFound()
  if (!thread) return notFound()

  if (!isThreadData(thread)) {
    throw new Error('Unexpected thread data')
  }

  return <DiscordThreadPage {...thread} />
}

export default Thread

export async function generateStaticParams() {
  if (process.env.NEXT_PUBLIC_SKIP_BUILD_HELPS) return []

  try {
    const getDiscordThreads = unstable_cache(fetchCommunityHelps, [
      'discord-threads'
    ])
    const fetchedThreads = await getDiscordThreads('discord')
    return fetchedThreads?.map(({ slug }) => ({ slug: slug || '404' })) ?? []
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
  const thread = await getDiscordThread(slug, draft)
  return {
    title: slugToText(slug),
    openGraph: mergeOpenGraph({
      title: slugToText(slug),
      description: thread?.introDescription ?? undefined,
      url: `/community-help/discord/${slug}`
    })
  }
}