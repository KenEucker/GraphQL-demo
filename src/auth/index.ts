import { createAuth0 } from '@auth0/auth0-vue'

export const auth: any =
  process.env.AUTH0_DOMAIN && process.env.AUTH0_CID
    ? createAuth0({
        domain: process.env.AUTH0_DOMAIN ?? '',
        audience: process.env.AUTH0_AUDIENCE ?? '',
        client_id: process.env.AUTH0_CID ?? '',
        redirect_uri: window.location.origin,
        useRefreshTokens: true,
      })
    : {}

if (process.env.AUTH0_DOMAIN && process.env.AUTH0_CID) {
  auth.initialized = true
}

export default auth
