import { checkRole } from '@/access/checkRole'

import type { Access } from 'payload'

export const adminsAndUser: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin'], user)) {
      return true
    }

    return {
      id: {
        equals: user.id
      }
    }
  }

  return false
}
