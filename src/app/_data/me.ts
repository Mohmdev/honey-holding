export const USER = `
  id
  firstName
  lastName
  email
  role
  _verified
`

export const ME_QUERY = `query {
  meUser {
    user {
      ${USER}
    }
    exp
  }
}`
