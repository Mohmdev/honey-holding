import React from 'react'
import RichText from '@/components/RichText'
import { Card } from '@/components/Card'
import { cn } from '@/utils/cn'

import type { Post } from '@/payload-types'

export type RelatedPostsProps = {
  className?: string
  docs?: Post[]
  introContent?: any
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={cn('lg:container', className)}>
      {introContent && <RichText data={introContent} enableGutter={false} />}

      <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 md:gap-8">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return (
            <Card key={index} doc={doc} relationTo="posts" showCategories />
          )
        })}
      </div>
    </div>
  )
}
