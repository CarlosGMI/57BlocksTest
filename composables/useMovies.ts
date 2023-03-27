type FavouriteMovie = {
  id: Number
  title: string
  poster_path: string
}

export const useMovies = () => {
  const MOVIES_PER_PAGE = 20
  const { currentUser } = useAuth()
  const currentUserId = currentUser.value?.id || ''
  const favouriteMovies = useState<Array<FavouriteMovie>>(
    'favourites',
    () => []
  )

  const setFavouriteMovies = (movies: Array<FavouriteMovie> | null) => {
    if (!process.server) {
      favouriteMovies.value = movies
        ? movies
        : JSON.parse(localStorage.getItem(currentUserId) || '[]')
    }
  }

  const setFavouriteMovie = (movie: FavouriteMovie) => {
    const newMovies = [...favouriteMovies.value]

    newMovies.push(movie)

    favouriteMovies.value = newMovies
  }

  const handleMoviesFetching = async (
    fetchType: string,
    page: Number = 1,
    searchTerm: string = ''
  ) => {
    let response

    switch (fetchType) {
      case 'index':
        response = await getMovies(page)

        break

      case 'search':
        response = await searchMovie(searchTerm, page)

        break

      default:
        break
    }

    return response
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

  const searchMovie = async (searchTerm: string, page: Number) => {
    const data = await $fetch('/api/movies/search', {
      query: {
        page,
        query: searchTerm,
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

  const getFavouritesPaginationParams = () => {
    return {
      total_pages: Math.ceil(favouriteMovies.value.length / MOVIES_PER_PAGE),
      total_results: favouriteMovies.value.length,
    }
  }

  const paginateFavourites = (page: number) => {
    return favouriteMovies.value.slice(
      (page - 1) * MOVIES_PER_PAGE,
      page * MOVIES_PER_PAGE
    )
  }

  /**
   * Using localStorage for simplicity but it is not a reliable storage since JSON.parse and JSON.stringify are expensive when having big
   * arrays. In a real world scenario the favourites would need to be stored in a database and if that's not possible, I think IndexedDB
   * could be a more reliable store.
   */
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
    handleMoviesFetching,
    getMovie,
    getMoviePosterFromPath,
    setFavouriteMovies,
    handleFavourites,
    findFavouriteById,
    getFavouritesPaginationParams,
    paginateFavourites,
    favouriteMovies,
  }
}
