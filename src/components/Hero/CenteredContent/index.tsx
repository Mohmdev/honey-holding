'use client'

import React from 'react'

import { BlocksProp } from '@blocks/RenderBlocks'

import { Page } from '@payload-types'

import { BackgroundGrid } from '@components/Background/Grid'
import { BlockWrapper } from '@components/BlockWrapper'
import { CMSLink } from '@components/CMSLink'
import { Gutter } from '@components/Gutter'
import { useGetHeroPadding } from '@components/Hero/useGetHeroPadding'
import { Media } from '@components/Media'
import { RichText } from '@components/RichText'

import classes from './index.module.scss'

export const CenteredContent: React.FC<
  Pick<
    Page['hero'],
    'richText' | 'links' | 'theme' | 'media' | 'enableMedia'
  > & {
    breadcrumbs?: Page['breadcrumbs']
    firstContentBlock?: BlocksProp
  }
> = ({
  richText,
  links,
  media,
  enableMedia,
  breadcrumbs,
  theme,
  firstContentBlock
}) => {
  const padding = useGetHeroPadding(theme, firstContentBlock)

  return (
    <BlockWrapper settings={{ theme }} padding={padding}>
      <BackgroundGrid zIndex={0} />
      <Gutter>
        <div className={[classes.container, 'grid'].filter(Boolean).join(' ')}>
          <div
            className={[classes.content, 'cols-8 start-5 start-m-1 cols-m-8']
              .filter(Boolean)
              .join(' ')}
          >
            <div className={classes.richText}>
              <RichText content={richText} />
            </div>

            <div className={[classes.links].filter(Boolean).join(' ')}>
              {Array.isArray(links) &&
                links.map(({ link }, i) => {
                  return (
                    <CMSLink
                      key={i}
                      {...link}
                      buttonProps={{
                        hideHorizontalBorders: true,
                        hideBottomBorderExceptLast: true
                      }}
                    />
                  )
                })}
            </div>
          </div>
          {enableMedia && media && typeof media !== 'string' && (
            <div
              className={[classes.mediaWrap, 'cols-16 start-1 cols-m-8']
                .filter(Boolean)
                .join(' ')}
            >
              <Media resource={media} />
            </div>
          )}
        </div>
      </Gutter>
    </BlockWrapper>
  )
}
