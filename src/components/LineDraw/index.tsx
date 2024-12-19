'use client'

import React from 'react'

import classes from './index.module.scss'

export const LineDraw: React.FC<{
  className?: string
  active?: boolean | null
  align?: 'top' | 'bottom'
  disabled?: boolean | null
}> = ({ className, active: isHovered, align = 'top', disabled }) => {
  return (
    <div
      className={[
        classes.lineDraw,
        className,
        !disabled && isHovered && classes.isHovered,
        align && classes[align]
      ]
        .filter(Boolean)
        .join(' ')}
    />
  )
}
