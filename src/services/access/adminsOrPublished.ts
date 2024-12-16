import { checkRole } from '@access/checkRole'

import type { Access } from 'payload'

export const adminsOrPublished: Access = ({ req: { user } }) => {
  if (user && checkRole(['admin'], user)) {
    return true
  }

  return {
    _status: {
      equals: 'published'
    }
  }
}
