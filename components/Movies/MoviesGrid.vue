<template>
  <div class="movies-grid-wrapper">
    <slot name="error"></slot>
    <div
      v-if="!$slots.error"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5"
    >
      <template v-if="!movies">
        <MovieTileLoader v-for="i in 8" :key="i" />
      </template>
      <template v-else>
        <MovieTile
          v-for="(movie, index) in movies"
          :key="index"
          :movie="movie"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import MovieTileLoader from './MovieTileLoader.vue'
import MovieTile from './MovieTile.vue'

const props = defineProps({
  movies: {
    type: [Array, null],
    required: true,
  },
})
</script>
