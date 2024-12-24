'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

import { getClientSideURL } from '@utils/getURL'

import { User } from '@payload-types'

type Create = (args: {
  email: string
  password: string
  passwordConfirm: string
}) => Promise<void>
type Login = (args: { email: string; password: string }) => Promise<User>
type Logout = () => Promise<void>
type ForgotPassword = (args: { email: string }) => Promise<void>
type ResetPassword = (args: {
  password: string
  passwordConfirm: string
  token: string
}) => Promise<void>
type AuthContext = {
  create: Create
  login: Login
  logout: Logout
  forgotPassword: ForgotPassword
  resetPassword: ResetPassword
  status: 'loggedIn' | 'loggedOut' | undefined
  user?: User | null
  setUser: (user: User | null) => void
  updateUser: (user: Partial<User>) => void
}

const AuthContext = createContext({} as AuthContext)

const DASHBOARD_CONNECTION_ERROR = 'Error connecting to dashboard'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // used to track the single event of logging in or logging out
  // useful for `useEffect` hooks that should only run once
  const [status, setStatus] = useState<'loggedIn' | 'loggedOut' | undefined>()
  const [user, setUser] = useState<User | null>()

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch(`${getClientSideURL()}/api/users/me`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'GET'
        })

        if (res.ok) {
          const { user: meUser } = await res.json()
          setUser(meUser || null)
          setStatus(meUser ? 'loggedIn' : undefined)
        } else {
          throw new Error('An error occurred while fetching your account.')
        }
      } catch (e) {
        setUser(null)
        throw new Error('An error occurred while fetching your account.')
      }
    }

    void fetchMe()
  }, [])

  const create = useCallback<Create>(async (args) => {
    try {
      const res = await fetch(`${getClientSideURL()}/api/users/create`, {
        body: JSON.stringify({
          email: args.email,
          password: args.password,
          passwordConfirm: args.passwordConfirm
        }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })

      if (res.ok) {
        const { data, errors } = await res.json()
        if (errors) throw new Error(errors[0].message)
        setUser(data?.loginUser?.user)
        setStatus('loggedIn')
      } else {
        throw new Error('Invalid login')
      }
    } catch (e) {
      throw new Error('An error occurred while attempting to login.')
    }
  }, [])

  const login = useCallback<Login>(
    async (args) => {
      try {
        const res = await fetch(`${getClientSideURL()}/api/users/login`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: args.email,
            password: args.password
          })
        })

        if (res.ok) {
          const { errors, user } = await res.json()
          if (errors) throw new Error(errors[0].message)
          setUser(user as User)
          setStatus('loggedIn')
          return user as User
        }

        throw new Error('An error occurred while attempting to login.')
      } catch (e) {
        console.error(e)
        throw new Error(`${DASHBOARD_CONNECTION_ERROR}: ${e.message}`)
      }
    },
    [setUser, setStatus]
  )

  const logout = useCallback<Logout>(async () => {
    try {
      const res = await fetch(`${getClientSideURL()}/api/users/logout`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })

      if (res.ok) {
        setUser(null)
        setStatus('loggedOut')
      } else {
        throw new Error('An error occurred while attempting to logout.')
      }
    } catch (e) {
      throw new Error(`${DASHBOARD_CONNECTION_ERROR}: ${e.message}`)
    }
  }, [])

  const forgotPassword = useCallback<ForgotPassword>(async (args) => {
    try {
      const res = await fetch(
        `${getClientSideURL()}/api/users/forgot-password`,
        {
          body: JSON.stringify({
            email: args.email
          }),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        }
      )

      if (res.ok) {
        const { data, errors } = await res.json()
        if (errors) throw new Error(errors[0].message)
        setUser(data?.loginUser?.user)
      } else {
        throw new Error('Invalid login')
      }
    } catch (e) {
      throw new Error('An error occurred while attempting to login.')
    }
  }, [])

  const resetPassword = useCallback<ResetPassword>(async (args) => {
    try {
      const res = await fetch(
        `${getClientSideURL()}/api/users/reset-password`,
        {
          body: JSON.stringify({
            password: args.password,
            passwordConfirm: args.passwordConfirm,
            token: args.token
          }),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        }
      )

      if (res.ok) {
        const { data, errors } = await res.json()
        if (errors) throw new Error(errors[0].message)
        setUser(data?.loginUser?.user)
        setStatus(data?.loginUser?.user ? 'loggedIn' : undefined)
      } else {
        throw new Error('Invalid login')
      }
    } catch (e) {
      throw new Error('An error occurred while attempting to login.')
    }
  }, [])

  const updateUser = useCallback<(updates: Partial<User>) => Promise<void>>(
    async (updates) => {
      try {
        const response = await fetch(
          `${getClientSideURL()}/api/users/${user?.id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(updates)
          }
        )

        const result = await response.json()

        if (result?.doc) {
          setUser({
            ...user,
            ...result.doc
          })
        } else {
          throw new Error('Failed to update user')
        }
      } catch (e) {
        throw new Error(`${DASHBOARD_CONNECTION_ERROR}: ${e.message}`)
      }
    },
    [user]
  )

  return (
    <AuthContext.Provider
      value={{
        user,
        create,
        setUser,
        updateUser,
        status,
        login,
        logout,
        forgotPassword,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
type UseAuth<T = User> = () => AuthContext
export const useAuth: UseAuth = () => useContext(AuthContext)
