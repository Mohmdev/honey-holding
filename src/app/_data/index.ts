import { draftMode } from 'next/headers'

import { getPayload } from 'payload'

import config from '@payload-config'

import type { Portfolio } from '@payload-types'

export const fetchPortfolioItems = async (): Promise<Partial<Portfolio>[]> => {
  const payload = await getPayload({ config })
  const data = await payload.find({
    collection: 'portfolio',
    depth: 0,
    limit: 300,
    select: {
      slug: true
    }
  })

  return data.docs
}

export const fetchPortfolioItem = async (slug: string): Promise<Portfolio> => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config })

  const data = await payload.find({
    collection: 'portfolio',
    depth: 1,
    draft,
    limit: 1,
    where: {
      and: [
        { slug: { equals: slug } },
        ...(draft
          ? []
          : [
              {
                _status: {
                  equals: 'published'
                }
              }
            ])
      ]
    }
  })

  return data.docs[0]
}
