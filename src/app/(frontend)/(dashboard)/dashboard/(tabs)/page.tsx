import { Metadata } from 'next'

import { DASHBOARD_SLUG } from '@lib/constants/constants'
import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'

import { DashboardPage } from './page_client'

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
