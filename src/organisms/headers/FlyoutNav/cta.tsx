import { Button } from '@/components/ui/new-york/button'
import { FaUserCircle } from 'react-icons/fa'

export const CTAs = () => {
  return (
    <div className="flex items-center gap-3">
      <Button variant="ghost">
        <FaUserCircle />
        <span>Sign in</span>
      </Button>
      <Button variant="secondary">Schedule a Demo</Button>
    </div>
  )
}
