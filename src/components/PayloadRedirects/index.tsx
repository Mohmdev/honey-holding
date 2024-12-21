import { notFound, redirect } from 'next/navigation'
import type React from 'react'

import { getCachedDocument } from '@utils/getDocument'
import { getCachedRedirects } from '@utils/getRedirects'

import type { Page, Portfolio, Post } from '@payload-types'

interface Props {
  disableNotFound?: boolean
  url: string
}

// TODO: Refactor this to be dynamic instead of hardcoded

/* This component helps us with SSR based dynamic redirects */
export const PayloadRedirects: React.FC<Props> = async ({
  disableNotFound,
  url
}) => {
  const slug = url.startsWith('/') ? url : `${url}`

  const redirects = await getCachedRedirects()()

  const redirectItem = redirects.find((redirect) => redirect.from === slug)

  const isDocument = (value: any): value is Page | Post | Portfolio => {
    return typeof value === 'object' && value !== null
  }

  if (redirectItem) {
    if (redirectItem.to?.url) {
      redirect(redirectItem.to.url)
    }

    let redirectUrl: string

    if (typeof redirectItem.to?.reference?.value === 'string') {
      const collection = redirectItem.to?.reference?.relationTo
      const id = redirectItem.to?.reference?.value

      const document = (await getCachedDocument(collection, id)()) as
        | Page
        | Post
        | Portfolio

      redirectUrl =
        redirectItem.to?.reference?.relationTo === 'posts'
          ? '/blog/'
          : redirectItem.to?.reference?.relationTo === 'portfolio'
            ? '/portfolio/'
            : `${'breadcrumbs' in document && document.breadcrumbs?.at(-1)?.url}`
    } else {
      redirectUrl =
        redirectItem.to?.reference?.relationTo === 'posts'
          ? `/blog/${isDocument(redirectItem.to?.reference?.value) ? redirectItem.to?.reference?.value?.slug : ''}`
          : redirectItem.to?.reference?.relationTo === 'portfolio'
            ? `/portfolio/${isDocument(redirectItem.to?.reference?.value) ? redirectItem.to?.reference?.value?.slug : ''}`
            : isDocument(redirectItem.to?.reference?.value) &&
                'breadcrumbs' in redirectItem.to?.reference?.value
              ? `${redirectItem.to?.reference?.value?.breadcrumbs?.at(-1)?.url}`
              : '/'
    }

    if (redirectUrl) redirect(redirectUrl)
  }

  if (disableNotFound) return null
  return notFound()
}
