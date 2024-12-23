'use client'

import { PayloadClientReactComponent, RowLabelComponent } from 'payload'

import { useRowLabel } from '@payloadcms/ui'

const CustomRowLabelNavItems: PayloadClientReactComponent<
  RowLabelComponent
> = () => {
  const { data } = useRowLabel<any>()

  if (data.style === 'default') {
    return data.defaultLink?.link.label
  }
  if (data.style === 'featured') {
    return data.featuredLink?.tag
  }
  if (data.style === 'list') {
    return data.listLinks?.tag
  }
}

export default CustomRowLabelNavItems
