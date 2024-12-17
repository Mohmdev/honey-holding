import type { Access, FieldAccess } from 'payload'

export const isAdminOrEditor: Access = ({ req: { user } }) => {
  return user?.role === 'admin' || user?.role === 'editor'
}

export const isAdminOrEditorFieldLevel: FieldAccess = ({ req: { user } }) => {
  return user?.role === 'admin' || user?.role === 'editor'
}
