import * as React from 'react'
import Link from 'next/link'

import { Page } from '@payload-types'

import { BackgroundGrid } from '@components/Background/Grid'
import { BackgroundScanline } from '@components/Background/Scanline'
import { BlockWrapper, PaddingProps } from '@components/BlockWrapper'
import { Gutter } from '@components/Gutter'
import { Media } from '@components/Media'
import { RichText } from '@components/RichText'

// import { BlockSpacing } from '@components/BlockSpacing'
// import { PixelBackground } from '@components/PixelBackground'

import classes from './index.module.scss'

type Props = Extract<Page['layout'][0], { blockType: 'portfolioCards' }> & {
  padding?: PaddingProps
  hideBackground?: boolean
}

export const PortfolioCards: React.FC<Props> = (props) => {
  const { portfolioCardFields, padding, hideBackground } = props

  if (portfolioCardFields?.cards && portfolioCardFields?.cards?.length > 0) {
    return (
      <BlockWrapper
        className={classes.portfolioCards}
        settings={portfolioCardFields.settings}
        hideBackground={hideBackground}
        padding={padding}
      >
        <BackgroundGrid />
        <Gutter className={classes.gutter}>
          <BackgroundScanline className={classes.scanline} />
          {portfolioCardFields?.cards?.length > 0 && (
            <div className={classes.cards}>
              {portfolioCardFields.cards.map((card, i) => {
                if (
                  typeof card.portfolio === 'object' &&
                  card.portfolio !== null
                ) {
                  return (
                    <Link
                      href={`/portfolio/${card.portfolio.slug}`}
                      key={i}
                      className={classes.card}
                      prefetch={false}
                    >
                      <RichText
                        className={classes.content}
                        content={card.richText}
                      />
                      <div className={classes.media}>
                        {typeof card.portfolio.featuredImage !== 'number' && (
                          <Media resource={card.portfolio.featuredImage} fill />
                        )}
                      </div>
                    </Link>
                  )
                }

                return null
              })}
            </div>
          )}
        </Gutter>
      </BlockWrapper>
    )
  }

  return null
}
