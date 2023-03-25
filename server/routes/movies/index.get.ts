export default defineEventHandler(async (event) => {
  const BASE_URL = 'https://api.themoviedb.org/3'
  const config = useRuntimeConfig()
  const { page } = getQuery(event)

  const apiError = {
    statusCode: 500,
    message: 'Sorry, an error has occurred',
  }

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
