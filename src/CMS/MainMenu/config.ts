import { revalidatePath } from 'next/cache'

import link from '@fields/link'
import { isAdminOrEditor } from '@access/isAdminOrEditor'
import { publishedOnly } from '@access/publishedOnly'

// import { isAdmin } from '@access/isAdmin'

import type { GlobalConfig } from 'payload'

export const MainMenu: GlobalConfig = {
  slug: 'main-menu',
  access: {
    read: publishedOnly,
    update: isAdminOrEditor,
    readVersions: isAdminOrEditor,
    readDrafts: isAdminOrEditor
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100
      }
    }
  },
  fields: [
    {
      name: 'tabs',
      type: 'array',
      admin: {
        components: {
          RowLabel: '@admin-components/RowLabelCustom/Tabs'
        }
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true
        },
        {
          type: 'row',
          fields: [
            {
              name: 'enableDirectLink',
              type: 'checkbox'
            },
            {
              name: 'enableDropdown',
              type: 'checkbox'
            }
          ]
        },
        {
          type: 'collapsible',
          admin: {
            condition: (_, siblingData) => siblingData.enableDirectLink
          },
          fields: [
            link({
              appearances: false,
              disableLabel: true
            })
          ],
          label: 'Direct Link'
        },
        {
          type: 'collapsible',
          admin: {
            condition: (_, siblingData) => siblingData.enableDropdown
          },
          fields: [
            {
              name: 'description',
              type: 'textarea'
            },
            {
              name: 'descriptionLinks',
              type: 'array',
              fields: [
                link({
                  appearances: false,
                  overrides: {
                    label: false
                  }
                })
              ]
            },
            {
              name: 'navItems',
              type: 'array',
              admin: {
                components: {
                  RowLabel: '@admin-components/RowLabelCustom/Items'
                }
              },
              fields: [
                {
                  name: 'style',
                  type: 'select',
                  defaultValue: 'default',
                  options: [
                    {
                      label: 'Default',
                      value: 'default'
                    },
                    {
                      label: 'Featured',
                      value: 'featured'
                    },
                    {
                      label: 'List',
                      value: 'list'
                    }
                  ]
                },
                {
                  name: 'defaultLink',
                  type: 'group',
                  admin: {
                    condition: (_, siblingData) =>
                      siblingData.style === 'default'
                  },
                  fields: [
                    link({
                      appearances: false,
                      overrides: {
                        label: false
                      }
                    }),
                    {
                      name: 'description',
                      type: 'textarea'
                    }
                  ]
                },
                {
                  name: 'featuredLink',
                  type: 'group',
                  admin: {
                    condition: (_, siblingData) =>
                      siblingData.style === 'featured'
                  },
                  fields: [
                    {
                      name: 'tag',
                      type: 'text'
                    },
                    {
                      name: 'label',
                      type: 'richText'
                    },
                    {
                      name: 'links',
                      type: 'array',
                      fields: [
                        link({
                          appearances: false,
                          overrides: {
                            label: false
                          }
                        })
                      ]
                    }
                  ]
                },
                {
                  name: 'listLinks',
                  type: 'group',
                  admin: {
                    condition: (_, siblingData) => siblingData.style === 'list'
                  },
                  fields: [
                    {
                      name: 'tag',
                      type: 'text'
                    },
                    {
                      name: 'links',
                      type: 'array',
                      fields: [
                        link({
                          appearances: false,
                          overrides: {
                            label: false
                          }
                        })
                      ]
                    }
                  ]
                }
              ]
            }
          ],
          label: 'Dropdown Menu'
        }
      ],
      label: 'Main Menu Items'
    },
    link({
      appearances: false,
      overrides: {
        name: 'menuCta',
        label: 'Menu CTA Button'
      }
    })
  ],
  hooks: {
    afterChange: [() => revalidatePath('/', 'layout')]
  }
}
