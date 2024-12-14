import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import {
  FixedToolbarFeature,
  HeadingFeature,
  lexicalEditor
} from '@payloadcms/richtext-lexical'

import type { Plugin } from 'payload'

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
            editor: lexicalEditor({
              features: ({ rootFeatures }) => {
                return [
                  ...rootFeatures,
                  FixedToolbarFeature(),
                  HeadingFeature({
                    enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4']
                  })
                ]
              }
            })
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
