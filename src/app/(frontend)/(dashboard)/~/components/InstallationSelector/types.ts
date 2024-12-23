import type { Install } from '@dashboard/api/fetchInstalls'

export interface InstallationSelectorProps {
  value?: Install['id']
  onChange?: (value?: Install) => void
  installs?: Install[]
  onInstall?: () => void
  loading?: boolean
  error?: string
  description?: string
  disabled?: boolean
  hideLabel?: boolean
  className?: string
  uuid: string
}
