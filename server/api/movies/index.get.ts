import { BASE_URL, apiError } from '../../utils/consts'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { page } = getQuery(event)

  if (!config.movieDbApiKey) {
    return createError(apiError)
  }

  try {
    const data = await $fetch('/movie/popular', {
      baseURL: BASE_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      query: {
        api_key: config.movieDbApiKey,
        page,
      },
    })

    return data
  } catch (error) {
    return createError(apiError)
  }
})
