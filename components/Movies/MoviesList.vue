<template>
  <section class="movies-list">
    <MoviesGrid :movies="movies">
      <template v-if="errorMessage" #error>
        <p class="text-red text-center mb-5">{{ errorMessage }}</p>
      </template>
    </MoviesGrid>
    <Pagination
      :total-pages="totalPages"
      :total="totalResults"
      @pageUpdated="onPageUpdated"
    />
  </section>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  listType: String,
})
const { getMovies } = useMovies()
const movies = ref(null)
const errorMessage = ref(null)
const totalPages = ref(1)
const totalResults = ref(1)

const setListParams = (response) => {
  movies.value = response.results
  totalPages.value = response.total_pages
  totalResults.value = response.total_results
}

const fetchMovies = async (page = 1) => {
  try {
    movies.value = null

    if (props.listType === 'favourites') {
      console.log('Fetching favourites...')
    } else {
      const response = await getMovies(page)

      setListParams(response)
    }
  } catch (error) {
    console.error(error)

    errorMessage.value = error.data.message
  }
}

onMounted(async () => {
  fetchMovies()
})

const onPageUpdated = async (page) => {
  fetchMovies(page)
}
</script>
