## Instructions

- When working on a big file with a lot of code and functions in it, we do it in small steps.
- These steps will be instructed in the prompt.
- Because we are using payloadcms as our authentication and authorization service, When asked to write code about a specific operation, we will use the example code provided below for each operation.
- Always make sure to check the example code provided in the prompt before writing your code for clarity and correctness.

## Example code

- [Auth](#auth)
- [Login](#login)
- [Logout](#logout)
- [Refresh](#refresh)
- [Verify by Email](#verify-by-email)
- [Unlock](#unlock)
- [Forgot Password](#forgot-password)
- [Reset Password](#reset-password)

### Auth

```ts
// If you're using Next.js, you'll have to import headers from next/headers, like so:
// import { headers as nextHeaders } from 'next/headers'

// you'll also have to await headers inside your function, or component, like so:
// const headers = await nextHeaders()

// If you're using payload outside of Next.js, you'll have to provide headers accordingly.

// result will be formatted as follows:
// {
//    permissions: { ... }, // object containing current user's permissions
//    user: { ... }, // currently logged in user's document
//    responseHeaders: { ... } // returned headers from the response
// }

const result = await payload.auth({ headers })
```

### Login

```ts
// result will be formatted as follows:
// {
//   token: 'o38jf0q34jfij43f3f...', // JWT used for auth
//   user: { ... } // the user document that just logged in
//   exp: 1609619861 // the UNIX timestamp when the JWT will expire
// }

const result = await payload.login({
  collection: 'users', // required
  data: {
    // required
    email: 'dev@payloadcms.com',
    password: 'rip'
  },
  req: req, // pass a Request object to be provided to all hooks
  res: res, // used to automatically set an HTTP-only auth cookie
  depth: 2,
  locale: 'en',
  fallbackLocale: false,
  overrideAccess: false,
  showHiddenFields: true
})
```

### Forgot Password

```ts
// Returned token will allow for a password reset
const token = await payload.forgotPassword({
  collection: 'users', // required
  data: {
    // required
    email: 'dev@payloadcms.com'
  },
  req: req // pass a Request object to be provided to all hooks
})
```

### Reset Password

```ts
// Result will be formatted as follows:
// {
//   token: 'o38jf0q34jfij43f3f...', // JWT used for auth
//   user: { ... } // the user document that just logged in
// }
const result = await payload.resetPassword({
  collection: 'users', // required
  data: {
    // required
    password: req.body.password, // the new password to set
    token: 'afh3o2jf2p3f...' // the token generated from the forgotPassword operation
  },
  req: req, // pass a Request object to be provided to all hooks
  res: res // used to automatically set an HTTP-only auth cookie
})
```

### Unlock

```ts
// Returned result will be a boolean representing success or failure
const result = await payload.unlock({
  collection: 'users', // required
  data: {
    // required
    email: 'dev@payloadcms.com'
  },
  req: req, // pass a Request object to be provided to all hooks
  overrideAccess: true
})
```

### Verify by Email

```ts
// Returned result will be a boolean representing success or failure
const result = await payload.verifyEmail({
  collection: 'users', // required
  token: 'afh3o2jf2p3f...' // the token saved on the user as `_verificationToken`
})
```
