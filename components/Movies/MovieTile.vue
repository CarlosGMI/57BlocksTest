<template>
  <a :href="`/movies/${movie.id}`">
    <div class="movie-tile flex flex-col rounded-2xl p-4 h-full tile-shadow">
      <figure class="movie-tile__poster">
        <nuxt-img
          class="w-full md:max-h-[320px] object-cover aspect-[265/320]"
          :src="posterUrl"
          height="320"
          loading="lazy"
        />
      </figure>
      <div
        class="movie-tile__details grid grid-rows-[max-content_1fr] h-full mt-3"
      >
        <p>{{ movie.title }}</p>
        <MovieFavouriteButton :movie="movie" />
      </div>
    </div>
  </a>
</template>

<script setup>
import { computed } from 'vue'
import MovieFavouriteButton from './MovieFavouriteButton.vue'

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
})
const { getMoviePosterFromPath } = useMovies()
const posterUrl = computed(() => {
  return getMoviePosterFromPath(props.movie.poster_path)
})
</script>
