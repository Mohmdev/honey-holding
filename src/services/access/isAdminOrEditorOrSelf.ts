import type { Access, FieldAccess } from 'payload'

export const isAdminOrEditorOrSelf: Access = ({ req: { user } }) => {
  // Need to be logged in
  if (user) {
    // If user has role of 'admin' or 'editor'
    if (user.role === 'admin' || user?.role === 'editor') {
      return true
    }

    // If any other type of user, only provide access to themselves
    return {
      id: {
        equals: user.id
      }
    }
  }

  // Reject everyone else
  return false
}

export const isAdminOrEditorOrSelfFieldLevel: FieldAccess = ({
  id,
  req: { user }
}) => {
  // Return true or false based on if the user has an admin or editor role
  if (user?.role === 'admin' || user?.role === 'editor') return true
  if (user?.id === id) return true
  return false
}
