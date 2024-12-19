// @ts-nocheck

import Link from 'next/link'

import type { Partner } from '@payload-types'

import { ArrowIcon } from '@icons/ArrowIcon'
import { BackgroundScanline } from '@components/Background/Scanline'
import { Media } from '@components/Media'

import classes from './index.module.scss'

type PartnerCardProps = Partner

export const PartnerCard = (partner: PartnerCardProps) => {
  return (
    <Link href={`/partners/${partner.slug}`} className={classes.partnerCard}>
      <div className={classes.partnerCardImage}>
        {typeof partner.content.bannerImage !== 'string' && (
          <Media resource={partner.content.bannerImage} />
        )}
      </div>
      <div className={classes.partnerCardInfo}>
        <h5 className={classes.partnerCardName}>{partner.name}</h5>
        <p className={classes.partnerCardCity}>{partner.city}</p>
        <BackgroundScanline className={classes.scanlines} />
        <ArrowIcon className={classes.arrow} />
      </div>
    </Link>
  )
}
