import { getClientSideURL } from '@utils/getURL'

import type { Endpoints } from '@octokit/types'

type GitHubResponse = Endpoints['GET /user']['response']

export const checkGitHubToken = async (): Promise<boolean> => {
  try {
    const reposReq = await fetch(`${getClientSideURL()}/api/users/github`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        route: `GET /user`
      })
    })

    const res: GitHubResponse = await reposReq.json()

    if (reposReq.ok) {
      return true
    } else {
      const message = `Unable to authorize GitHub: ${res.status}`
      console.error(message)
    }
  } catch (err: unknown) {
    const message = `Unable to authorize GitHub: ${err}`
    console.error(message)
  }

  return false
}
