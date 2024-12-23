import { getCachedGlobals } from '@utils/getGlobals'

const getCachedGlobalSettings = getCachedGlobals('global-settings', {
  depth: 1,
  select: {
    branding: { favicon: true },
    siteIdentity: {
      siteName: true,
      siteDescription: true
    }
    // globalSeo: {
    //   keywords: true,
    //   ogImage: true
    // }
  }
})

export const getGlobalSettings = {
  siteName: async () =>
    (await getCachedGlobalSettings())?.siteIdentity?.siteName || 'Nexweb',
  siteDescription: async () =>
    (await getCachedGlobalSettings())?.siteIdentity?.siteDescription ||
    'Nexweb Content Management Systems',
  favicon: async () => (await getCachedGlobalSettings())?.branding?.favicon
}
