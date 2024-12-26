import { User } from '@payload-types'

export type Login = (args: { email: string; password: string }) => Promise<User>
export type Logout = () => Promise<void>
export type ForgotPassword = (args: { email: string }) => Promise<void>
export type ResetPassword = (args: {
  password: string
  passwordConfirm: string
  token: string
}) => Promise<void>
export type AuthContext = {
  login: Login
  logout: Logout
  forgotPassword: ForgotPassword
  resetPassword: ResetPassword
  status: 'loggedIn' | 'loggedOut' | undefined
  user?: User | null
  setUser: (user: User | null) => void
  updateUser: (user: Partial<User>) => void
}
