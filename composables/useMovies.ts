export const useMovies = () => {
  const getMovies = async (page: Number = 1) => {
    const data = await $fetch('/movies', {
      query: {
        page,
      },
    })

    return data
  }

  return { getMovies }
}
