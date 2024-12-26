'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

import { THEME_LOCAL_STORAGE_KEY } from '@lib/constants/keys'
import canUseDom from '@utils/canUseDOM'

import { defaultTheme, getImplicitPreference } from './shared'
import { Theme, themeIsValid, ThemePreferenceContextType } from './types'

const initialContext: ThemePreferenceContextType = {
  theme: undefined,
  setTheme: () => null
}

const ThemePreferenceContext = createContext(initialContext)

export const ThemePreferenceProvider: React.FC<{
  children?: React.ReactNode
}> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme | undefined>(
    canUseDom
      ? (document.documentElement.getAttribute('data-theme') as Theme)
      : undefined
  )

  const setTheme = useCallback((themeToSet: Theme | null) => {
    if (themeToSet === null) {
      window.localStorage.removeItem(THEME_LOCAL_STORAGE_KEY)
      const implicitPreference = getImplicitPreference()
      document.documentElement.setAttribute(
        'data-theme',
        implicitPreference || ''
      )
      if (implicitPreference) setThemeState(implicitPreference)
    } else {
      setThemeState(themeToSet)
      window.localStorage.setItem(THEME_LOCAL_STORAGE_KEY, themeToSet)
      document.documentElement.setAttribute('data-theme', themeToSet)
    }
  }, [])

  useEffect(() => {
    let themeToSet: Theme = defaultTheme
    const preference = window.localStorage.getItem(THEME_LOCAL_STORAGE_KEY)

    if (themeIsValid(preference)) {
      themeToSet = preference
    } else {
      const implicitPreference = getImplicitPreference()

      if (implicitPreference) {
        themeToSet = implicitPreference
      }
    }

    document.documentElement.setAttribute('data-theme', themeToSet)
    setThemeState(themeToSet)
  }, [])

  return (
    <ThemePreferenceContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemePreferenceContext.Provider>
  )
}

export const useThemePreference = (): ThemePreferenceContextType =>
  useContext(ThemePreferenceContext)
