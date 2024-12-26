import { Metadata } from 'next'

import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'

import { SettingsPage } from './page_client'

import { DASHBOARD_SLUG } from '@constants'
import { getMeUser } from '@data/getMeUser'

export default async function Page() {
  const { user } = await getMeUser()
  return <SettingsPage user={user} />
}

export const metadata: Metadata = {
  title: 'My Account',
  openGraph: mergeOpenGraph({
    title: 'My Account',
    url: `/${DASHBOARD_SLUG}/settings`
  })
}
