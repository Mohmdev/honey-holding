import { admins } from '@/services/access/depricated/admins'

import type { Field } from 'payload'

import { ensureFirstUserIsAdmin } from '../ensureFirstUserIsAdmin'

export const rolesField: Field = {
  name: 'roles',
  type: 'select',
  access: {
    create: admins,
    update: admins,
    read: admins
  },
  hasMany: true,
  hooks: {
    beforeChange: [ensureFirstUserIsAdmin]
  },
  options: [
    {
      label: 'admin',
      value: 'admin'
    },
    {
      label: 'user',
      value: 'user'
    }
  ],
  defaultValue: ['user']
}
