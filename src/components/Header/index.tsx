'use client'

import * as React from 'react'
import { useSearchParams } from 'next/navigation'

import { useModal } from '@faceless-ui/modal'
import { useScrollInfo } from '@faceless-ui/scroll-info'

import { useHeaderObserver } from '@providers/HeaderIntersectionObserver'

import { MainMenu } from '@payload-types'

import { UniversalTruth } from '@components/UniversalTruth'

import { DesktopNav } from './DesktopNav'
import classes from './index.module.scss'
import { MobileNav, modalSlug as mobileNavModalSlug } from './MobileNav'

export const Header: React.FC<MainMenu> = ({ tabs, menuCta }) => {
  const { isModalOpen } = useModal()
  const isMobileNavOpen = isModalOpen(mobileNavModalSlug)
  const { headerTheme } = useHeaderObserver()
  const { y } = useScrollInfo()
  const [hideBackground, setHideBackground] = React.useState(true)

  React.useEffect(() => {
    if (isMobileNavOpen) {
      setHideBackground(false)
    } else {
      setHideBackground(y < 30)
    }
  }, [y, isMobileNavOpen])

  return (
    <div data-theme={headerTheme}>
      <header
        className={[
          classes.header,
          hideBackground && classes.hideBackground,
          isMobileNavOpen && classes.mobileNavOpen,
          headerTheme && classes.themeIsSet
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <DesktopNav
          tabs={tabs}
          hideBackground={hideBackground}
          menuCta={menuCta}
        />
        <MobileNav tabs={tabs} menuCta={menuCta} />
        <React.Suspense>
          <UniversalTruth />
        </React.Suspense>
      </header>
    </div>
  )
}
