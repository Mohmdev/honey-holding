import type { User } from '@payload-types'
import type { FieldHook } from 'payload'

// ensure the first user created is an admin
// 1. lookup a single user on create as succinctly as possible
// 2. if there are no users found, append `admin` to the roles array
// access control is already handled by this fields `access` property
// it ensures that only admins can create and update the `roles` field
export const ensureFirstUserIsAdmin: FieldHook<User> = async ({
  operation,
  req,
  value
}) => {
  if (operation === 'create') {
    const users = await req.payload.find({
      collection: 'users',
      depth: 0,
      limit: 0
    })
    if (users.totalDocs === 0) {
      // If no users exist and role is not set to admin, make them admin
      if (value !== 'admin') {
        return 'admin'
      }
    }
  }

  return value
}
