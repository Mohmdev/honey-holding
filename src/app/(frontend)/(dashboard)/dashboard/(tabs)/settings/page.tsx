import { Metadata } from 'next'

import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'

import { fetchMe } from '@dashboard/api/fetchMe'

import { SettingsPage } from './page_client'

export default async function Page() {
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
