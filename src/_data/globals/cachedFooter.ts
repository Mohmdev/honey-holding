import { getCachedGlobals } from '@utils/getGlobals'

import type { Footer } from '@payload-types'

const getCachedFooter = getCachedGlobals('footer', {
  depth: 1
})

export const getFooter = {
  all: async () => (await getCachedFooter()) as Footer
}
