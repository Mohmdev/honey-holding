import { Metadata } from 'next'

import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'

import { DashboardPage } from './page_client'

import { DASHBOARD_SLUG } from '@constants'
import { getMeUser } from '@data/getMeUser'

export default async function Page() {
  const { user } = await getMeUser()
  return <DashboardPage user={user} />
}

export const metadata: Metadata = {
  title: 'Home | Nexweb Dashboard',
  openGraph: mergeOpenGraph({
    title: 'Home | Nexweb Dashboard',
    url: `/${DASHBOARD_SLUG}`
  })
}
