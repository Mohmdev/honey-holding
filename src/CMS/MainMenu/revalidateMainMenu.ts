import { revalidateTag } from 'next/cache'

import type { GlobalAfterChangeHook } from 'payload'

export const revalidateMainMenu: GlobalAfterChangeHook = ({
  doc,
  req: { payload }
}) => {
  revalidateTag('global_main-menu')

  payload.logger.info(`✔ Main Menu Revalidated`)
  payload.logger.info(``)

  return doc
}
