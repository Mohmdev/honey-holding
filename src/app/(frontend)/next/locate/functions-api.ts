export interface LocateResponse {
  isGDPR: boolean // Indicates if user is in GDPR jurisdiction
  country?: string // Optional country code of the user
}

export const locate = (): Promise<Response> =>
  fetch('/next/locate', {
    headers: {
      'Content-Type': 'application/json'
    }
  })
