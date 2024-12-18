import type { User } from '@payload-types'
import type { PayloadRequest } from 'payload'

import { checkRole } from './checkRole'

// Flexible role check
export const hasAdminPanelAccess = (...roles: User['role'][]) => {
  return ({ req: { user } }: { req: PayloadRequest }): boolean => {
    if (!user) return false
    return roles.some((role) => checkRole(role, user))
  }
}

// Hardcoded role check
// export const hasAdminPanelAccess = ({ req: { user } }) =>
//   user ? checkRole('admin', user) || checkRole('editor', user) : false
