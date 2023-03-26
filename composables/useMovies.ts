export const useMovies = () => {
  const BASE_URL = 'https://api.themoviedb.org/3'
  const apiError = {
    statusCode: 500,
    message: 'Sorry, an error has occurred',
  }

  const getMovies = async (page: Number = 1) => {
    const data = await $fetch('/api/movies', {
      query: {
        page,
      },
    })

    return data
  }

  const getMovie = async (id: Number) => {
    const data = await $fetch(`/api/movies/${id}`, {
      query: {
        id,
      },
    })

    return data
  }

  const getMoviePosterFromPath = (path: String, size: String = 'w400') => {
    return `https://image.tmdb.org/t/p/${size}${path}`
  }

  return { getMovies, getMovie, getMoviePosterFromPath, BASE_URL, apiError }
}
