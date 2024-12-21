import { useEffect, useMemo, useState } from 'react'

import { useThemePreference } from '@providers/Theme'

import { getFieldsKeyFromBlock } from '@blocks/getFieldsKeyFromBlock'

import type { BlocksProp } from '@blocks/RenderBlocks'
import type { PaddingProps, Settings } from '@components/BlockWrapper'
import type { Page } from '@payload-types'
import type { Theme } from '@providers/Theme/types'

export const useGetHeroPadding = (
  theme: Page['hero']['theme'],
  block?: BlocksProp
): PaddingProps => {
  const { theme: themeFromContext } = useThemePreference()
  const [themeState, setThemeState] = useState<Theme>()

  useEffect(() => {
    if (themeFromContext) setThemeState(themeFromContext)
  }, [themeFromContext])

  const padding = useMemo((): PaddingProps => {
    const topPadding: PaddingProps['top'] = 'hero'
    let bottomPadding: PaddingProps['bottom'] = 'large'

    if (!block) return { top: topPadding, bottom: bottomPadding }

    const blockKey = getFieldsKeyFromBlock(block)
    const blockSettings: Settings = block[blockKey]?.settings

    if (theme) {
      // Compare with the block value otherwise compare with theme context
      if (blockSettings) {
        bottomPadding = theme === blockSettings?.theme ? 'small' : 'large'
      } else {
        bottomPadding = theme === themeState ? 'small' : 'large'
      }
    } else {
      if (blockSettings) {
        bottomPadding = themeState === blockSettings?.theme ? 'small' : 'large'
      }
    }

    return {
      top: topPadding,
      bottom: bottomPadding
    }
  }, [themeState, theme, block])

  return padding
}
