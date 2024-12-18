import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'

import type { Plugin } from 'payload'

import { formsLexical } from '../editor/formsLexical'

export const formBuilderPluginConfig: Plugin = formBuilderPlugin({
  fields: {
    payment: false
  },
  formOverrides: {
    fields: ({ defaultFields }) => {
      return defaultFields.map((field) => {
        if ('name' in field && field.name === 'confirmationMessage') {
          return {
            ...field,
            editor: formsLexical
          }
        }
        return field
      })
    },
    admin: {
      group: 'Settings'
    }
  },
  formSubmissionOverrides: {
    admin: {
      group: 'Settings'
    }
  }
})
