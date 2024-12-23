import { Roboto_Mono } from 'next/font/google'
import localFont from 'next/font/local'

// TODO: Fix the ESM/TS issue with the `localFont` import
export const untitledSans = localFont({
  src: [
    {
      path: './UntitledSans-Light.woff2',
      style: 'normal',
      weight: '300'
    },
    {
      path: './UntitledSans-LightItalic.woff2',
      style: 'italic',
      weight: '300'
    },
    {
      path: './UntitledSans-Regular.woff2',
      style: 'normal',
      weight: '400'
    },
    {
      path: './UntitledSans-RegularItalic.woff2',
      style: 'italic',
      weight: '400'
    },
    {
      path: './UntitledSans-Medium.woff2',
      style: 'normal',
      weight: '500'
    },
    {
      path: './UntitledSans-MediumItalic.woff2',
      style: 'italic',
      weight: '500'
    },
    {
      path: './UntitledSans-Bold.woff2',
      style: 'normal',
      weight: '700'
    },
    {
      path: './UntitledSans-BoldItalic.woff2',
      style: 'italic',
      weight: '700'
    },
    {
      path: './UntitledSans-Black.woff2',
      style: 'normal',
      weight: '800'
    },
    {
      path: './UntitledSans-BlackItalic.woff2',
      style: 'italic',
      weight: '800'
    }
  ],
  variable: '--font-body'
})
