import { revalidateTag } from 'next/cache'

import type { GlobalAfterChangeHook } from 'payload'

export const revalidateFooter: GlobalAfterChangeHook = ({
  doc,
  req: { payload }
}) => {
  revalidateTag('global_footer')

  payload.logger.info(`✔ Footer Revalidated`)
  payload.logger.info(``)

  return doc
}
