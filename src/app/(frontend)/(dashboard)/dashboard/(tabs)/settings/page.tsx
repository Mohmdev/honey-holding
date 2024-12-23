import { Metadata } from 'next'

import { fetchMe } from '@cloud/_api/fetchMe.js'
import { mergeOpenGraph } from '@seo/mergeOpenGraph.js'

import { SettingsPage } from './page_client.js'

export default async () => {
  const { user } = await fetchMe()
  return <SettingsPage user={user} />
}

export const metadata: Metadata = {
  title: 'My Account',
  openGraph: mergeOpenGraph({
    title: 'My Account',
    url: `/cloud/settings`
  })
}
