import * as React from 'react'
import Link from 'next/link'

import { formatDate } from '@utils/format-date-time'

import { Post } from '@payload-types'

import { CrosshairIcon } from '@icons/CrosshairIcon'
import { BackgroundScanline } from '@components/Background/Scanline'
import { Media } from '@components/Media'

import classes from './index.module.scss'

export const FeaturedBlogPost: React.FC<Partial<Post>> = (props) => {
  const {
    slug,
    title,
    authors,
    publishedOn,
    image: media,
    meta,
    ...rest
  } = props

  const href = `/blog/${slug}`

  const author = authors?.[0]
    ? typeof authors?.[0] === 'string'
      ? authors[0]
      : typeof authors[0] === 'object'
        ? authors[0].firstName + ' ' + authors[0].lastName
        : null
    : null
  const date = publishedOn && formatDate({ date: publishedOn })

  return (
    <Link href={href} prefetch={false} className={classes.wrapper}>
      <BackgroundScanline
        className={[classes.scanline].filter(Boolean).join(' ')}
      />
      <CrosshairIcon
        className={[classes.crosshair, classes.crosshairTopLeft]
          .filter(Boolean)
          .join(' ')}
      />
      <CrosshairIcon
        className={[classes.crosshair, classes.crosshairTopRight]
          .filter(Boolean)
          .join(' ')}
      />
      <CrosshairIcon
        className={[classes.crosshair, classes.crosshairBottomLeft]
          .filter(Boolean)
          .join(' ')}
      />
      <CrosshairIcon
        className={[classes.crosshair, classes.crosshairBottomRight]
          .filter(Boolean)
          .join(' ')}
      />
      <div className={classes.contentWrapper}>
        {typeof media !== 'number' && (
          <Media resource={media} className={classes.media} />
        )}
        <div className={classes.content}>
          <h2 className={classes.title}>{title}</h2>

          <div className={classes.meta}>
            {date && (
              <time dateTime={publishedOn} className={classes.date}>
                {date}
              </time>
            )}
            {author && <p className={classes.author}>{author}</p>}
          </div>

          <p className={classes.description}>{meta?.description}</p>
        </div>
      </div>
    </Link>
  )
}
