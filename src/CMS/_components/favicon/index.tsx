import React from 'react'

import { getCachedGlobals } from '@utils/getGlobals'

import type { Graphic } from '@payload-types'

export const AdminFavicon: React.FC = async () => {
  const favicon = (await getCachedGlobals('graphics', {
    select: { favicon: true }
  })()) as Graphic['favicon']

  return (
    <>
      {favicon && typeof favicon === 'object' && favicon.url ? (
        //  <link href={favicon.url} rel="icon" type="image/svg+xml" />
        <>
          {favicon.mimeType === 'image/svg+xml' && (
            <link href={favicon.url} rel="icon" type="image/svg+xml" />
          )}
          {favicon.mimeType === 'image/png' && (
            <link href={favicon.url} rel="icon" type="image/png" />
          )}
          {favicon.mimeType === 'image/x-icon' && (
            <link href={favicon.url} rel="icon" sizes="32x32" />
          )}
        </>
      ) : (
        <>
          <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
          <link href="/favicon.ico" rel="icon" sizes="32x32" />
        </>
      )}
    </>
  )
}
