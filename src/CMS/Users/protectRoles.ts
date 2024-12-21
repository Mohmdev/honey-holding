import type { User } from '@payload-types'
import type { FieldHook } from 'payload'

// ensure there is always a `public` role
// do not let non-admins change roles
export const protectRoles: FieldHook<{ id: number } & User> = ({
  data,
  req
}) => {
  const isAdmin = req.user?.role === 'admin'

  if (!isAdmin) {
    return ['public']
  }

  const userRole = new Set(data?.role || '')
  userRole.add('public')
  return [...userRole]
}
