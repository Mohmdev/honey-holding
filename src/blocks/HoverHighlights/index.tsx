import React, { Fragment } from 'react'

import { Page } from '@payload-types'

import { ArrowIcon } from '@icons/ArrowIcon'
import { BackgroundGrid } from '@components/Background/Grid'
import { BackgroundScanline } from '@components/Background/Scanline'
import { BlockWrapper } from '@components/BlockWrapper'
import { CMSLink } from '@components/CMSLink'
import { Gutter } from '@components/Gutter'
import { Media } from '@components/Media'

import { Highlights } from './Highlights'
import classes from './index.module.scss'

export type HoverHighlightProps = Extract<
  Page['layout'][0],
  { blockType: 'hoverHighlights' }
> & {
  hideBackground?: boolean
}

export const HoverHighlights: React.FC<HoverHighlightProps> = (props) => {
  const { hoverHighlightsFields, hideBackground } = props
  const { settings, beforeHighlights, highlights, afterHighlights, link } =
    hoverHighlightsFields || {}

  return (
    <BlockWrapper
      settings={settings}
      className={classes.BlockWrapper}
      hideBackground={hideBackground}
    >
      <Gutter className={classes.gutter}>
        <div className={[classes.wrapper, 'grid'].join(' ')}>
          <Highlights
            beforeHighlights={beforeHighlights}
            afterHighlights={afterHighlights}
            button={link}
          >
            {highlights &&
              Array.isArray(highlights) && [
                ...highlights.map((highlight, key) => {
                  const { top, bottom } = highlight.media || {}
                  return (
                    <Fragment key={key}>
                      <CMSLink
                        className={classes.highlightText}
                        {...highlight.link}
                      >
                        {highlight.text}
                        <ArrowIcon
                          className={classes.arrow}
                          size="large"
                          bold
                        />
                      </CMSLink>
                      <div className={classes.highlightMediaTop}>
                        {top && typeof top !== 'number' && (
                          <Media
                            resource={top}
                            className={[classes.media, classes.mediaTop].join(
                              ' '
                            )}
                          />
                        )}
                      </div>
                      <div className={classes.highlightMediaBottom}>
                        {bottom && typeof bottom !== 'number' && (
                          <Media
                            resource={bottom}
                            className={[
                              classes.media,
                              classes.mediaBottom
                            ].join(' ')}
                          />
                        )}
                      </div>
                    </Fragment>
                  )
                })
              ]}
          </Highlights>
        </div>
      </Gutter>
      <BackgroundScanline className={classes.rightMargin} />
      <BackgroundGrid zIndex={0} />
    </BlockWrapper>
  )
}
