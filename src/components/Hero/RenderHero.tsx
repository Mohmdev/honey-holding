import React from 'react'

import { BlocksProp } from '@blocks/RenderBlocks'

import { Page } from '@payload-types'

import BreadcrumbsBar from '@components/Hero/BreadcrumbsBar'

import { CenteredContent } from './CenteredContent'
import { ContentMediaHero } from './ContentMedia'
import { DefaultHero } from './Default'
import { FormHero } from './FormHero'
import { GradientHero } from './Gradient'
import { HomeHero } from './Home'
import { HomeNewHero } from './HomeNew'
import { LivestreamHero } from './Livestream'
import { ThreeHero } from './Three'

const heroes = {
  default: DefaultHero,
  contentMedia: ContentMediaHero,
  home: HomeHero,
  homeNew: HomeNewHero,
  form: FormHero,
  livestream: LivestreamHero,
  centeredContent: CenteredContent,
  gradient: GradientHero,
  three: ThreeHero
}

export const RenderHero: React.FC<{
  page: Page
  firstContentBlock?: BlocksProp
}> = (props) => {
  const {
    page: {
      hero,
      breadcrumbs,
      hero: { type }
    },
    firstContentBlock
  } = props

  const HeroToRender = heroes[type] as any

  if (HeroToRender) {
    return (
      <>
        <BreadcrumbsBar hero={hero} breadcrumbs={breadcrumbs} />

        <HeroToRender
          {...hero}
          firstContentBlock={firstContentBlock}
          breadcrumbs={breadcrumbs}
        />
      </>
    )
  }

  return null
}
