import { DASHBOARD_SLUG } from '@lib/constants/constants'

import { Button } from '@components/ButtonComponent'
import { Gutter } from '@components/Gutter'

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
