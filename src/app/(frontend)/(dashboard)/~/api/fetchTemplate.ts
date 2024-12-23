import { getClientSideURL } from '@utils/getURL'

import type { Template } from '@dashboard/types'

import { TEMPLATE } from '@data/templates'

export const fetchTemplate = async (
  templateSlug?: string
): Promise<Template> => {
  const doc: Template = await fetch(`${getClientSideURL()}/api/graphql`, {
    body: JSON.stringify({
      query: TEMPLATE,
      variables: {
        slug: templateSlug
      }
    }),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
    ?.then((res) => res.json())
    ?.then((res) => {
      if (res.errors)
        throw new Error(res?.errors?.[0]?.message ?? 'Error fetching doc')
      return res?.data?.Templates?.docs?.[0]
    })

  return doc
}
