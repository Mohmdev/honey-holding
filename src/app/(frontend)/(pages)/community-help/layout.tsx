import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Community Help | Nexweb',
    template: '%s | Community Help | Nexweb'
  },
  description:
    'Find what you need faster. The Nexweb Community Help archive is a great place to start.'
}

export default async function Layout({ children }) {
  return <>{children}</>
}
