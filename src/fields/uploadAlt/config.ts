import type { CheckboxField, TextField } from 'payload'

import { formatUploadAltHook } from './formatAlt'

type Overrides = {
  altOverrides?: Partial<TextField>
  checkboxOverrides?: Partial<CheckboxField>
}

type Alt = (
  fieldToUse?: string,
  overrides?: Overrides
) => [TextField, CheckboxField]

export const uploadAltField: Alt = (fieldToUse = 'title', overrides = {}) => {
  const { altOverrides, checkboxOverrides } = overrides

  const checkBoxField: CheckboxField = {
    name: 'altLock',
    type: 'checkbox',
    defaultValue: true,
    admin: {
      hidden: true
    },
    ...checkboxOverrides
  }

  // @ts-expect-error: Expect ts error here because of typescript mismatching Partial<TextField> with TextField
  const uploadAltField: TextField = {
    name: 'alt',
    type: 'text',
    index: true,
    label: 'Alt',
    required: true,
    ...(altOverrides || {}),
    hooks: {
      // Kept this in for hook or API based updates
      beforeValidate: [formatUploadAltHook(fieldToUse)]
    },
    admin: {
      description: 'Alt text used for SEO and accessibility',
      ...(altOverrides?.admin || {}),
      components: {
        Field: {
          path: '@fields/uploadAlt/client#UploadAltComponent',
          clientProps: {
            fieldToUse,
            checkboxFieldPath: checkBoxField.name
          }
        }
      }
    }
  }

  return [uploadAltField, checkBoxField]
}
