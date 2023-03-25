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

onMounted(async () => {
  try {
    if (props.listType === 'favourites') {
      console.log('Fetching favourites...')
    } else {
      const response = await getMovies()
      movies.value = response.results
      totalPages.value = response.total_pages
      totalResults.value = response.total_results
    }
  } catch (error) {
    console.error(error)

    errorMessage.value = error.data.message
  }
})

const onPageUpdated = async (page) => {
  try {
    movies.value = null

    if (props.listType === 'favourites') {
      console.log('Fetching favourites...')
    } else {
      const response = await getMovies(page)
      movies.value = response.results
      totalPages.value = response.total_pages
      totalResults.value = response.total_results
    }
  } catch (error) {
    console.error(error)

    errorMessage.value = error.data.message
  }
}
</script>
