'use client'

import { BlocksProp } from '@blocks/RenderBlocks'

import { Page } from '@payload-types'

import BackgroundGradient from '@components/Background/Gradient'
import { BackgroundGrid } from '@components/Background/Grid'
import { BlockWrapper } from '@components/BlockWrapper'
import { ChangeHeaderTheme } from '@components/ChangeHeaderTheme'
import { CMSLink } from '@components/CMSLink'
import { CommandLine } from '@components/CommandLine'
import { Gutter } from '@components/Gutter'
import { LogoShowcase } from '@components/Hero/HomeNew/LogoShowcase'
import { MediaStack } from '@components/MediaStack'
import { RichText } from '@components/RichText'

import classes from './index.module.scss'

export const HomeNewHero: React.FC<
  Page['hero'] & {
    firstContentBlock?: BlocksProp
  }
> = ({
  enableAnnouncement,
  announcementLink,
  richText,
  description,
  primaryButtons,
  secondaryHeading,
  secondaryButtons,
  featureVideo,
  images,
  logoShowcaseLabel,
  logoShowcase
}) => {
  const filteredLogos = logoShowcase?.filter((logo) => typeof logo !== 'string')

  return (
    <ChangeHeaderTheme theme="dark">
      <BlockWrapper
        settings={{ theme: 'dark' }}
        padding={{ top: 'small', bottom: 'small' }}
        className={classes.heroWrapper}
      >
        <Gutter className={[classes.heroContentWrapper, 'grid'].join(' ')}>
          <div
            className={['cols-4 cols-m-8', classes.heroContent]
              .filter(Boolean)
              .join(' ')}
          >
            {enableAnnouncement && (
              <div className={classes.announcementLink}>
                <CMSLink {...announcementLink} />
              </div>
            )}
            <RichText content={richText} className={classes.heroText} />
            {Array.isArray(primaryButtons) && (
              <ul className={classes.primaryButtons}>
                {primaryButtons.map((button, i) => {
                  if (button.type === 'link') {
                    return (
                      <li key={i}>
                        <CMSLink
                          {...button.link}
                          appearance="default"
                          fullWidth
                          buttonProps={{
                            icon: 'arrow',
                            hideHorizontalBorders: true
                          }}
                        />
                      </li>
                    )
                  } else if (button.type === 'npmCta' && button.npmCta?.label) {
                    return (
                      <li key={i} className={classes.command}>
                        <CommandLine
                          command={button.npmCta?.label}
                          inLinkGroup
                        />
                      </li>
                    )
                  }
                })}
              </ul>
            )}
          </div>
          <div
            className={[
              classes.graphicWrapper,
              'cols-8 start-8 start-m-1'
            ].join(' ')}
          >
            {images && Array.isArray(images) && images.length > 0 && (
              <MediaStack media={images} />
            )}
          </div>
        </Gutter>
        <Gutter className={[classes.logoShowcaseWrapper, 'grid'].join(' ')}>
          {logoShowcaseLabel && <RichText content={logoShowcaseLabel} />}
          {filteredLogos && <LogoShowcase logos={filteredLogos} />}
        </Gutter>
        <BackgroundGrid
          zIndex={-2}
          gridLineStyles={[
            {
              background:
                'linear-gradient(to bottom, transparent 80px, var(--theme-border-color) 240px)'
            },
            {
              background:
                'linear-gradient(to bottom, transparent 160px, var(--theme-border-color) 240px)'
            },
            {
              background:
                'linear-gradient(to bottom, transparent 200px, var(--theme-border-color) 240px)'
            },
            {
              background:
                'linear-gradient(to bottom, transparent 160px, var(--theme-border-color) 240px)'
            },
            {
              background:
                'linear-gradient(to bottom, transparent 80px, var(--theme-border-color) 240px)'
            }
          ]}
        />
      </BlockWrapper>
      <BackgroundGradient className={classes.backgroundGradient} />
    </ChangeHeaderTheme>
  )
}
