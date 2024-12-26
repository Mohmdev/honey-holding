'use client'

import React, { useId } from 'react'
import Link from 'next/link'

import { useAuth } from '@providers/Auth'
import { useHeaderObserver } from '@providers/HeaderIntersectionObserver'
import { useThemePreference } from '@providers/Theme'
import { getImplicitPreference } from '@providers/Theme/shared'
import { Theme } from '@providers/Theme/types'

import { ThemeAutoIcon } from '@graphics/ThemeAutoIcon'
import { ThemeDarkIcon } from '@graphics/ThemeDarkIcon'
import { ThemeLightIcon } from '@graphics/ThemeLightIcon'
import { ChevronUpDownIcon } from '@icons/ChevronUpDownIcon'
import { Gutter } from '@components/Gutter'

import classes from './classes.module.scss'

// import { THEME_LOCAL_STORAGE_KEY } from '@constants/keys'

export const DashboardFooter = () => {
  const { user } = useAuth()

  const selectRef = React.useRef<HTMLSelectElement>(null)
  const themeId = useId()
  const { setTheme } = useThemePreference()
  const { setHeaderTheme } = useHeaderObserver()

  const onThemeChange = (themeToSet: Theme & 'auto') => {
    if (themeToSet === 'auto') {
      const implicitPreference = getImplicitPreference() ?? 'light'
      setHeaderTheme(implicitPreference)
      setTheme(implicitPreference)
      if (selectRef.current) selectRef.current.value = 'auto'
    } else {
      setTheme(themeToSet)
      setHeaderTheme(themeToSet)
    }
  }

  return (
    <Gutter className={classes.footerWrap}>
      <footer className={['grid', classes.footer].join(' ')}>
        <nav className={['cols-12 cols-m-6', classes.footerLinks].join(' ')}>
          <Link href={'/docs'}>Docs</Link>
          <Link href={'/Dashboard-terms'}>Terms</Link>
          <Link href={'/privacy'}>Privacy</Link>
          {user ? (
            <Link href={'/logout'}>Logout</Link>
          ) : (
            <Link href={'/login'}>Login</Link>
          )}
        </nav>
        <div className={[classes.selectContainer, 'cols-4 cols-m-2'].join(' ')}>
          <label className="visually-hidden" htmlFor={themeId}>
            Switch themes
          </label>
          {selectRef?.current && (
            <div className={`${classes.switcherIcon} ${classes.themeIcon}`}>
              {selectRef.current.value === 'auto' && <ThemeAutoIcon />}
              {selectRef.current.value === 'light' && <ThemeLightIcon />}
              {selectRef.current.value === 'dark' && <ThemeDarkIcon />}
            </div>
          )}

          <select
            id={themeId}
            onChange={(e) => onThemeChange(e.target.value as Theme & 'auto')}
            ref={selectRef}
          >
            <option value="auto">Auto</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>

          <ChevronUpDownIcon
            className={`${classes.switcherIcon} ${classes.upDownChevronIcon}`}
          />
        </div>
      </footer>
    </Gutter>
  )
}
