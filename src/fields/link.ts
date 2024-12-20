import deepMerge from '@utils/deepMerge'

import type { ButtonProps } from '@ui/button'
import type { Field } from 'payload'

import { LINKABLE_COLLECTIONS } from '@constants'

type ButtonVariants = NonNullable<ButtonProps['variant']>

export type LinkAppearances = 'default' | 'outline' | ButtonVariants

export const appearanceOptions: Record<
  LinkAppearances,
  { label: string; value: string }
> = {
  default: {
    label: 'Default',
    value: 'default'
  },
  outline: {
    label: 'Outline',
    value: 'outline'
  },
  secondary: {
    label: 'Secondary',
    value: 'secondary'
  },
  destructive: {
    label: 'Destructive',
    value: 'destructive'
  },
  ghost: {
    label: 'Ghost',
    value: 'ghost'
  },
  link: {
    label: 'Link',
    value: 'link'
  }
}

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  overrides?: Record<string, unknown>
}) => Field

const link: LinkType = ({
  appearances,
  disableLabel = false,
  overrides = {}
} = {}) => {
  const linkResult: Field = {
    name: 'link',
    type: 'group',
    admin: {
      hideGutter: true,
      ...(overrides?.admin || {})
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%'
            },
            defaultValue: 'reference',
            options: [
              {
                label: 'Internal link',
                value: 'reference'
              },
              {
                label: 'Custom URL',
                value: 'custom'
              }
            ]
          },
          {
            name: 'newTab',
            type: 'checkbox',
            admin: {
              style: {
                alignSelf: 'flex-end'
              },
              width: '25%'
            },
            label: 'Open in new tab'
          }
        ]
      }
    ]
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference'
      },
      label: 'Document to link to',
      relationTo: LINKABLE_COLLECTIONS,
      required: true
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom'
      },
      label: 'Custom URL',
      required: true
    }
  ]

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: '50%'
      }
    }))

    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'label',
          type: 'text',
          admin: {
            width: '50%'
          },
          label: 'Label',
          required: true
        },
        {
          name: 'customId',
          type: 'text',
          admin: {
            width: '25%'
          }
        }
      ]
    })
  } else {
    linkResult.fields = [
      ...linkResult.fields,
      ...linkTypes,
      {
        name: 'customId',
        type: 'text',
        admin: {
          width: '25%'
        }
      }
    ]
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = Object.values(appearanceOptions)

    if (appearances) {
      appearanceOptionsToUse = appearances.map(
        (appearance) => appearanceOptions[appearance]
      )
    }

    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      admin: {
        description: 'Choose how the link should be rendered.'
      },
      defaultValue: 'default',
      options: appearanceOptionsToUse
    })
  }

  return deepMerge(linkResult, overrides)
}

export default link
