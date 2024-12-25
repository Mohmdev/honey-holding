import { draftMode } from 'next/headers'

import { getPayload } from 'payload'

import config from '@payload-config'

import type {
  Asset,
  Footer,
  GlobalSetting,
  MainMenu,
  Page,
  Portfolio,
  Post
} from '@payload-types'

export const fetchGlobals = async (): Promise<{
  footer: Footer
  mainMenu: MainMenu
}> => {
  const payload = await getPayload({ config })
  const mainMenu = await payload.findGlobal({
    slug: 'main-menu',
    depth: 1
  })
  const footer = await payload.findGlobal({
    slug: 'footer',
    depth: 1
  })

  return {
    footer,
    mainMenu
  }
}

export const fetchPage = async (
  incomingSlugSegments: string[]
): Promise<Page | null> => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config })
  const slugSegments = incomingSlugSegments || ['home']
  const slug = slugSegments.at(-1)

  const data = await payload.find({
    collection: 'pages',
    depth: 2,
    draft: true,
    limit: 1,
    where: {
      and: [
        {
          slug: {
            equals: slug
          }
        },
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

  const pagePath = `/${slugSegments.join('/')}`

  const page = data.docs.find(({ breadcrumbs }: Page) => {
    if (!breadcrumbs) return false
    const { url } = breadcrumbs[breadcrumbs.length - 1]
    return url === pagePath
  })

  if (page) {
    return page
  }

  return null
}

export const fetchPages = async (): Promise<Partial<Page>[]> => {
  const payload = await getPayload({ config })
  const data = await payload.find({
    collection: 'pages',
    depth: 0,
    limit: 300,
    select: {
      breadcrumbs: true
    },
    where: {
      and: [
        {
          slug: {
            not_equals: 'dashboard'
          }
        },
        {
          _status: {
            equals: 'published'
          }
        }
      ]
    }
  })

  return data.docs
}

export const fetchPosts = async (): Promise<Partial<Post>[]> => {
  const payload = await getPayload({ config })
  const data = await payload.find({
    collection: 'posts',
    depth: 0,
    limit: 300,
    select: {
      slug: true
    }
  })

  return data.docs
}

export const fetchBlogPosts = async (): Promise<Partial<Post>[]> => {
  const currentDate = new Date()
  const payload = await getPayload({ config })

  const data = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 300,
    select: {
      slug: true,
      authors: true,
      image: true,
      publishedOn: true,
      title: true
    },
    sort: '-publishedOn',
    where: {
      and: [
        { publishedOn: { less_than_equal: currentDate } },
        { _status: { equals: 'published' } }
      ]
    }
  })
  return data.docs
}

export const fetchBlogPost = async (slug: string): Promise<Post> => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config })

  const data = await payload.find({
    collection: 'posts',
    depth: 2,
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

// export const fetchRelatedThreads = async (
//   path: string
// ): Promise<Partial<CommunityHelp>[]> => {
//   const payload = await getPayload({ config })

//   const data = await payload.find({
//     collection: 'community-help',
//     depth: 0,
//     limit: 3,
//     select: {
//       slug: true,
//       communityHelpType: true,
//       title: true
//     },
//     where: { 'relatedDocs.path': { equals: path } }
//   })

//   return data.docs
// }
