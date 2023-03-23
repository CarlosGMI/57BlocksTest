import Navbar from '~~/components/Navbar.vue';

<template>
  <header class="pt-70px">
    <Navbar ref="navbar" />
  </header>
  <div class="page-wrapper pt-[87px]">
    <slot />
  </div>
</template>
