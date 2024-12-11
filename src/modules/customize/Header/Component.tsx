import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/lib/api/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'

export async function Header() {
  const header: Header = await getCachedGlobal('header', 1)()

  return <HeaderClient header={header} />
}
