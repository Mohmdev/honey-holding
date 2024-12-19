'use client'

import React, { useState } from 'react'

import { Page } from '@payload-types'

import { ArrowIcon } from '@icons/ArrowIcon'
import { BackgroundGrid } from '@components/Background/Grid'
import { BlockWrapper, PaddingProps } from '@components/BlockWrapper'
import { CMSLink } from '@components/CMSLink'
import { Gutter } from '@components/Gutter'

// import { BlockSpacing } from '@components/BlockSpacing'
// import { LineDraw } from '@components/LineDraw'

import classes from './index.module.scss'

export type LinkGridProps = Extract<
  Page['layout'][0],
  { blockType: 'linkGrid' }
> & {
  padding?: PaddingProps
  hideBackground?: boolean
}

type Fields = Exclude<LinkGridProps['linkGridFields'], undefined>

type Props = Exclude<Fields['links'], undefined | null>[number]['link']

const LinkGridItem: React.FC<Props> = (props) => {
  return (
    <CMSLink {...props} className={classes.link}>
      <ArrowIcon size="large" className={classes.arrow} />
    </CMSLink>
  )
}

export const LinkGrid: React.FC<
  LinkGridProps & {
    className?: string
  }
> = (props) => {
  const { className, linkGridFields, padding, hideBackground } = props

  const links = linkGridFields?.links
  const hasLinks = Array.isArray(links) && links.length > 0

  return (
    <BlockWrapper
      className={[className, classes.linkGrid].filter(Boolean).join(' ')}
      padding={padding}
      hideBackground={hideBackground}
      settings={linkGridFields?.settings}
    >
      <BackgroundGrid zIndex={0} />
      <Gutter>
        {hasLinks && (
          <div className={classes.links}>
            {links.map((link, index) => {
              return (
                <LinkGridItem
                  key={index}
                  {...(link?.link || {
                    label: 'Untitled'
                  })}
                />
              )
            })}
          </div>
        )}
      </Gutter>
    </BlockWrapper>
  )
}
