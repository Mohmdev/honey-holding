// @ts-nocheck
import React from 'react'
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
  useFieldArray
} from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import { Switch } from '../ui/switch'
import { Edit, X, Plus } from 'lucide-react'
import { registerPlugin } from 'filepond'
import { FilePond } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

interface FormFieldProps {
  name: string
  label: string
  type?:
    | 'text'
    | 'email'
    | 'textarea'
    | 'number'
    | 'select'
    | 'switch'
    | 'password'
    | 'file'
    | 'multi-input'
  placeholder?: string
  options?: { value: string; label: string }[]
  accept?: string
  className?: string
  labelClassName?: string
  inputClassName?: string
  value?: string
  disabled?: boolean
  multiple?: boolean
  isIcon?: boolean
  initialValue?: string | number | boolean | string[]
}

export const CustomFormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  options,
  accept,
  className,
  inputClassName,
  labelClassName,
  disabled = false,
  multiple = false,
  isIcon = false,
  initialValue
}) => {
  const { control } = useFormContext()

  const renderFormControl = (
    field: ControllerRenderProps<FieldValues, string>
  ) => {
    switch (type) {
      case 'textarea':
        return (
          <Textarea
            placeholder={placeholder}
            {...field}
            rows={3}
            className={`bg-customgreys-darkGrey border-none p-4 ${inputClassName}`}
          />
        )
      case 'select':
        return (
          <Select
            value={field.value || (initialValue as string)}
            defaultValue={field.value || (initialValue as string)}
            onValueChange={field.onChange}
          >
            <SelectTrigger
              className={`bg-customgreys-primarybg w-full border-none p-4 ${inputClassName}`}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-customgreys-primarybg border-customgreys-dirtyGrey w-full shadow-sm">
              {options?.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className={`hover:text-customgreys-darkGrey! hover:bg-gray-100! cursor-pointer`}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      case 'switch':
        return (
          <div className="flex items-center space-x-2">
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              id={name}
              className={`text-customgreys-dirtyGrey ${inputClassName}`}
            />
            <FormLabel htmlFor={name} className={labelClassName}>
              {label}
            </FormLabel>
          </div>
        )
      case 'file':
        const ACCEPTED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg']
        const acceptedFileTypes = accept ? [accept] : ACCEPTED_VIDEO_TYPES

        return (
          <FilePond
            className={`${inputClassName}`}
            files={field.value ? [field.value] : []}
            allowMultiple={multiple}
            onupdatefiles={(fileItems) => {
              field.onChange(
                multiple
                  ? fileItems.map((fileItem) => fileItem.file)
                  : fileItems[0]?.file
              )
            }}
            acceptedFileTypes={acceptedFileTypes}
            labelIdle={`Drag & Drop your files or <span class="filepond--label-action">Browse</span>`}
            credits={false}
          />
        )
      case 'number':
        return (
          <Input
            type="number"
            placeholder={placeholder}
            {...field}
            className={`bg-customgreys-darkGrey border-none p-4 ${inputClassName}`}
            disabled={disabled}
          />
        )
      case 'multi-input':
        return (
          <MultiInputField
            name={name}
            control={control}
            placeholder={placeholder}
            inputClassName={inputClassName}
          />
        )
      default:
        return (
          <Input
            type={type}
            placeholder={placeholder}
            {...field}
            className={`bg-customgreys-primarybg border-none p-4 ${inputClassName}`}
            disabled={disabled}
          />
        )
    }
  }

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={initialValue}
      render={({ field }) => (
        <FormItem
          className={`${
            type !== 'switch' && 'rounded-md'
          } relative ${className}`}
        >
          {type !== 'switch' && (
            <div className="flex items-center justify-between">
              <FormLabel
                className={`text-customgreys-dirtyGrey text-sm ${labelClassName}`}
              >
                {label}
              </FormLabel>

              {!disabled &&
                isIcon &&
                type !== 'file' &&
                type !== 'multi-input' && (
                  <Edit className="text-customgreys-dirtyGrey size-4" />
                )}
            </div>
          )}
          <FormControl>
            {renderFormControl({
              ...field,
              value: field.value !== undefined ? field.value : initialValue
            })}
          </FormControl>
          <FormMessage className="text-red-400" />
        </FormItem>
      )}
    />
  )
}
interface MultiInputFieldProps {
  name: string
  control: any
  placeholder?: string
  inputClassName?: string
}

const MultiInputField: React.FC<MultiInputFieldProps> = ({
  name,
  control,
  placeholder,
  inputClassName
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name
  })

  return (
    <div className="space-y-2">
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center space-x-2">
          <FormField
            control={control}
            name={`${name}.${index}`}
            render={({ field }) => (
              <FormControl>
                <Input
                  {...field}
                  placeholder={placeholder}
                  className={`bg-customgreys-darkGrey flex-1 border-none p-4 ${inputClassName}`}
                />
              </FormControl>
            )}
          />
          <Button
            type="button"
            onClick={() => remove(index)}
            variant="ghost"
            size="icon"
            className="text-customgreys-dirtyGrey"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        onClick={() => append('')}
        variant="outline"
        size="sm"
        className="text-customgreys-dirtyGrey mt-2"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Item
      </Button>
    </div>
  )
}
