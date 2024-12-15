import React from 'react'
import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utils/getGlobals'

import type { Header } from '@/payload-types'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()

  return <HeaderClient data={headerData} />
}
