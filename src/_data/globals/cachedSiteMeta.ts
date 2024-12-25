import { getCachedGlobals } from '@utils/getGlobals'

const getCachedGlobalSettings = await getCachedGlobals('global-settings', {
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

// Now getCachedGlobalSettings is either:
// - A direct fetch result (GlobalSetting) in draft mode
// - A cached function (() => Promise<GlobalSetting>) in non-draft mode
export const getGlobalSettings = {
  siteName: async () => {
    const settings =
      typeof getCachedGlobalSettings === 'function'
        ? await getCachedGlobalSettings()
        : getCachedGlobalSettings
    return settings?.siteIdentity?.siteName || 'Nexweb'
  },
  siteDescription: async () => {
    const settings =
      typeof getCachedGlobalSettings === 'function'
        ? await getCachedGlobalSettings()
        : getCachedGlobalSettings
    return (
      settings?.siteIdentity?.siteDescription ||
      'Nexweb Content Management Systems'
    )
  },
  favicon: async () => {
    const settings =
      typeof getCachedGlobalSettings === 'function'
        ? await getCachedGlobalSettings()
        : getCachedGlobalSettings
    return settings?.branding?.favicon
  }
}

// export const getGlobalSettings = {
//   siteName: async () =>
//     (await getCachedGlobalSettings())?.siteIdentity?.siteName || 'Nexweb',
//   siteDescription: async () =>
//     (await getCachedGlobalSettings())?.siteIdentity?.siteDescription ||
//     'Nexweb Content Management Systems',
//   favicon: async () => (await getCachedGlobalSettings())?.branding?.favicon
// }
