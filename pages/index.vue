<template>
  <div class="container py-10">
    <MoviesList />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['authenticated'],
})
</script>
