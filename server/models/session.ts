import cookieSignature from 'cookie-signature'
import type { H3Event } from 'h3'
import { getUserById } from '../models/user'

const signCookie = (value: string, secret: string) => {
  return cookieSignature.sign(value, secret)
}

const unsignCookie = (value: string, secret: string) => {
  return cookieSignature.unsign(value, secret)
}

const serializeSession = (id: { [key: string]: string }) => {
  return Buffer.from(JSON.stringify(id), 'utf-8').toString('base64')
}

const deserializeSession = (value: string) => {
  return JSON.parse(Buffer.from(value, 'base64').toString('utf-8'))
}

export const createSessionAndCookie = (
  event: H3Event,
  id: { [key: string]: string }
) => {
  const config = useRuntimeConfig()
  const session = serializeSession(id)
  const signedSession = signCookie(session, config.cookieSecret)

  setCookie(event, config.cookieName, signedSession, {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: true,
    expires: new Date(Date.now() + config.cookieExpires),
  })
}

export const getUserFromSession = (event: H3Event) => {
  const config = useRuntimeConfig()
  const cookie = getCookie(event, config.cookieName)

  if (!cookie) {
    return
  }

  const unsignedSession = unsignCookie(cookie, config.cookieSecret)

  if (!unsignedSession) {
    return
  }

  const session = deserializeSession(unsignedSession)
  const currentUser = getUserById(session.id)

  return currentUser
}
