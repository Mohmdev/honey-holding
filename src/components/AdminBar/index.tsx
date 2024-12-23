'use client'

import React, { useState } from 'react'
import { useRouter, useSelectedLayoutSegments } from 'next/navigation'

import { cn } from '@utils/cn'
import { getClientSideURL } from '@utils/getURL'

import { PayloadAdminBar } from './admin-bar'

import './index.module.scss'

import type { PayloadAdminBarProps } from './admin-bar'

const baseClass = 'admin-bar'

const collectionLabels = {
  pages: {
    plural: 'Pages',
    singular: 'Page'
  },
  posts: {
    plural: 'Posts',
    singular: 'Post'
  },
  projects: {
    plural: 'Projects',
    singular: 'Project'
  }
}

const Title: React.FC = () => <span>Dashboard</span>

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps
}> = (props) => {
  const { adminBarProps } = props || {}
  const segments = useSelectedLayoutSegments()
  const [show, setShow] = useState(false)
  const collection = collectionLabels?.[segments?.[1]] ? segments?.[1] : 'pages'
  const router = useRouter()

  const onAuthChange = React.useCallback((user) => {
    setShow(user?.id)
  }, [])

  return (
    <div
      className={cn(baseClass, 'bg-black py-2 text-white', {
        block: show,
        hidden: !show
      })}
    >
      <div className="container">
        <PayloadAdminBar
          {...adminBarProps}
          className="py-2 text-white"
          classNames={{
            controls: 'font-medium text-white',
            logo: 'text-white',
            user: 'text-white'
          }}
          cmsURL={getClientSideURL()}
          collection={collection}
          collectionLabels={{
            plural: collectionLabels[collection]?.plural || 'Pages',
            singular: collectionLabels[collection]?.singular || 'Page'
          }}
          logo={<Title />}
          onAuthChange={onAuthChange}
          onPreviewExit={() => {
            fetch('/next/exit-preview').then(() => {
              router.push('/')
              router.refresh()
            })
          }}
          style={{
            backgroundColor: 'transparent',
            padding: 0,
            position: 'relative',
            zIndex: 'unset'
          }}
        />
      </div>
    </div>
  )
}
