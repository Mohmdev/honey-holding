import type { PayloadRequest } from 'payload'

import { generateEmailHTML } from './generateEmailHTML'
import { getServerSideURL } from '@/lib/utils/getURL'

type ForgotPasswordEmailArgs =
  | {
      req?: PayloadRequest
      token?: string
      user?: any
    }
  | undefined

export const generateForgotPasswordEmail = async (
  args: ForgotPasswordEmailArgs
): Promise<string> => {
  return generateEmailHTML({
    content: '<p>Let&apos;s get you back in.</p>',
    cta: {
      buttonLabel: 'Reset your password',
      url: `${getServerSideURL()}/reset-password?token=${args?.token}`
    },
    headline: 'Locked out? | Nexweb'
  })
}
