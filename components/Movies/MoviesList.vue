<template>
  <section class="movies-list">
    <MoviesGrid :movies="movies">
      <template v-if="errorMessage" #error>
        <p class="text-red text-center mb-5">{{ errorMessage }}</p>
      </template>
    </MoviesGrid>
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

onMounted(async () => {
  try {
    if (props.listType === 'favourites') {
      console.log('Fetching favourites...')
    } else {
      const response = await getMovies()
      movies.value = response.results
      console.log(movies.value)
    }
  } catch (error) {
    console.error(error)

    errorMessage.value = error.data.message
  }
})
</script>
