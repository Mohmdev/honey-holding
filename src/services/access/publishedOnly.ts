import type { Access } from 'payload'

export const publishedOnly: Access = ({ req: { user } }) => {
  // true if user is an admin
  if (user?.role === 'admin' || user?.role === 'editor') {
    return true
  }

  // Else true if the status is published
  return {
    _status: {
      equals: 'published'
    }
  }
}
