import { getUserFromSession } from '../models/session'

export default defineEventHandler(async (event) => {
  const currentUser = await getUserFromSession(event)

  if (currentUser) {
    event.context.user = currentUser
  }
})
