<template>
  <div class="container py-10">
    <h1 class="highlight">My Favourites</h1>
    <MoviesList class="mt-6" list-type="favourites" />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['authenticated'],
})
</script>
