import { ClientUser } from '@/server/types/user'

export const useAuth = () => {
  const currentUser = useState<ClientUser | null>('currentUser', () => null)

  const setCurrentUser = (user: ClientUser) => {
    currentUser.value = user
  }

  const login = async (email: string, password: string) => {
    const data = await $fetch('/auth/login', {
      method: 'POST',
      body: {
        email,
        password,
      },
    })

    setCurrentUser(data.user)

    return currentUser
  }

  const me = async () => {
    const user = currentUser

    if (!user.value) {
      const data = await $fetch('/auth/me', {
        headers: useRequestHeaders(['cookie']) as HeadersInit,
      })

      if (data.user) {
        setCurrentUser(data.user)
      }
    }

    return currentUser
  }

  return { login, me, currentUser }
}
