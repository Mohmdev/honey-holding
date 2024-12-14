import { resendAdapter } from '@payloadcms/email-resend'
import type { Config } from 'payload'

export const emailAdapter: Config['email'] = resendAdapter({
  defaultFromAddress: 'nexweb@mohmdev.com',
  defaultFromName: 'Nexweb Studio',
  apiKey: process.env.RESEND_API_KEY || ''
})
