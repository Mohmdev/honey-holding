'use client'

import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'

import { useThemePreference } from '@providers/Theme'
import { Theme } from '@providers/Theme/types'
import { toKebabCase } from '@utils/to-kebab-case'

import { BannerBlock } from '@blocks/BannerBlock/advanced'
import { BasicBannerBlock } from '@blocks/BannerBlock/basic'
import { BlogContent } from '@blocks/Blog/Content'
import { BlogMarkdown } from '@blocks/Blog/Markdown'
import { Callout } from '@blocks/Callout/config'
import { CallToAction } from '@blocks/CallToAction/config'
import { CardGrid } from '@blocks/CardGrid/config'
import { CodeBlock } from '@blocks/CodeBlock'
import { CodeFeature } from '@blocks/CodeFeature/config'
import { ContentBlock } from '@blocks/ContentBlock/advanced'
import { BasicContentBlock } from '@blocks/ContentBlock/basic'
import { ContentGrid } from '@blocks/ContentGrid/config'
import { FormBlock } from '@blocks/Form/FormBlock'
import { BasicFormBlock } from '@blocks/Form/FormBlockBasic'
import { getFieldsKeyFromBlock } from '@blocks/getFieldsKeyFromBlock'
import { HoverCards } from '@blocks/HoverCards'
import { HoverHighlights } from '@blocks/HoverHighlights'
import { LinkGrid } from '@blocks/LinkGrid'
import { LogoGrid } from '@blocks/LogoGrid'
import { MediaBlock } from '@blocks/MediaBlock'
import { MediaContent } from '@blocks/MediaContent'
import { MediaContentAccordion } from '@blocks/MediaContentAccordion'
import { PortfolioCards } from '@blocks/Portfolio/Cards'
import { PortfolioHighlightBlock } from '@blocks/Portfolio/Highlight'
import { PortfolioParallax } from '@blocks/Portfolio/Parallax'
import { Pricing } from '@blocks/Pricing'
import { RelatedPosts } from '@blocks/RelatedPosts'
import { ReusableContentBlock } from '@blocks/ReusableContent'
import { Slider } from '@blocks/Slider'
import { Statement } from '@blocks/Statement'
import { Steps } from '@blocks/Steps'
import { StickyHighlights } from '@blocks/StickyHighlights'

import type { RelatedPostsBlock } from '@blocks/RelatedPosts'
import { Page, ReusableContent } from '@payload-types'

import { PaddingProps, Settings } from '@components/BlockWrapper'

type ReusableContentBlockType = Extract<
  Page['layout'][0],
  { blockType: 'reusableContentBlock' }
>

const blockComponents = {
  basicContentBlock: BasicContentBlock,
  ContentBlock: ContentBlock,
  basicBannerBlock: BasicBannerBlock,
  bannerBlock: BannerBlock,
  blogContent: BlogContent,
  blogMarkdown: BlogMarkdown,
  portfolioHighlight: PortfolioHighlightBlock,
  portfolioCards: PortfolioCards,
  portfolioParallax: PortfolioParallax,
  mediaBlock: MediaBlock,
  callout: Callout,
  code: CodeBlock,
  content: ContentBlock,
  contentGrid: ContentGrid,
  form: FormBlock,
  basicForm: BasicFormBlock,
  slider: Slider,
  cardGrid: CardGrid,
  mediaContent: MediaContent,
  mediaContentAccordion: MediaContentAccordion,
  steps: Steps,
  stickyHighlights: StickyHighlights,
  hoverCards: HoverCards,
  hoverHighlights: HoverHighlights,
  codeFeature: CodeFeature,
  cta: CallToAction,
  linkGrid: LinkGrid,
  logoGrid: LogoGrid,
  reusableContentBlock: ReusableContentBlock,
  pricing: Pricing,
  relatedPosts: RelatedPosts,
  statement: Statement
}

export type BlocksProp =
  | ReusableContent['layout'][0]
  | ReusableContentBlockType
  | RelatedPostsBlock

type Props = {
  blocks: BlocksProp[]
  disableOuterSpacing?: true
  hero?: Page['hero']
  disableGutter?: boolean
  disableGrid?: boolean
  heroTheme?: Page['hero']['theme']
  layout?: 'page' | 'post'
  customId?: string | null
}

export const RenderBlocks: React.FC<Props> = (props) => {
  const {
    blocks,
    disableOuterSpacing,
    disableGutter,
    disableGrid,
    hero,
    layout,
    customId
  } = props
  const heroTheme = hero?.type === 'home' ? 'dark' : hero?.theme
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0
  const { theme: themeFromContext } = useThemePreference()
  const [themeState, setThemeState] = useState<Theme>()
  const [docPadding, setDocPadding] = React.useState(0)
  const docRef = React.useRef<HTMLDivElement>(null)

  // This is needed to avoid hydration errors when the theme is not yet available
  useEffect(() => {
    if (themeFromContext) setThemeState(themeFromContext)
  }, [themeFromContext])

  const paddingExceptions = useMemo(
    () => [
      'banner',
      'blogContent',
      'blogMarkdown',
      'code',
      'reusableContentBlock',
      'portfolioParallax'
    ],
    []
  )

  const getPaddingProps = useCallback(
    (block: (typeof blocks)[number], index: number) => {
      const isFirst = index === 0
      const isLast = index + 1 === blocks.length

      const theme = themeState

      let topPadding: PaddingProps['top']
      let bottomPadding: PaddingProps['bottom']

      const previousBlock = !isFirst ? blocks[index - 1] : null
      let previousBlockKey, previousBlockSettings

      const nextBlock =
        index + 1 < blocks.length
          ? blocks[Math.min(index + 1, blocks.length - 1)]
          : null
      let nextBlockKey, nextBlockSettings

      const currentBlockSettings: Settings =
        block[getFieldsKeyFromBlock(block)]?.settings
      let currentBlockTheme

      currentBlockTheme = currentBlockSettings?.theme ?? theme

      if (previousBlock) {
        previousBlockKey = getFieldsKeyFromBlock(previousBlock)
        previousBlockSettings = previousBlock[previousBlockKey]?.settings
      }

      if (nextBlock) {
        nextBlockKey = getFieldsKeyFromBlock(nextBlock)
        nextBlockSettings = nextBlock[nextBlockKey]?.settings
      }

      // If first block in the layout, add top padding based on the hero
      if (isFirst) {
        if (heroTheme) {
          topPadding = heroTheme === currentBlockTheme ? 'small' : 'large'
        } else {
          topPadding = theme === currentBlockTheme ? 'small' : 'large'
        }
      } else {
        if (previousBlockSettings?.theme) {
          topPadding =
            currentBlockTheme === previousBlockSettings?.theme
              ? 'small'
              : 'large'
        } else {
          topPadding = theme === currentBlockTheme ? 'small' : 'large'
        }
      }

      if (nextBlockSettings?.theme) {
        bottomPadding =
          currentBlockTheme === nextBlockSettings?.theme ? 'small' : 'large'
      } else {
        bottomPadding = theme === currentBlockTheme ? 'small' : 'large'
      }

      if (isLast) bottomPadding = 'large'

      if (paddingExceptions.includes(block.blockType)) bottomPadding = 'large'

      if (previousBlock?.blockType === 'hoverHighlights') topPadding = 'large'

      if (nextBlock?.blockType === 'hoverHighlights') bottomPadding = 'large'

      return {
        top: topPadding ?? undefined,
        bottom: bottomPadding ?? undefined
      }
    },
    [themeState, heroTheme, blocks, paddingExceptions]
  )

  React.useEffect(() => {
    if (docRef.current?.offsetWidth === undefined) return
    setDocPadding(
      layout === 'post' ? Math.round(docRef.current?.offsetWidth / 8) - 2 : 0
    )
  }, [docRef.current?.offsetWidth, layout])

  const marginAdjustment = {
    marginLeft: `${docPadding / -1}px`,
    marginRight: `${docPadding / -1}px`,
    paddingLeft: docPadding,
    paddingRight: docPadding
  }

  const hideBackground = hero?.type === 'three'

  if (hasBlocks) {
    return (
      <Fragment>
        <div ref={docRef} id={customId ?? undefined}>
          {blocks.map((block, index) => {
            const { blockName, blockType } = block

            if (blockType && blockType in blockComponents) {
              const Block = blockComponents[blockType]

              if (Block) {
                return (
                  <Block
                    key={index}
                    id={toKebabCase(blockName)}
                    {...block}
                    hideBackground={hideBackground}
                    padding={getPaddingProps(block, index)}
                    marginAdjustment={{
                      ...marginAdjustment,
                      ...(blockType === 'banner'
                        ? { paddingLeft: 32, paddingRight: 32 }
                        : {})
                    }}
                    disableGutter={disableGutter}
                    disableGrid={disableGrid}
                  />
                )
              }
            }
            return null
          })}
        </div>
      </Fragment>
    )
  }

  return null
}
