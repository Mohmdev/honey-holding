import { ROLES_WITH_ADMIN_ACCESS } from '@lib/constants'

import { ensureFirstUserIsAdmin } from '@CMS/Users/ensureFirstUserIsAdmin'
import { anyone } from '@services/access/anyone'
import { hasAdminPanelAccess } from '@services/access/hasAdminPanelAccess'
import { isAdmin, isAdminFieldLevel } from '@services/access/isAdmin'
import { isAdminOrEditor } from '@services/access/isAdminOrEditor'
import { isAdminOrEditorOrSelf } from '@services/access/isAdminOrEditorOrSelf'
import { isAdminOrSelfFieldLevel } from '@services/access/isAdminOrSelf'
import { generateForgotPasswordEmail } from '@services/email/generateForgotPasswordEmail'
import { generateVerificationEmail } from '@services/email/generateVerificationEmail'

import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig<'users'> = {
  slug: 'users',
  admin: {
    defaultColumns: ['name', 'email', 'roles'],
    useAsTitle: 'name'
  },
  access: {
    read: anyone,
    create: isAdmin,
    delete: isAdminOrEditorOrSelf,
    update: isAdminOrEditorOrSelf,
    // Determines which users can unlock other users who may be blocked due to failing too many login attempts.
    unlock: isAdminOrEditor,
    // Determines whether or not the currently logged in user can access the admin
    admin: hasAdminPanelAccess(...ROLES_WITH_ADMIN_ACCESS)
  },
  fields: [
    {
      name: 'name',
      type: 'text'
    },
    {
      name: 'roles',
      type: 'select',
      access: {
        create: isAdminFieldLevel,
        update: isAdminOrSelfFieldLevel,
        read: isAdminOrSelfFieldLevel
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
  ],
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
