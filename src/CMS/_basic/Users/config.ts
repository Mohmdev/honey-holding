import { admins } from '@/services/access/depricated/admins'
import { generateForgotPasswordEmail } from '@/services/email/generateForgotPasswordEmail'
import { generateVerificationEmail } from '@/services/email/generateVerificationEmail'

import { adminsAndUser } from '@access/depricated/adminsAndUser'
import { anyone } from '@access/depricated/anyone'
import { canUpdateUser } from '@access/depricated/canUpdateUser'

import type { CollectionConfig } from 'payload'

import { rolesField } from './fields/roles'

export const Users: CollectionConfig<'users'> = {
  slug: 'users',
  admin: {
    defaultColumns: ['name', 'email', 'roles'],
    useAsTitle: 'name'
  },
  fields: [
    {
      name: 'name',
      type: 'text'
    },
    rolesField
  ],
  access: {
    create: anyone,
    read: adminsAndUser,
    update: canUpdateUser,
    delete: admins,
    admin: admins,
    unlock: admins
  },
  auth: {
    forgotPassword: {
      generateEmailHTML: generateForgotPasswordEmail,
      generateEmailSubject: () => 'Reset your password'
    },
    verify: {
      generateEmailHTML: generateVerificationEmail,
      generateEmailSubject: () => 'Verify your email'
    }
  },
  timestamps: true
}
