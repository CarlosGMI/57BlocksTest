import bcrypt from 'bcryptjs'
import { getUserByEmail } from '../../models/user'
import { createSessionAndCookie } from '../../models/session'

const wrongCredentialsError = {
  statusCode: 401,
  message: 'Wrong email or password',
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    return createError({
      statusCode: 400,
      message: 'Email and password are required',
    })
  }

  const user = getUserByEmail(email)

  if (!user) {
    return createError(wrongCredentialsError)
  }

  const userHasCorrectPassword = await bcrypt.compare(password, user.password)

  if (!userHasCorrectPassword) {
    return createError(wrongCredentialsError)
  }

  createSessionAndCookie(event, { id: user.id })

  const { password: _, ...userToReturn } = user

  return {
    user: userToReturn,
  }
})
