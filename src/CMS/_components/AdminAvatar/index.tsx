import React from 'react'
import Image from 'next/image'

import type { Media, User } from '@payload-types'

import classes from './index.module.scss'

export interface AdminAvatarProps {
  user?: User | null
  size?: number
}

const AdminAvatar: React.FC<AdminAvatarProps> = ({ user, size = 30 }) => {
  const dynamicStyle: React.CSSProperties = {
    width: size,
    height: size,
    fontSize: `${size * 0.3}px`
  }

  if (!user?.email) {
    return (
      <div className={classes.avatar} style={dynamicStyle}>
        <span className={classes.avatar__text}>?</span>
      </div>
    )
  }

  const userPhoto = user.photo as Media
  const photoUrl = userPhoto?.url

  if (!photoUrl) {
    return (
      <div className={classes.avatar} style={dynamicStyle}>
        <span className={classes.avatar__text}>{user.email.charAt(0)}</span>
      </div>
    )
  }

  return (
    <div className={classes.avatar} style={dynamicStyle}>
      <Image
        src={photoUrl}
        alt={`${user.email}'s avatar`}
        fill
        className={classes.avatar__image}
      />
    </div>
  )
}

export default AdminAvatar
