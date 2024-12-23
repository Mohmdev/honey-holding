'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import { getClientSideURL } from '@utils/getURL'

import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'

export const RefreshRouteOnSave: React.FC = () => {
  const router = useRouter()

  return (
    <PayloadLivePreview
      refresh={() => router.refresh()}
      serverURL={getClientSideURL()}
    />
  )
}
