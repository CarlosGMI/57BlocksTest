<template>
  <section class="movies-list">
    <MoviesSearchInput
      v-if="listType !== 'favourites'"
      @search="onMovieSearch"
    />
    <MoviesGrid :movies="moviesList">
      <template v-if="errorMessage" #error>
        <p class="text-red text-center mb-5">{{ errorMessage }}</p>
      </template>
      <template v-if="noResults" #error>
        <p class="text-center mb-5">{{ emptyMessage }}</p>
      </template>
    </MoviesGrid>
    <Pagination
      v-if="showPagination"
      :total-pages="totalPages"
      :total="totalResults"
      @pageUpdated="onPageUpdated"
    />
  </section>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'

const props = defineProps({
  listType: String,
})
const {
  handleMoviesFetching,
  setFavouriteMovies,
  getFavouritesPaginationParams,
  paginateFavourites,
} = useMovies()
let movies = reactive({
  list: [],
})
const errorMessage = ref(null)
const totalPages = ref(1)
const totalResults = ref(1)
const currentPage = ref(1)
const loading = ref(false)
const searchTerm = ref('')

const setListParams = (response) => {
  movies.list = response.results ? response.results : []
  totalPages.value = response.total_pages
  totalResults.value = response.total_results
}

const setFavouritesPagination = () => {
  const pagination = getFavouritesPaginationParams()

  setListParams(pagination)
}

const fetchMovies = async (page = 1, fetchType = 'index', searchTerm = '') => {
  try {
    loading.value = true
    movies.list = []

    if (props.listType === 'favourites') {
      setFavouritesPagination()
    } else {
      const response = await handleMoviesFetching(fetchType, page, searchTerm)

      setListParams(response)
    }
  } catch (error) {
    console.error(error)

    errorMessage.value = error.data.message
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  fetchMovies()
  setFavouriteMovies()
})

const onPageUpdated = async (page) => {
  currentPage.value = page

  if (searchTerm.value) {
    fetchMovies(page, 'search', searchTerm.value)
  } else {
    fetchMovies(page)
  }
}

const onMovieSearch = async (term) => {
  searchTerm.value = term

  if (term) {
    fetchMovies(1, 'search', term)
  } else {
    fetchMovies()
  }
}

const moviesList = computed(() => {
  return props.listType === 'favourites'
    ? paginateFavourites(currentPage.value)
    : movies.list
})
const emptyMessage = computed(() => {
  return props.listType === 'favourites'
    ? 'There are no favourite movies on your list'
    : 'Sorry, there are no movies available'
})
const noResults = computed(() => {
  return !loading.value && !moviesList.value.length
})
const showPagination = computed(() => {
  if (loading.value) {
    return true
  }

  return moviesList.value.length
})

watch(moviesList, () => {
  if (props.listType === 'favourites') {
    setFavouritesPagination()
  }
})
</script>
