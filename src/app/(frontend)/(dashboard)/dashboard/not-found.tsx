import { Button } from '@components/ButtonComponent'
import { Gutter } from '@components/Gutter'

export default function NotFound() {
  return (
    <Gutter>
      <h2>404</h2>
      <Button href={`/dashboard`} label="Dashboard home" appearance="primary" />
    </Gutter>
  )
}
