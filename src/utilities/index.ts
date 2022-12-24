export const graphUrl = `${process.env.GRAPH_URL}${
  process.env.GRAPH_PORT !== '80' ? `:${process.env.GRAPH_PORT}` : ''
}/${process.env.GRAPH_PATH}`

export const studioUrl = process.env.STUDIO_URL
