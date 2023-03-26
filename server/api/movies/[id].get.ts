import { useMovies } from '@/composables/useMovies'

export default defineEventHandler(async (event) => {
  const { BASE_URL, apiError } = useMovies()
  const config = useRuntimeConfig()
  const { id } = getQuery(event)

  if (!config.movieDbApiKey) {
    return createError(apiError)
  }

  try {
    const data = await $fetch(`/movie/${id}`, {
      baseURL: BASE_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      query: {
        api_key: config.movieDbApiKey,
      },
    })

    return data
  } catch (error) {
    return createError(apiError)
  }
})
