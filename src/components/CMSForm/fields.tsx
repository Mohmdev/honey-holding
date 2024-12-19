import React from 'react'

import { NumberInput } from '@forms/fields/Number'

import { ChevronDownIcon } from '@icons/ChevronDownIcon'
import { RichText } from '@components/RichText'

import classes from './fields.module.scss'
import { Checkbox } from './fields/Checkbox'
import { Select } from './fields/Select'
import { Text } from './fields/Text'
import { Textarea } from './fields/Textarea'

export const fields = {
  checkbox: Checkbox,
  country: (props) => {
    return (
      <Select
        components={{ DropdownIndicator: ChevronDownIcon }}
        selectType="country"
        {...props}
      />
    )
  },
  email: (props) => {
    return <Text {...props} />
  },
  message: (props) => {
    return <RichText className={classes.message} content={props.message} />
  },
  number: NumberInput,
  select: (props) => {
    return (
      <Select components={{ DropdownIndicator: ChevronDownIcon }} {...props} />
    )
  },
  state: (props) => {
    return (
      <Select
        components={{ DropdownIndicator: ChevronDownIcon }}
        selectType="state"
        {...props}
      />
    )
  },
  text: Text,
  textarea: Textarea
}
