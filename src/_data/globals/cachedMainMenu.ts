import { getCachedGlobals } from '@utils/getGlobals'

import type { MainMenu } from '@payload-types'

const getCachedMainMenu = getCachedGlobals('main-menu', {
  depth: 1
})

export const getMainMenu = {
  all: async () => (await getCachedMainMenu()) as MainMenu
}
