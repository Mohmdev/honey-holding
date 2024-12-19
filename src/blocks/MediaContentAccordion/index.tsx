import React from 'react'

import { Page } from '@payload-types'

import { BackgroundGrid } from '@components/Background/Grid'
import { BlockWrapper, PaddingProps } from '@components/BlockWrapper'
import { Gutter } from '@components/Gutter'

import { DesktopMediaContentAccordion } from './Desktop'
import classes from './index.module.scss'
import { MobileMediaContentAccordion } from './Mobile'

export type MediaContentAccordionProps = Extract<
  Page['layout'][0],
  { blockType: 'mediaContentAccordion' }
> & {
  padding: PaddingProps
  hideBackground?: boolean
}

export const MediaContentAccordion: React.FC<MediaContentAccordionProps> = ({
  mediaContentAccordionFields,
  padding,
  hideBackground
}) => {
  const { settings } = mediaContentAccordionFields || {}

  return (
    <BlockWrapper
      settings={settings}
      padding={padding}
      hideBackground={hideBackground}
      className={[classes.mediaContentAccordion].filter(Boolean).join(' ')}
    >
      <Gutter>
        <BackgroundGrid zIndex={0} />
        <DesktopMediaContentAccordion
          className={classes.desktop}
          blockType="mediaContentAccordion"
          mediaContentAccordionFields={mediaContentAccordionFields}
        />
        <MobileMediaContentAccordion
          className={classes.mobile}
          blockType="mediaContentAccordion"
          mediaContentAccordionFields={mediaContentAccordionFields}
        />
      </Gutter>
    </BlockWrapper>
  )
}
