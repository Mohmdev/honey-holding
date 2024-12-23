import { revalidateTag } from 'next/cache'

import type { GlobalAfterChangeHook } from 'payload'

export const revalidateGraphics: GlobalAfterChangeHook = ({
  doc,
  req: { payload }
}) => {
  revalidateTag('global_graphics')

  payload.logger.info(`✔ Site Graphics Revalidated`)
  payload.logger.info(``)

  return doc
}
