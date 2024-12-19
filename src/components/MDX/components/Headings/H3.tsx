'use client'

import React, { useEffect } from 'react'

import slugify from '@utils/slugify'

import { JumplistNode } from '@components/Jumplist'

import { useMDX } from '../../context'
import { formatAnchor } from './formatAnchor'

const H3: (props: { children }) => React.JSX.Element = ({ children }) => {
  const anchor = slugify(formatAnchor(children))
  const { addHeading } = useMDX()

  useEffect(() => {
    addHeading(anchor, children, 'tertiary')
  }, [addHeading, anchor, children])

  return (
    <JumplistNode id={anchor} type="h3">
      {typeof children === 'string' ? children.split('#')[0] : children}
    </JumplistNode>
  )
}

export default H3
