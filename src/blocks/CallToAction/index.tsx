'use client'

import React from 'react'

import { Page } from '@payload-types'

import { ArrowRightIcon } from '@icons/ArrowRightIcon'
import { CrosshairIcon } from '@icons/CrosshairIcon'
import BackgroundGradient from '@components/Background/Gradient'
import { BackgroundGrid } from '@components/Background/Grid'
import { BackgroundScanline } from '@components/Background/Scanline'
import { BlockWrapper, PaddingProps } from '@components/BlockWrapper'
import { CMSLink } from '@components/CMSLink'
import { CommandLine } from '@components/CommandLine'
import CreatePayloadApp from '@components/CreatePayloadApp'
import { Gutter } from '@components/Gutter'
import { Media } from '@components/Media'
import { RichText } from '@components/RichText'

import classes from './index.module.scss'

export type CallToActionProps = Extract<
  Page['layout'][0],
  { blockType: 'cta' }
> & {
  padding?: PaddingProps
  hideBackground?: boolean
}

export const CallToAction: React.FC<CallToActionProps> = (props) => {
  const {
    ctaFields: {
      richText,
      commandLine,
      links,
      style = 'buttons',
      gradientBackground,
      bannerImage,
      bannerLink,
      settings
    },
    padding,
    hideBackground
  } = props

  const hasLinks = links && links.length > 0

  return (
    <BlockWrapper
      settings={settings}
      padding={style === 'banner' ? { top: 'large', bottom: 'large' } : padding}
      hideBackground={hideBackground}
    >
      <BackgroundGrid zIndex={0} />
      <Gutter className={classes.callToAction}>
        {style === 'buttons' && (
          <div className={[classes.wrapper].filter(Boolean).join(' ')}>
            <div
              className={[classes.container, 'grid'].filter(Boolean).join(' ')}
            >
              <div
                className={[classes.contentWrapper, 'cols-6 cols-m-8']
                  .filter(Boolean)
                  .join(' ')}
              >
                <RichText content={richText} className={classes.content} />
                {commandLine && <CommandLine command={commandLine} />}
              </div>
              <div
                className={[
                  classes.linksContainer,
                  'cols-8 start-9 cols-m-8 start-m-1 grid'
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <BackgroundScanline
                  className={[
                    classes.scanline,
                    'cols-16 start-5 cols-m-8 start-m-1'
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  crosshairs={['top-left', 'bottom-left']}
                />

                <CrosshairIcon
                  className={[classes.crosshairTopLeft]
                    .filter(Boolean)
                    .join(' ')}
                />
                <CrosshairIcon
                  className={[classes.crosshairBottomRight]
                    .filter(Boolean)
                    .join(' ')}
                />

                {hasLinks && (
                  <div
                    className={[classes.links, 'cols-16 cols-m-8']
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {links.map(({ link, type: ctaType, npmCta }, index) => {
                      const type = ctaType ?? 'link'

                      if (type === 'npmCta') {
                        return (
                          <CreatePayloadApp
                            key={index}
                            style="cta"
                            label={npmCta?.label}
                            className={classes.npmCta}
                            background={false}
                          />
                        )
                      }

                      return (
                        <CMSLink
                          {...link}
                          key={index}
                          appearance={'default'}
                          buttonProps={{
                            appearance: 'default',
                            size: 'large',
                            hideHorizontalBorders: true,
                            hideBottomBorderExceptLast: true,
                            forceBackground: true
                          }}
                          className={[classes.button].filter(Boolean).join(' ')}
                        />
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {style === 'banner' && (
          <CMSLink
            {...bannerLink}
            label={null}
            className={[classes.bannerWrapper, 'grid']
              .filter(Boolean)
              .join(' ')}
          >
            <div
              className={[classes.bannerContent, 'cols-8']
                .filter(Boolean)
                .join(' ')}
            >
              <RichText content={richText} />
              <span className={classes.bannerLink}>
                {bannerLink?.label}
                <ArrowRightIcon />
              </span>
            </div>
            {bannerImage && typeof bannerImage !== 'string' && (
              <div
                className={[classes.bannerImage, 'cols-8']
                  .filter(Boolean)
                  .join(' ')}
              >
                <Media resource={bannerImage} />
              </div>
            )}
            {gradientBackground ? (
              <BackgroundGradient className={classes.bannerGradient} />
            ) : (
              <BackgroundScanline className={classes.bannerScanline} />
            )}
          </CMSLink>
        )}
      </Gutter>
    </BlockWrapper>
  )
}
