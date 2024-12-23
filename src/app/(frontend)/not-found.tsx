import React from 'react'
import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'

import { fetchGlobals } from '@data'

import { ErrorMessage } from '@components/ErrorMessage'
import { Footer } from '@components/Footer'
import { Header } from '@components/Header'

export default async function NotFound() {
  const { isEnabled: draft } = await draftMode()

  const getGlobals = draft
    ? fetchGlobals
    : unstable_cache(fetchGlobals, [
        'globals',
        'mainMenu',
        'footer',
        'graphics'
      ])

  const { footer, mainMenu, graphics } = await getGlobals()

  return (
    <React.Fragment>
      <Header {...mainMenu} {...graphics} />
      <div>
        <ErrorMessage />
        <div id="docsearch" />
        <Footer {...footer} />
      </div>
    </React.Fragment>
  )
}
