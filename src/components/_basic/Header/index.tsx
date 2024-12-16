import React from 'react'

import { getCachedGlobal } from '@utils/getGlobals'

import type { Header } from '@payload-types'

import { HeaderClient } from './index.client'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()

  return <HeaderClient data={headerData} />
}
