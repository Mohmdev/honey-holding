import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'

import { getPayload } from 'payload'

import configPromise from '@payload-config'

import type { Config } from '@payload-types'

type Global = keyof Config['globals']

interface GlobalOptions<T extends Global> {
  depth?: number
  select?: Config['globalsSelect'][T]
}

async function getGlobal<T extends Global>(
  slug: T,
  { depth = 0, select = {} }: GlobalOptions<T> = {}
) {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
    select
  })

  return global as Config['globals'][T]
}

/**
 *
 * Caching layer for global settings
 *
 * @param slug
 * @param options
 *
 * Returns a unstable_cache function mapped with the cache tag for the slug
 *
 */
export const getCachedGlobals = async <T extends Global>(
  slug: T,
  options: GlobalOptions<T> = {}
) => {
  try {
    const { isEnabled: draft } = await draftMode()
    return draft
      ? getGlobal(slug, options)
      : unstable_cache(async () => getGlobal(slug, options), [slug], {
          tags: [`global_${slug}`]
        })
  } catch (err) {
    // Default to cached version during build
    return unstable_cache(async () => getGlobal(slug, options), [slug], {
      tags: [`global_${slug}`]
    })
  }
}
