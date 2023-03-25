<template>
  <div class="container pt-10">
    <MoviesList />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['authenticated'],
})
</script>
