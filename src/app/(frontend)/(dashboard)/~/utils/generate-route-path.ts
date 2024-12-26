import { DASHBOARD_SLUG } from '@lib/constants/constants'

type Args = {
  environmentSlug?: string
  projectSlug: string
  suffix?: string
  teamSlug: string
}

export function generateRoutePath({
  environmentSlug,
  projectSlug,
  suffix,
  teamSlug
}: Args): string {
  return `/${DASHBOARD_SLUG}/${teamSlug}/${projectSlug}${
    environmentSlug ? `/env/${environmentSlug}` : ''
  }${suffix ? `/${suffix}` : ''}`
}
