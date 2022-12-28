import { createAuth0 } from '@auth0/auth0-vue'

const auth = createAuth0({
  domain: process.env.AUTH0_DOMAIN ?? '',
  client_id: process.env.AUTH0_CID ?? '',
  redirect_uri: window.location.origin,
})

export default auth
