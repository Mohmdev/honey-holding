import { getClientSideURL } from '@utils/getURL'

export const exchangeCode = async (code: string): Promise<boolean> => {
  if (code) {
    try {
      const res = await fetch(
        `${getClientSideURL()}/api/exchange-code?code=${code}`,
        {
          method: 'GET',
          credentials: 'include'
        }
      )

      const body = await res.json()

      if (res.ok) {
        return true
      } else {
        throw new Error(body.message)
      }
    } catch (err: unknown) {
      const message = `Unable to authorize GitHub: ${err}`
      console.error(message)
      throw new Error(message)
    }
  }

  return false
}
