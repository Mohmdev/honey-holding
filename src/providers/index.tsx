'use client'

import React from 'react'

import { GridProvider } from '@faceless-ui/css-grid'
import { ModalContainer, ModalProvider } from '@faceless-ui/modal'
import { MouseInfoProvider } from '@faceless-ui/mouse-info'
import { ScrollInfoProvider } from '@faceless-ui/scroll-info'
// import { ClockIcon } from '@graphics/ClockIcon'
// import { InfoIcon } from '@graphics/InfoIcon'
// import { CheckIcon } from '@icons/CheckIcon/index.js'
// import { CloseIcon } from '@icons/CloseIcon/index.js'
import { Slide } from '@faceless-ui/slider'
import { WindowInfoProvider } from '@faceless-ui/window-info'
import { CookiesProvider } from 'react-cookie'

// import { ErrorIcon } from '@icons/ErrorIcon'
import { HeaderIntersectionObserver } from '@providers/HeaderIntersectionObserver'

// import { AuthProvider } from './Auth/index.js'
import { ComputedCSSValuesProvider } from './ComputedCSSValues/index.js'
import { PageTransition } from './PageTransition/index.js'
import { ThemePreferenceProvider } from './Theme/index.js'
import { ToastContainer } from './ToastContainer/index.js'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <CookiesProvider>
      {/* <AuthProvider> */}
      <ScrollInfoProvider>
        <MouseInfoProvider>
          <WindowInfoProvider
            breakpoints={{
              l: '(max-width: 1600px)',
              m: '(max-width: 1100px)',
              s: '(max-width: 768px)'
            }}
          >
            <ThemePreferenceProvider>
              <GridProvider
                breakpoints={{
                  l: 1680,
                  m: 1024,
                  s: 768
                }}
                colGap={{
                  l: '2rem',
                  m: '2rem',
                  s: '1rem',
                  xl: '3rem'
                }}
                cols={{
                  l: 12,
                  m: 8,
                  s: 8,
                  xl: 12
                }}
                rowGap={{
                  l: '2rem',
                  m: '1rem',
                  s: '1rem',
                  xl: '4rem'
                }}
              >
                <ComputedCSSValuesProvider>
                  <ModalProvider transTime={0} zIndex="var(--z-modal)">
                    <PageTransition>
                      <HeaderIntersectionObserver>
                        {children}
                        <ModalContainer />
                        <ToastContainer />
                      </HeaderIntersectionObserver>
                    </PageTransition>
                  </ModalProvider>
                </ComputedCSSValuesProvider>
              </GridProvider>
            </ThemePreferenceProvider>
          </WindowInfoProvider>
        </MouseInfoProvider>
      </ScrollInfoProvider>
      {/* </AuthProvider> */}
    </CookiesProvider>
  )
}
