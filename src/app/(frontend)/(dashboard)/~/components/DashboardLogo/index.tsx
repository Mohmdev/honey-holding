import { PayloadIcon } from '@graphics/PayloadIcon'

import classes from './classes.module.scss'

export const DashboardLogo = () => {
  return (
    <div className={classes.cloudLogo}>
      <PayloadIcon />
      <span>Nexweb Dashboard</span>
    </div>
  )
}
