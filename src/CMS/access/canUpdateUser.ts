import type { Access } from 'payload'

export const canUpdateUser: Access = ({ req: { user }, id }) => {
  if (!user) {
    return false
  }

  // Allow users with a role of 'admin'
  if (user.roles && user.roles.some((role) => role === 'admin')) {
    return true
  }

  // allow any other users to update only oneself
  return user.id === id
}
