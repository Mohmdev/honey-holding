import { Metadata } from 'next'

import { mergeOpenGraph } from '@lib/seo/mergeOpenGraph'

import { Logout } from './page_client'

export default function Page(props) {
  return <Logout {...props} />
}

export const metadata: Metadata = {
  title: 'Logout | Nexweb Cloud',
  description: 'Logout of Nexweb Cloud',
  openGraph: mergeOpenGraph({
    title: 'Logout | Nexweb Cloud',
    url: '/logout'
  })
}
