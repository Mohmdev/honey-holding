import type { Access, FieldAccess } from 'payload'

export const isAdmin: Access = ({ req: { user } }) => {
  // Return true or false based on if the user has an admin role
  return user?.role === 'admin'

  // When `hasMany` is `true` and the user has an `array` of roles
  // return Boolean(user?.roles?.includes('admin'))
}

export const isAdminFieldLevel: FieldAccess = ({ req: { user } }) => {
  // Return true or false based on if the user has an admin role
  return user?.role === 'admin'

  // return Boolean(user?.roles?.includes('admin'))
}
