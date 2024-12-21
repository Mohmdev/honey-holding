'use client'

import { BlocksProp } from '@blocks/RenderBlocks'

import { Page } from '@payload-types'

import BackgroundGradient from '@components/Background/Gradient'
import { BackgroundGrid } from '@components/Background/Grid'
import { BlockWrapper } from '@components/BlockWrapper'
import { CMSLink } from '@components/CMSLink'
import CreatePayloadApp from '@components/CreatePayloadApp'
import { Gutter } from '@components/Gutter'
import { MediaStack } from '@components/MediaStack'
import { NewsletterSignUp } from '@components/NewsletterSignUp'
import { RichText } from '@components/RichText'

import classes from './index.module.scss'

export const ThreeHero: React.FC<
  Pick<
    Page['hero'],
    | 'richText'
    | 'images'
    | 'buttons'
    | 'description'
    | 'theme'
    | 'enableAnnouncement'
    | 'announcementLink'
    | 'threeCTA'
    | 'newsletter'
  > & {
    firstContentBlock?: BlocksProp
  }
> = ({
  richText,
  threeCTA,
  newsletter,
  buttons,
  theme,
  images,
  enableAnnouncement,
  announcementLink
}) => {
  return (
    <>
      <BlockWrapper
        settings={{ theme }}
        className={classes.blockWrapper}
        padding={{ top: 'small', bottom: 'large' }}
      >
        <BackgroundGrid zIndex={1} />
        <Gutter>
          <div className={[classes.wrapper, 'grid'].filter(Boolean).join(' ')}>
            <div
              className={[classes.sidebar, 'cols-4 cols-m-8 start-1']
                .filter(Boolean)
                .join(' ')}
            >
              {enableAnnouncement && (
                <div className={classes.announcementLink}>
                  <CMSLink {...announcementLink} />
                </div>
              )}
              <RichText
                content={richText}
                className={[classes.richText].filter(Boolean).join(' ')}
              />
              {threeCTA === 'buttons' &&
                buttons &&
                Array.isArray(buttons) &&
                buttons.length > 0 && (
                  <div className={classes.linksWrapper}>
                    {Array.isArray(buttons) &&
                      buttons.map((button, i) => {
                        if (button.blockType === 'command') {
                          return (
                            <CreatePayloadApp
                              key={i + button.command}
                              label={button.command}
                              background={false}
                              className={classes.createPayloadApp}
                            />
                          )
                        }
                        if (button.blockType === 'link' && button.link) {
                          return (
                            <CMSLink
                              key={i + button.link.label}
                              {...button.link}
                              className={classes.link}
                              appearance="default"
                              buttonProps={{
                                hideBorders: true
                              }}
                            />
                          )
                        }
                      })}
                  </div>
                )}
              {threeCTA === 'newsletter' && (
                <NewsletterSignUp
                  placeholder={newsletter?.placeholder ?? undefined}
                  description={newsletter?.description ?? undefined}
                />
              )}
            </div>
            <div
              className={[classes.graphicWrapper, 'cols-8 start-8'].join(' ')}
            >
              {/* <BigThree /> */}
              {images && Array.isArray(images) && images.length > 0 && (
                <MediaStack media={images} />
              )}
            </div>
          </div>
        </Gutter>
      </BlockWrapper>
      <BackgroundGradient className={classes.backgroundGradient} />
    </>
  )
}
