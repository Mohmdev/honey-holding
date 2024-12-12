import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/lib/api/getGlobals'
import { AdminBar } from '@/components/AdminBar'
import React from 'react'

import type { Header } from '@/payload-types'
import { draftMode } from 'next/headers'

export async function Header() {
  const { isEnabled } = await draftMode()

  const headerData: Header = await getCachedGlobal('header', 1)()

  return (
    <header className="h-max">
      <AdminBar adminBarProps={{ preview: isEnabled }} />
      <HeaderClient
        data={headerData}
        //  logoUrl={logoUrl}
        //  className={className}
      />
    </header>
  )
}
