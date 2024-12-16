'use client'

import React from 'react'
import Link from 'next/link'

import { SearchIcon } from 'lucide-react'

import type { Header as HeaderType } from '@payload-types'

import { CMSLink } from '@components/_basic/CMSLink'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex items-center gap-3">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" />
      })}
      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="text-primary w-5" />
      </Link>
    </nav>
  )
}
