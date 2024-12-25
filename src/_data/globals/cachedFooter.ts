import { getCachedGlobals } from '@utils/getGlobals'

import type { Footer } from '@payload-types'

const getCachedFooter = await getCachedGlobals('footer', {
  depth: 1
})

export const getFooter = {
  all: async () => {
    const footer =
      typeof getCachedFooter === 'function'
        ? await getCachedFooter()
        : getCachedFooter
    return footer as Footer
  }
}
