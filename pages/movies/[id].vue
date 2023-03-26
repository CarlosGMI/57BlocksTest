<template>
  <LoaderSpinner v-if="loading" />
  <section v-else class="container movie-details py-10">
    <div v-if="errorMessage" class="movie-details__error">
      <p class="text-regular text-red text-center">{{ errorMessage }}</p>
    </div>
    <div
      v-else
      class="movie-details__main flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-4 bg-white rounded-2xl tile-shadow p-4"
    >
      <div class="movie-details__content md:max-w-[60%]">
        <h1 class="mb-4 highlight">{{ movie.title }}</h1>
        <p class="text-xl">{{ movie.overview }}</p>
        <p class="mt-4">
          <span class="font-bold">Reviews: </span>{{ movie.vote_average }} from
          {{ movie.vote_count }} votes
        </p>
        <p class="mt-4">
          <span class="font-bold">Genres: </span>{{ movieGenres }}
        </p>
        <MovieFavouriteButton :movie="movie" />
      </div>
      <div class="movie-details__poster mb-6 md:mb-0">
        <nuxt-img
          class="md:w-full max-h-[600px]"
          :src="posterUrl"
          loading="lazy"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import MovieFavouriteButton from '@/components/Movies/MovieFavouriteButton.vue'
import { ref, computed } from 'vue'
const { getMovie, getMoviePosterFromPath } = useMovies()
const route = useRoute()
const movieId = route.params.id
const movie = ref(null)
const loading = ref(true)
const errorMessage = ref(null)

definePageMeta({
  middleware: ['authenticated'],
  pageTransition: {
    name: 'rotate',
  },
})

onMounted(async () => {
  try {
    const currentMovie = await getMovie(movieId)
    movie.value = currentMovie
  } catch (error) {
    console.error(error)

    errorMessage.value = error.data.message
  } finally {
    loading.value = false
  }
})

const posterUrl = computed(() => {
  return getMoviePosterFromPath(movie.value.poster_path, 'w500')
})
const movieGenres = computed(() => {
  return movie.value.genres.map((genre) => genre.name).join(', ')
})
</script>
