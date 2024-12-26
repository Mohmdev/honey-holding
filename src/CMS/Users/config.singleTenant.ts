import { ROLES_WITH_ADMIN_ACCESS } from '@lib/constants/constants'

import { generateForgotPasswordEmail } from '@services/email/generateForgotPasswordEmail'
import { generateVerificationEmail } from '@services/email/generateVerificationEmail'
import { anyone } from '@access/anyone'
import { hasAdminPanelAccess } from '@access/hasAdminPanelAccess'
import { isAdminFieldLevel } from '@access/isAdmin'
import { isAdminOrEditor } from '@access/isAdminOrEditor'
import { isAdminOrEditorOrSelf } from '@access/isAdminOrEditorOrSelf'
import { isAdminOrSelf, isAdminOrSelfFieldLevel } from '@access/isAdminOrSelf'

import type { CollectionConfig } from 'payload'

import { ensureFirstUserIsAdmin } from './ensureFirstUserIsAdmin'

export const Users: CollectionConfig<'users'> = {
  slug: 'users',
  labels: {
    singular: 'User',
    plural: 'Users'
  },
  admin: {
    useAsTitle: 'username',
    defaultColumns: ['photo', 'username', 'role', 'email']
  },
  defaultPopulate: {
    username: true,
    firstName: true,
    lastName: true,
    role: true,
    photo: true
  },
  fields: [
    {
      name: 'username',
      type: 'text',
      required: true,
      index: true
    },
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text'
        },
        {
          name: 'lastName',
          type: 'text'
        }
      ]
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      displayPreview: true
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
      defaultValue: 'public',
      options: ['admin', 'editor', 'public'],
      hasMany: false, // setting this to `true` makes the roles field type definition an array. Keep it false.
      saveToJWT: true,
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin]
      },
      admin: {
        position: 'sidebar'
      }
    }
  ],
  access: {
    create: anyone,
    read: isAdminOrEditorOrSelf,
    delete: isAdminOrSelf,
    update: isAdminOrSelf,
    // Determines which users can unlock other users who may be blocked due to failing too many login attempts.
    unlock: isAdminOrEditor,
    // Determines whether or not the currently logged in user can access the admin
    admin: hasAdminPanelAccess(...ROLES_WITH_ADMIN_ACCESS)
  },
  auth: {
    cookies: {
      // HTTPS only cookies
      secure:
        process.env.NODE_ENV === 'production' &&
        !process.env.DISABLE_SECURE_COOKIE
          ? true // true in production
          : undefined,
      sameSite: 'None', // cross-origin requests
      domain: process.env.COOKIE_DOMAIN || undefined // cross-domain authentication
    },
    tokenExpiration: 28800, // 8 hours
    // verify: false,
    forgotPassword: {
      generateEmailHTML: generateForgotPasswordEmail,
      generateEmailSubject: () => 'Reset your password'
    },
    verify: {
      generateEmailHTML: generateVerificationEmail,
      generateEmailSubject: () => 'Verify your email'
    }
  }
}
