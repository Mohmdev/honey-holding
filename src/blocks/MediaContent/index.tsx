import * as React from 'react'

import { Page } from '@payload-types'

import { BackgroundGrid } from '@components/Background/Grid'
import { BlockWrapper, PaddingProps } from '@components/BlockWrapper'
import { Button } from '@components/ButtonComponent'
import { Gutter } from '@components/Gutter'
// import { Media } from '@components/Media'
import MediaParallax from '@components/MediaParallax'
import { RichText } from '@components/RichText'

import classes from './index.module.scss'

export type MediaContentProps = Extract<
  Page['layout'][0],
  { blockType: 'mediaContent' }
> & {
  padding: PaddingProps
  hideBackground?: boolean
}
export const MediaContentBlock: React.FC<MediaContentProps> = ({
  mediaContentFields,
  padding
}) => {
  const {
    link,
    images,
    richText,
    alignment,
    enableLink,
    mediaWidth,
    settings
  } = mediaContentFields

  return (
    <Gutter>
      <div className={['grid'].filter(Boolean).join(' ')}>
        {alignment === 'mediaContent' ? (
          // media-content
          <React.Fragment>
            <div
              className={[
                classes.media,
                mediaWidth !== 'fit' ? classes.stretchRight : '',
                'cols-10 cols-m-8 start-1'
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {images?.length && images.length > 0 ? (
                <MediaParallax media={images} />
              ) : null}
            </div>
            <div
              className={[classes.content, 'cols-4 start-13 start-m-1 cols-m-8']
                .filter(Boolean)
                .join(' ')}
            >
              <RichText content={richText} />
              {enableLink && link && (
                <div className={classes.button}>
                  <Button
                    {...link}
                    appearance={'default'}
                    labelStyle="mono"
                    hideHorizontalBorders
                    icon="arrow"
                    el="link"
                  />
                </div>
              )}
            </div>
          </React.Fragment>
        ) : (
          // content-media
          <React.Fragment>
            <div
              className={[classes.content, 'cols-4 start-1 cols-m-8']
                .filter(Boolean)
                .join(' ')}
            >
              <RichText content={richText} />
              {enableLink && link && (
                <div className={classes.button}>
                  <Button
                    {...link}
                    appearance={'default'}
                    hideHorizontalBorders
                    labelStyle="mono"
                    icon="arrow"
                    el="link"
                  />
                </div>
              )}
            </div>
            <div
              className={[
                classes.media,
                mediaWidth !== 'fit' ? classes.stretchLeft : '',
                'cols-10 start-7 cols-m-8 start-m-1'
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {images?.length && images.length > 0 ? (
                <MediaParallax media={images} />
              ) : null}
            </div>
          </React.Fragment>
        )}
      </div>
    </Gutter>
  )
}

export const MediaContent: React.FC<MediaContentProps> = (props) => {
  const { settings } = props.mediaContentFields

  return (
    <BlockWrapper
      padding={props.padding}
      settings={settings}
      hideBackground={props.hideBackground}
    >
      <BackgroundGrid zIndex={0} />
      <MediaContentBlock {...props} />
      <div className={classes.background} />
    </BlockWrapper>
  )
}
