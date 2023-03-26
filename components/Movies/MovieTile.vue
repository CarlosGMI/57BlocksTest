<template>
  <nuxt-link :to="`/movies/${movie.id}`">
    <div class="movie-tile flex flex-col rounded-2xl p-4 h-full tile-shadow">
      <figure class="movie-tile__poster">
        <nuxt-img
          class="w-full md:max-h-[320px] object-cover"
          :src="posterUrl"
          height="320"
          loading="lazy"
        />
      </figure>
      <div
        class="movie-tile__details grid grid-rows-[max-content_1fr] h-full mt-3"
      >
        <p>{{ movie.original_title }}</p>
        <button
          class="mt-3 rounded-[100%] text-white hover:text-blue self-end flex items-center justify-center w-[32px] h-[32px] p-0"
        >
          <IconsHeart strokeColor="#3cdff5" />
        </button>
      </div>
    </div>
  </nuxt-link>
</template>

<script setup>
import { computed } from 'vue'

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
