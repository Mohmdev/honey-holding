'use client'

import React from 'react'

import { BlocksProp } from '@blocks/RenderBlocks'

import { Page } from '@payload-types'

import { BackgroundGrid } from '@components/Background/Grid'
import { BlockWrapper } from '@components/BlockWrapper'
import { Breadcrumbs } from '@components/Breadcrumbs'
import { Gutter } from '@components/Gutter'
import { useGetHeroPadding } from '@components/Hero/useGetHeroPadding'
import { RichText } from '@components/RichText'

import classes from './index.module.scss'

export const DefaultHero: React.FC<
  Pick<Page['hero'], 'richText' | 'description' | 'theme'> & {
    firstContentBlock?: BlocksProp
  }
> = ({ richText, description, theme, firstContentBlock }) => {
  const withoutDescription =
    !description || description.root.children.length < 1

  return (
    <BlockWrapper
      settings={{ theme }}
      padding={{ top: 'small', bottom: 'small' }}
    >
      <Gutter>
        <BackgroundGrid zIndex={0} />
        <div className={classes.defaultHero}>
          <div
            className={[classes.container, 'grid'].filter(Boolean).join(' ')}
          >
            <div
              className={[`cols-8 start-1`, `cols-m-8`, 'cols-s-8']
                .filter(Boolean)
                .join(' ')}
            >
              <RichText className={classes.richText} content={richText} />
            </div>

            {!withoutDescription && (
              <div
                className={['cols-4 start-13 cols-m-8 start-m-1']
                  .filter(Boolean)
                  .join(' ')}
              >
                <RichText content={description} />
              </div>
            )}
          </div>
        </div>
      </Gutter>
    </BlockWrapper>
  )
}
