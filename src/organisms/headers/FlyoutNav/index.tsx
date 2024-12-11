'use client'

import React, { useState } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { CTAs } from './cta'
import { Logo } from './logo'
import { Links } from './links'
import { MobileMenu } from './mobile-menu'

const FlyoutNav = () => {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 250 ? true : false)
  })

  return (
    <nav
      className={`fixed top-0 z-50 w-full px-6 text-white
      transition-all duration-300 ease-out lg:px-12
      ${scrolled ? 'bg-neutral-950 py-3 shadow-xl' : 'bg-neutral-950/0 py-6 shadow-none'}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Logo />
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
