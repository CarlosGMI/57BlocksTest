export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const { currentUser } = useAuth()

  if (!currentUser.value) {
    return navigateTo('/login')
  }
})
