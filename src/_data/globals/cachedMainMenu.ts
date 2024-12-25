import { getCachedGlobals } from '@utils/getGlobals'

import type { MainMenu } from '@payload-types'

const getCachedMainMenu = await getCachedGlobals('main-menu', {
  depth: 1
})

export const getMainMenu = {
  all: async () => {
    const menu =
      typeof getCachedMainMenu === 'function'
        ? await getCachedMainMenu()
        : getCachedMainMenu
    return menu as MainMenu
  }
}
