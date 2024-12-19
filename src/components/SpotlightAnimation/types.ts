import React from 'react'

export type AllowedElements = Extract<
  keyof React.JSX.IntrinsicElements,
  'p' | 'span' | 'h1' | 'h2' | 'h3'
>
