import type { Validate } from '../types'

export interface FieldProps<T> {
  path?: string
  name?: string
  required?: boolean
  validate?: Validate
  label?: string | React.ReactNode
  placeholder?: string
  onChange?: (value: T) => void
  initialValue?: T
  className?: string
  disabled?: boolean
  description?: string
  showError?: boolean
  icon?: React.ReactNode
  fullWidth?: boolean
  onClick?: () => void
}
