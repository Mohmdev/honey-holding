'use client'

import { PayloadClientReactComponent, RowLabelComponent } from 'payload'

import { useRowLabel } from '@payloadcms/ui'

const CustomRowLabelTabs: PayloadClientReactComponent<
  RowLabelComponent
> = () => {
  const { data } = useRowLabel<any>()

  return data.label || '...'
}

export default CustomRowLabelTabs
