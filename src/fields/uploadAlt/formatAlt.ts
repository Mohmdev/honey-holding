import type { FieldHook } from 'payload'

export const formatUploadAlt = (val: string): string => {
  if (!val) return ''

  return (
    val
      // Remove file extensions and special chars
      .replace(/\.[^/.]+$/, '') // Remove file extension
      .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and dashes

      // Convert separators to spaces
      .replace(/[-_]+/g, ' ')

      // Remove redundant words
      .replace(/^(image|picture|photo|img) of /i, '')
      .replace(/^(image|picture|photo|img) showing /i, '')

      // Title Case + Clean
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
      .trim()
  )
}

export const formatUploadAltHook =
  (fallback: string): FieldHook =>
  ({ data, operation, originalDoc, value }) => {
    if (typeof value === 'string') {
      return formatUploadAlt(value)
    }

    if (operation === 'create' || !data?.alt) {
      const fallbackData = data?.[fallback] || data?.[fallback]

      if (fallbackData && typeof fallbackData === 'string') {
        return formatUploadAlt(fallbackData)
      }
    }

    return value
  }
