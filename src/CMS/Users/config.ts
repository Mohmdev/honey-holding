import { anyone } from '@access/anyone'
import { isAdmin, isAdminFieldLevel } from '@access/isAdmin'
import { isAdminOrEditor } from '@access/isAdminOrEditor'
import { isAdminOrEditorOrSelf } from '@access/isAdminOrEditorOrSelf'
import { isAdminOrSelfFieldLevel } from '@access/isAdminOrSelf'

import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig<'users'> = {
  slug: 'users',
  labels: {
    singular: 'User',
    plural: 'Users'
  },
  access: {
    read: anyone,
    create: isAdmin,
    delete: isAdminOrEditorOrSelf,
    update: isAdminOrEditorOrSelf,
    // Determines which users can unlock other users who may be blocked due to failing too many login attempts.
    unlock: isAdminOrEditor
  },
  admin: {
    useAsTitle: 'firstName',
    defaultColumns: ['photo', 'firstName', 'role', 'email']
  },
  auth: {
    // verify: false,
    cookies: {
      // cross-domain authentication
      domain: process.env.COOKIE_DOMAIN,
      // When in production
      // secure: true - Only sends cookies over HTTPS
      // sameSite: None - Allows cross-origin requests
      sameSite:
        process.env.NODE_ENV === 'production' &&
        !process.env.DISABLE_SECURE_COOKIE
          ? 'None'
          : undefined,
      secure:
        process.env.NODE_ENV === 'production' &&
        !process.env.DISABLE_SECURE_COOKIE
          ? true
          : undefined
    },
    tokenExpiration: 28800 // 8 hours
    // forgotPassword: {
    //   generateEmailHTML: generateForgotPasswordEmail,
    //   generateEmailSubject: () => 'Reset your password'
    // },
    // verify: {
    //   generateEmailHTML: generateVerificationEmail,
    //   generateEmailSubject: () => 'Verify your email'
    // }
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: true
        },
        {
          name: 'lastName',
          type: 'text',
          required: true
        }
      ]
    },
    {
      name: 'twitter',
      type: 'text',
      admin: {
        description: 'Example: `nexwebdev`'
      },
      label: 'Twitter Handle'
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media'
    },
    {
      name: 'role',
      required: true,
      type: 'select',
      access: {
        create: isAdminFieldLevel,
        read: isAdminOrSelfFieldLevel,
        update: isAdminFieldLevel
      },
      defaultValue: ['public'],
      options: ['admin', 'editor', 'public'],
      hasMany: false // was `true`
    }
  ],
  timestamps: true
}
