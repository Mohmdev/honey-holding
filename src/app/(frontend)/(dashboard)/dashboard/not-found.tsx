import { Button } from '@components/ButtonComponent'
import { Gutter } from '@components/Gutter'

import { DASHBOARD_SLUG } from '@constants'

export default function NotFound() {
  return (
    <Gutter>
      <h2>404</h2>
      <Button
        href={`/${DASHBOARD_SLUG}`}
        label="Dashboard Home"
        appearance="primary"
      />
    </Gutter>
  )
}
