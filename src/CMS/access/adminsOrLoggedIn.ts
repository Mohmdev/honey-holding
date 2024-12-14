import { checkRole } from '@/access/checkRole'

import type { Access, AccessArgs } from 'payload'
import type { User } from '@/payload-types'

export const adminsOrLoggedIn: Access = ({
  req: { user }
}: AccessArgs<User>) => {
  if (user && checkRole(['admin'], user)) {
    return true
  }

  return !!user
}
