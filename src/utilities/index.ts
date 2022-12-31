export const graphUrl = `${process.env.GRAPH_URL}${
  process.env.GRAPH_PORT !== '80' ? `:${process.env.GRAPH_PORT}` : ''
}/${process.env.GRAPH_PATH}`

export const studioUrl = process.env.STUDIO_URL

export const useSubscription = (subscriptionQuery: string, callback: any) => {
  const url = new URL(graphUrl)

  url.searchParams.append('query', subscriptionQuery)
  const eventsource = new EventSource(url.toString(), {
    withCredentials: true, // This is required for cookies
  })

  eventsource.onmessage = function (event) {
    const data = JSON.parse(event.data)
    callback(data)
  }
}
