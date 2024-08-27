export interface FetcherArgs {
  url: string
  token: string
  body?: string
  method?: string
}

const fetcher: <T = any>(...args: [FetcherArgs]) => Promise<T> = async ({
  url,
  token,
  body,
  method,
}) => {
  const response = await fetch(url, {
    method: method ?? 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })

  if (response.status === 429) {
    const retryAfter = response.headers.get('Retry-After')
    const retryAfterMs =
      retryAfter !== null ? parseInt(retryAfter, 10) * 1000 : 1000
    await new Promise((resolve) => setTimeout(resolve, retryAfterMs))
    return await fetcher({ url, token })
  }

  if (!response.ok) {
    const errorInfo = await response.json()
    const error = new Error(
      `An error occurred while fetching the data: ${errorInfo}`,
    )
    throw error
  }
  const responseJSON = await response.json()
  return responseJSON
}

export default fetcher
