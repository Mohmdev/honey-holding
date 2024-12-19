import * as React from 'react'

import { BannerBlock, ReusableContent } from '@payload-types'

import { CheckIcon } from '@icons/CheckIcon'
import { RichText } from '@components/RichText'

import classes from './index.module.scss'

export type Props = {
  type?: Extract<
    ReusableContent['layout'][0],
    { blockType: 'banner' }
  >['bannerFields']['type']
  content?:
    | Extract<
        ReusableContent['layout'][0],
        { blockType: 'banner' }
      >['bannerFields']['content']
    | BannerBlock['content']
  children?: React.ReactNode
  checkmark?: boolean
  icon?: 'checkmark'
  margin?: boolean
  marginAdjustment?: any
}

const Icons = {
  checkmark: CheckIcon
}

export const Banner: React.FC<Props> = ({
  content,
  children,
  icon,
  type = 'default',
  checkmark,
  margin = true,
  marginAdjustment = {}
}) => {
  let Icon = icon && Icons[icon]
  if (!Icon && checkmark) Icon = Icons.checkmark

  return (
    <div
      className={[
        classes.banner,
        'banner',
        type && classes[type],
        !margin && classes.noMargin
      ]
        .filter(Boolean)
        .join(' ')}
      style={marginAdjustment}
    >
      {Icon && <Icon className={classes.icon} />}

      {content && <RichText content={content} />}
      {children && <div className={classes.children}>{children}</div>}
    </div>
  )
}
