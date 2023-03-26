export default defineEventHandler(async (event) => {
  const currentUser = event.context.user

  if (!currentUser) {
    return {
      user: null,
    }
  }

  const { password: _, ...userToReturn } = currentUser

  return {
    user: userToReturn,
  }
})
