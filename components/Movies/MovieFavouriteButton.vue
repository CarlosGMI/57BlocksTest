<template>
  <button
    class="mt-3 rounded-[100% hover:text-blue self-end flex items-center justify-center w-[32px] h-[32px] p-0"
    :class="buttonClasses"
    @click.prevent="onButtonClick"
  >
    <IconsHeart strokeColor="#3cdff5" />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const { handleFavourites, findFavouriteById } = useMovies()
const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
})

const buttonClasses = computed(() => {
  const movieIsFavourite = findFavouriteById(props.movie.id)

  return movieIsFavourite ? 'text-blue' : 'text-white'
})

const onButtonClick = () => {
  handleFavourites({
    id: props.movie.id,
    title: props.movie.title,
    poster_path: props.movie.poster_path,
  })
}
</script>
