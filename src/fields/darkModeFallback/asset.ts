import type { Field } from 'payload'

export const assetDarkModeFallback: Field = {
  name: 'assetDarkModeFallback',
  type: 'upload',
  admin: {
    description: 'Dark variation of the asset for dark mode. (Optional)'
  },
  relationTo: 'assets'
}
