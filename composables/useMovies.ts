type FavouriteMovie = {
  id: Number
  title: string
  poster_path: string
}

export const useMovies = () => {
  const { currentUser } = useAuth()
  const currentUserId = currentUser.value?.id || ''
  const favouriteMovies = useState<Array<FavouriteMovie>>('favourites', () => {
    if (process.server) {
      return
    }

    return JSON.parse(localStorage.getItem(currentUser.value?.id || '') || '[]')
  })

  const setFavouriteMovie = (movie: FavouriteMovie) => {
    favouriteMovies.value.push(movie)
  }

  const setFavouriteMovies = (movies: Array<FavouriteMovie>) => {
    favouriteMovies.value = movies
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

  const findFavouriteById = (id: Number) => {
    return favouriteMovies.value.find(
      (favourite: FavouriteMovie) => favourite.id === id
    )
  }

  const handleFavourites = (movie: FavouriteMovie) => {
    if (!favouriteMovies.value.length) {
      setFavouriteMovie(movie)
      localStorage.setItem(currentUserId, JSON.stringify([movie]))
    } else {
      const existingFavourite = findFavouriteById(movie.id)

      if (existingFavourite) {
        const newFavourites = favouriteMovies.value.filter(
          (favourite: FavouriteMovie) => favourite.id !== movie.id
        )

        setFavouriteMovies(newFavourites)
        localStorage.setItem(currentUserId, JSON.stringify(newFavourites))
      } else {
        setFavouriteMovie(movie)
        localStorage.setItem(
          currentUserId,
          JSON.stringify(favouriteMovies.value)
        )
      }
    }
  }

  return {
    getMovies,
    getMovie,
    getMoviePosterFromPath,
    handleFavourites,
    findFavouriteById,
    favouriteMovies,
  }
}
