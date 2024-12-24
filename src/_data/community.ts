// @ts-nocheck

import { getPayload } from 'payload'

export const fetchCommunityHelps = async (
  communityHelpType: CommunityHelp['communityHelpType']
): Promise<Pick<CommunityHelp, 'slug'>[]> => {
  const payload = await getPayload({ config })

  const data = await payload.find({
    collection: 'community-help',
    depth: 0,
    limit: 0,
    select: { slug: true },
    where: {
      and: [
        { communityHelpType: { equals: communityHelpType } },
        { helpful: { equals: true } }
      ]
    }
  })

  return data.docs
}

export const fetchCommunityHelp = async (
  slug: string
): Promise<CommunityHelp> => {
  const payload = await getPayload({ config })

  const data = await payload.find({
    collection: 'community-help',
    limit: 1,
    where: { slug: { equals: slug } }
  })

  return data.docs[0]
}
