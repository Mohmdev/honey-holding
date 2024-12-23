'use client'

import React, { useCallback, useEffect } from 'react'

import { TextFieldClientProps } from 'payload'

import {
  Button,
  FieldLabel,
  TextInput,
  useField,
  useForm,
  useFormFields
} from '@payloadcms/ui'

import { formatUploadAlt } from './formatAlt'

import './index.scss'

type UploadAltComponentProps = {
  fieldToUse: string
  checkboxFieldPath: string
} & TextFieldClientProps

export const UploadAltComponent: React.FC<UploadAltComponentProps> = ({
  field,
  fieldToUse,
  checkboxFieldPath: checkboxFieldPathFromProps,
  path,
  readOnly: readOnlyFromProps
}) => {
  const { label } = field

  const checkboxFieldPath = path?.includes('.')
    ? `${path}.${checkboxFieldPathFromProps}`
    : checkboxFieldPathFromProps

  const { value, setValue } = useField<string>({ path: path || field.name })

  const { dispatchFields } = useForm()

  // The value of the checkbox
  // We're using separate useFormFields to minimise re-renders
  const checkboxValue = useFormFields(([fields]) => {
    return fields[checkboxFieldPath]?.value as string
  })

  // The value of the field we're listening to for the alt text
  const targetFieldValue = useFormFields(([fields]) => {
    return fields[fieldToUse]?.value as string
  })

  // Compute formatted alt text for placeholder
  const formattedAltTextPreview = targetFieldValue
    ? formatUploadAlt(targetFieldValue)
    : ''

  useEffect(() => {
    if (checkboxValue) {
      if (targetFieldValue) {
        const formattedAltText = formatUploadAlt(targetFieldValue)

        if (value !== formattedAltText) setValue(formattedAltText)
      } else {
        if (value !== '') setValue('')
      }
    }
  }, [targetFieldValue, checkboxValue, setValue, value])

  const handleLock = useCallback(
    (e) => {
      e.preventDefault()

      dispatchFields({
        type: 'UPDATE',
        path: checkboxFieldPath,
        value: !checkboxValue
      })
    },
    [checkboxValue, checkboxFieldPath, dispatchFields]
  )

  const readOnly = readOnlyFromProps || checkboxValue

  return (
    <div className="field-type upload-alt-field-component">
      <div className="label-wrapper">
        <FieldLabel htmlFor={`field-${path}`} label={label} />

        <Button className="lock-button" buttonStyle="none" onClick={handleLock}>
          {checkboxValue ? 'Unlock' : 'Lock'}
        </Button>
      </div>

      <TextInput
        value={value}
        onChange={setValue}
        path={path || field.name}
        readOnly={Boolean(readOnly)}
        placeholder={!readOnly ? formattedAltTextPreview : undefined}
      />
    </div>
  )
}
