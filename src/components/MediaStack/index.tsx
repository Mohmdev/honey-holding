import { Media as MediaType } from '@payload-types'

import { Media } from '@components/Media'

import classes from './index.module.scss'

type MediaStackProps = {
  media: {
    image: MediaType | number | number
  }[]
}

export const MediaStack: React.FC<MediaStackProps> = ({ media }) => {
  return (
    <div className={classes.stack}>
      {typeof media[0].image !== 'number' && (
        <Media resource={media[0].image} className={classes.mediaOne} />
      )}
      {typeof media[1].image !== 'number' && (
        <Media resource={media[1].image} className={classes.mediaTwo} />
      )}
    </div>
  )
}
