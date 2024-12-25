import React from 'react'

import type { Asset } from '@payload-types'

import { getGlobalSettings } from '@data/globals/cachedSiteMeta'

interface FaviconProps {
  favicon?: Asset | null
}

const Favicon: React.FC<FaviconProps> = ({ favicon }) => {
  // const favicon = await getGlobalSettings.favicon()

  return (
    <>
      {favicon && 'url' in favicon && favicon.url ? (
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
    // <>
    //   {favicon && typeof favicon === 'object' && favicon.url ? (
    //     //  <link href={favicon.url} rel="icon" type="image/svg+xml" />
    //     <>
    //       {favicon.mimeType === 'image/svg+xml' && (
    //         <link href={favicon.url} rel="icon" type="image/svg+xml" />
    //       )}
    //       {favicon.mimeType === 'image/png' && (
    //         <link href={favicon.url} rel="icon" type="image/png" />
    //       )}
    //       {favicon.mimeType === 'image/x-icon' && (
    //         <link href={favicon.url} rel="icon" sizes="32x32" />
    //       )}
    //     </>
    //   ) : (
    //     <>
    //       <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
    //       <link href="/favicon.ico" rel="icon" sizes="32x32" />
    //     </>
    //   )}
    // </>
  )
}

export default Favicon
