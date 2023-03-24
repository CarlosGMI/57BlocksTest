<template>
  <nav class="navbar fixed w-full py-6 px-0 bg-white">
    <div class="flex items-center justify-between container">
      <!-- Header logo -->
      <NavbarLogo />

      <!-- Mobile toggle -->
      <div class="md:hidden flex">
        <button class="text-black" @click="drawer">
          <IconsHamburger className="h-8 w-8 fill-current" />
        </button>
      </div>

      <!-- Navbar -->
      <div class="hidden md:block">
        <NavbarNavigation
          list-classes="flex items-center space-x-8 text-regular"
        />
      </div>

      <!-- Dark Background Transition -->
      <transition
        enter-class="opacity-0"
        enter-active-class="ease-out transition-medium"
        enter-to-class="opacity-100"
        leave-class="opacity-100"
        leave-active-class="ease-out transition-medium"
        leave-to-class="opacity-0"
      >
        <div
          @keydown.esc="closeDrawer"
          v-show="isOpen"
          class="z-10 fixed inset-0 transition-opacity"
        >
          <div
            @click="closeDrawer"
            class="absolute inset-0 bg-black opacity-50"
            tabindex="0"
          ></div>
        </div>
      </transition>

      <!-- Drawer Menu -->
      <aside
        class="p-5 transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30"
        :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <div class="close">
          <button class="absolute top-0 right-0 mt-4 mr-4" @click="closeDrawer">
            <IconsClose className="w-6 h-6" />
          </button>
        </div>

        <button
          @click="closeDrawer"
          class="flex w-full items-center p-4 border-b"
        >
          <NavbarLogo />
        </button>

        <NavbarNavigation
          list-classes="divide-y"
          type="mobile"
          @itemClicked="closeDrawer"
        />
      </aside>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    closeDrawer() {
      this.isOpen = false
    },
    drawer() {
      this.isOpen = !this.isOpen
    },
  },
  watch: {
    isOpen: {
      immediate: true,
      handler(isOpen) {
        if (process.client) {
          if (isOpen) {
            document.body.style.setProperty('overflow', 'hidden')
          } else {
            document.body.style.removeProperty('overflow')
          }
        }
      },
    },
  },
}
</script>

<style>
.navbar {
  box-shadow: rgb(25 84 102 / 8%) 2px 4px 12px;
}
</style>
