import React from 'react'
import { draftMode } from 'next/headers'

import type { Footer as FooterType, MainMenu } from '@payload-types'

import { ErrorMessage } from '@components/ErrorMessage'
import { Footer } from '@components/Footer'
import { Header } from '@components/Header'

import { getFooter } from '@data/globals/cachedFooter'
import { getMainMenu } from '@data/globals/cachedMainMenu'

export default async function NotFound() {
  const { isEnabled: draft } = await draftMode()

  const isDraft = draft && draft === true ? 'draft' : 'published'

  const footer: FooterType = await getFooter.all()
  const footerData =
    footer && isDraft === 'published' && typeof footer === 'object'
      ? (footer as FooterType)
      : ({
          id: 'preview-footer',
          _status: isDraft
        } as FooterType)

  const mainMenu: MainMenu = await getMainMenu.all()
  const mainMenuData =
    mainMenu && isDraft === 'published' && typeof mainMenu === 'object'
      ? (mainMenu as MainMenu)
      : ({
          id: 'preview-main-menu',
          _status: isDraft,
          menuCta: {
            label: 'Preview CTA',
            type: 'custom',
            url: '#'
          },
          tabs: []
        } as MainMenu)

  return (
    <React.Fragment>
      <Header {...mainMenuData} />
      <div>
        <ErrorMessage />
        <div id="docsearch" />
        {/* <Footer {...footer} /> */}
        <Footer {...footerData} />
      </div>
    </React.Fragment>
  )
}
