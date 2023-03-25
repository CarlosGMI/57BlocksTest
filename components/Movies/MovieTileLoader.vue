<template>
  <div class="movie-tile--loader h-[400px]"></div>
</template>

<style>
.movie-tile--loader {
  animation: hintloading 2s ease-in-out 0s infinite reverse;
  background: #c4c4c4;
  transform: translateZ(0);
}

@keyframes hintloading {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}
</style>
