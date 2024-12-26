'use client'

import React, { useId } from 'react'
import { usePathname } from 'next/navigation'

import { useHeaderObserver } from '@providers/HeaderIntersectionObserver'
import { useThemePreference } from '@providers/Theme'
import { getImplicitPreference } from '@providers/Theme/shared'
import { Theme } from '@providers/Theme/types'
import { THEME_LOCAL_STORAGE_KEY } from '@lib/constants/keys'

import { Footer as FooterType } from '@payload-types'

import { DiscordIcon } from '@graphics/DiscordIcon'
import { InstagramIcon } from '@graphics/InstagramIcon'
import { ThemeAutoIcon } from '@graphics/ThemeAutoIcon'
import { ThemeDarkIcon } from '@graphics/ThemeDarkIcon'
import { ThemeLightIcon } from '@graphics/ThemeLightIcon'
import { TwitterIconAlt } from '@graphics/TwitterIconAlt'
import { YoutubeIcon } from '@graphics/YoutubeIcon'
import { ChevronUpDownIcon } from '@icons/ChevronUpDownIcon'
import { BackgroundGrid } from '@components/Background/Grid'
import { CMSLink } from '@components/CMSLink'
import { Gutter } from '@components/Gutter'
import { NewsletterSignUp } from '@components/NewsletterSignUp'
import Payload3D from '@components/Payload3D'

import classes from './index.module.scss'

export const Footer: React.FC<FooterType> = (props) => {
  const { columns } = props
  const [products, developers, company] = columns ?? []
  const { setTheme } = useThemePreference()
  const { setHeaderTheme } = useHeaderObserver()
  const wrapperRef = React.useRef<HTMLElement>(null)
  const selectRef = React.useRef<HTMLSelectElement>(null)

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

  React.useEffect(() => {
    const preference = window.localStorage.getItem(THEME_LOCAL_STORAGE_KEY)
    if (selectRef.current) {
      selectRef.current.value = preference ?? 'auto'
    }
  }, [])

  const pathname = usePathname()

  // TODO
  const allowedSegments = [
    'cloud',
    'cloud-terms',
    'forgot-password',
    'join-team',
    'login',
    'logout',
    'new',
    'reset-password',
    'verify',
    'signup'
  ]

  const pathnameSegments = pathname.split('/').filter(Boolean)
  const isCloudPage = pathnameSegments.some((segment) =>
    allowedSegments.includes(segment)
  )

  const themeId = useId()

  return (
    <footer ref={wrapperRef} className={classes.footer} data-theme="dark">
      <BackgroundGrid
        zIndex={2}
        className={[classes.background, isCloudPage ? classes.topBorder : '']
          .filter(Boolean)
          .join(' ')}
      />
      <Gutter className={classes.container}>
        <div className={[classes.grid, 'grid'].filter(Boolean).join(' ')}>
          <div
            className={['cols-4 cols-m-8 cols-s-8'].filter(Boolean).join(' ')}
          >
            <p className={classes.colHeader}>{products?.label}</p>
            <div className={classes.colItems}>
              {products?.navItems?.map(({ link }, index) => {
                return (
                  <React.Fragment key={index}>
                    <CMSLink className={classes.link} {...link} />
                  </React.Fragment>
                )
              })}
            </div>
          </div>

          <div
            className={['cols-4 cols-m-8 cols-s-8'].filter(Boolean).join(' ')}
          >
            <p className={classes.colHeader}>{developers?.label}</p>
            <div className={classes.colItems}>
              {developers?.navItems?.map(({ link }, index) => {
                return (
                  <React.Fragment key={index}>
                    <CMSLink className={classes.link} {...link} />
                  </React.Fragment>
                )
              })}
            </div>
          </div>

          <div
            className={['cols-4 cols-m-8 cols-s-8'].filter(Boolean).join(' ')}
          >
            <p className={classes.colHeader}>{company?.label}</p>
            <div className={classes.colItems}>
              {company?.navItems?.map(({ link }, index) => {
                return (
                  <React.Fragment key={index}>
                    <CMSLink className={classes.link} {...link} />
                  </React.Fragment>
                )
              })}
            </div>
          </div>

          <div
            className={['cols-4 cols-m-4 cols-s-8'].filter(Boolean).join(' ')}
          >
            <p className={`${classes.colHeader} ${classes.thirdColumn}`}>
              Stay connected
            </p>
            <NewsletterSignUp />

            <div className={classes.socialLinks}>
              <a
                href="https://twitter.com/payloadcms"
                target="_blank"
                rel="noopener noreferrer"
                className={`${classes.socialIconLink} ${classes.twitterIcon}`}
                aria-label="Payload's Twitter page"
              >
                <TwitterIconAlt />
              </a>
              <a
                href="https://discord.com/invite/r6sCXqVk3v"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.socialIconLink}
                aria-label="Payload's Discord"
              >
                <DiscordIcon />
              </a>
              <a
                href="https://www.youtube.com/channel/UCyrx4Wpd4SBIpqUKlkb6N1Q"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.socialIconLink}
                aria-label="Payload's YouTube channel"
              >
                <YoutubeIcon />
              </a>
              <a
                href="https://www.instagram.com/payloadcms/"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.socialIconLink}
                aria-label="Payload's Instagram page"
              >
                <InstagramIcon />
              </a>
            </div>

            <div className={classes.selectContainer}>
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
                onChange={(e) =>
                  onThemeChange(e.target.value as Theme & 'auto')
                }
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
          </div>
        </div>
      </Gutter>
      <Gutter className={classes.payload3dContainer}>
        <Payload3D />
      </Gutter>
    </footer>
  )
}
