import type { User } from '@payload-types'

export const checkRole = (roleToCheck: User['role'], user: User): boolean => {
  if (!user) return false
  return user.role === roleToCheck
}
