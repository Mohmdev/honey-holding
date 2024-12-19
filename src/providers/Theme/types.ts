export type Theme = 'light' | 'dark'

export interface ThemePreferenceContextType {
  theme?: Theme | null
  setTheme: (theme: Theme | null) => void
}

export function themeIsValid(string: string | null): string is Theme {
  return string ? ['light', 'dark'].includes(string) : false
}
