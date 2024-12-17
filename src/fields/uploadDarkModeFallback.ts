import type { Field } from 'payload'

export const uploadDarkModeFallback: Field = {
  name: 'darkModeFallback',
  type: 'upload',
  admin: {
    description: 'Choose an upload to render if the visitor is using dark mode.'
  },
  relationTo: 'media'
}
