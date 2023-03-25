<template>
  <div class="pagination flex justify-center mt-10">
    <ul class="list-none flex gap-2 bg-white py-2 px-5 rounded-2xl">
      <li class="mr-4">
        <button
          type="button"
          class="hover:bg-blue px-2 rounded-3xl"
          :class="buttonClasses('first')"
          aria-label="Go to first page"
          :disabled="isInFirstPage"
          @click="onFirstPageClicked"
        >
          First
        </button>
      </li>
      <li v-for="(page, index) in pages" :key="index">
        <button
          type="button"
          class="px-2 rounded-[100%] hover:bg-blue min-w-[26px] min-h-[26px]"
          :class="pageClasses(page.name)"
          :disabled="page.isDisabled"
          :aria-label="`Go to page number ${page.name}`"
          @click="onPageClicked(page.name)"
        >
          {{ page.name }}
        </button>
      </li>
      <li class="ml-4">
        <button
          type="button"
          class="hover:bg-blue px-2 rounded-3xl"
          :class="buttonClasses('last')"
          aria-label="Go to last page"
          :disabled="isInLastPage"
          @click="onLastPageClicked"
        >
          Last
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const visibleButtons = 3
const emit = defineEmits(['pageUpdated'])
const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  perPage: {
    type: Number,
    default: 20,
  },
})
const currentPage = ref(1)

const startPage = computed(() => {
  if (currentPage.value === 1) {
    return 1
  }

  if (currentPage.value === props.totalPages) {
    return props.totalPages - visibleButtons + 1
  }

  return currentPage.value - 1
})
const endPage = computed(() => {
  return Math.min(startPage.value + visibleButtons - 1, props.totalPages)
})
const pages = computed(() => {
  const range = []

  for (let i = startPage.value; i <= endPage.value; i++) {
    range.push({
      name: i,
      isDisabled: i === currentPage.value,
    })
  }

  return range
})
const isInFirstPage = computed(() => {
  return currentPage.value === 1
})
const isInLastPage = computed(() => {
  return currentPage.value === props.totalPages
})
const buttonClasses = (type) => {
  const classes = 'bg-grey hover:bg-grey text-[darkgray]'

  if (type === 'first') {
    return isInFirstPage.value ? classes : ''
  }

  return isInLastPage.value ? classes : ''
}
const onPageClicked = (page) => {
  currentPage.value = page

  emit('pageUpdated', page)
}
const onFirstPageClicked = () => {
  currentPage.value = 1

  emit('pageUpdated', 1)
}
const onLastPageClicked = () => {
  currentPage.value = props.totalPages

  emit('pageUpdated', props.totalPages)
}
const isPageActive = (page) => {
  return currentPage.value === page
}
const pageClasses = (page) => {
  return isPageActive(page) ? 'bg-blue' : ''
}
</script>

<style scoped>
ul {
  box-shadow: 0 6.22478px 18.6744px rgb(25 84 102 / 8%);
}
</style>
