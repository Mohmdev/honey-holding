import React, { useState } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { CTAs } from './cta'
import { Logo } from './logo'
import { Links } from './links'
import { MobileMenu } from './mobile-menu'

const ExampleFlyoutNav = () => {
  return (
    <>
      <FlyoutNav />
      <div
        className="relative min-h-screen"
        style={{
          backgroundImage: 'url(/imgs/random/12.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-neutral-950/90 to-neutral-950/0" />
      </div>
      <div className="h-screen bg-neutral-50" />
    </>
  )
}

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

export default ExampleFlyoutNav
