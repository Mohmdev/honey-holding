'use client'

import React, { useState } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { CTAs } from './cta'
import { Links } from './links'
import { MobileMenu } from './mobile-menu'
import { DynamicLogo } from '@/components/DynamicLogo'
import { cn } from '@/lib/utilities/cn'

const FlyoutNav = () => {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 250 ? true : false)
  })

  return (
    <nav
      className={cn(
        'fixed top-0 z-50 w-full px-6 transition-all duration-300 ease-out lg:px-12 text-secondary-foreground',
        scrolled
          ? 'bg-background dark:bg-neutral-950 py-3 shadow-md'
          : 'bg-background/0 dark:bg-neutral-950/0 py-6 shadow-none',
      )}
    >
      <div className="container flex items-center justify-between">
        <DynamicLogo />
        <div className="hidden gap-6 lg:flex">
          <Links />
          <CTAs />
        </div>
        <MobileMenu />
      </div>
    </nav>
  )
}

export default FlyoutNav
