import type { Field } from 'payload'

export const mediaDarkModeFallback: Field = {
  name: 'mediaDarkModeFallback',
  type: 'upload',
  admin: {
    description: 'Dark variation of the media for dark mode. (Optional)'
  },
  relationTo: 'media'
}
