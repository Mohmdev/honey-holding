'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import { getServerSideURL } from '@utils/getURL'

import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'

export const LivePreviewListener: React.FC = () => {
  const router = useRouter()
  return (
    <PayloadLivePreview
      // refresh={() => router.refresh()}  // creates a new function on every render
      refresh={router.refresh} // passes the function reference directly, no new function created
      serverURL={getServerSideURL() || ''}
    />
  )
}
