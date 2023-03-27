<template>
  <div class="movies-list__search mb-6">
    <h2 class="text-center mb-6">Search your movie</h2>
    <form @submit.prevent="onSearchClick">
      <div class="form-group flex flex-col md:flex-row items-center gap-4">
        <input
          v-model="searchTerm"
          type="text"
          id="search"
          name="search"
          placeholder="Search..."
          @input="onInput"
        />
        <button
          v-if="showButton"
          type="submit"
          class="btn btn--primary w-full md:w-auto"
        >
          Search
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['search'])
const searchTerm = ref('')

const onSearchClick = () => {
  emit('search', searchTerm.value)
}
const onInput = () => {
  if (!searchTerm.value) {
    emit('search', '')
  }
}
const searchTermIsOnlyWhiteSpaces = computed(() => {
  return /^\s*$/.test(searchTerm.value)
})
const searchTermIsEmpty = computed(() => {
  return !searchTerm.value || searchTermIsOnlyWhiteSpaces.value
})
const showButton = computed(() => {
  return !searchTermIsEmpty.value && searchTerm.value.length > 3
})
</script>
