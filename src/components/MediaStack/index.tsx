import { Media as MediaType } from '@payload-types'

import { Media } from '@components/Media'

import classes from './index.module.scss'

type MediaStackProps = {
  media: {
    image: MediaType | string
  }[]
}

export const MediaStack: React.FC<MediaStackProps> = ({ media }) => {
  return (
    <div className={classes.stack}>
      {typeof media[0].image !== 'string' && (
        <Media resource={media[0].image} className={classes.mediaOne} />
      )}
      {typeof media[1].image !== 'string' && (
        <Media resource={media[1].image} className={classes.mediaTwo} />
      )}
    </div>
  )
}