import type { FieldHook } from 'payload'

import type { User } from '@/payload-types'

// ensure there is always a `user` role
// do not let non-admins change roles
export const protectRoles: FieldHook<{ id: string } & User> = ({
  data,
  req
}) => {
  const roles = req.user?.roles ?? []

  const isAdmin =
    roles.includes('admin') || data?.email === 'nexweb@mohmdev.com' // for the seed script

  if (!isAdmin) {
    return ['user']
  }

  const userRoles = new Set(data?.roles || [])
  userRoles.add('user')
  return [...userRoles]
}
