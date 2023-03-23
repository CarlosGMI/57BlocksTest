<template>
  <ul :class="listClasses">
    <li v-for="(item, index) in menuItems" :key="index">
      <nuxt-link
        @click="$emit('itemClicked')"
        :class="itemClasses"
        :to="item.link"
      >
        {{ item.label }}
      </nuxt-link>
    </li>
    <li>
      <nuxt-link
        @click="$emit('itemClicked')"
        class="btn btn--small btn--secondary"
        :class="buttonClasses"
        to="/login"
      >
        Login
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        {
          label: 'Home',
          link: '/',
        },
        {
          label: 'My Favourites',
          link: '/',
        },
      ],
    }
  },
  props: {
    listClasses: String,
    type: String,
  },
  computed: {
    itemClasses() {
      return this.type === 'mobile' ? 'my-4 inline-block' : ''
    },
    buttonClasses() {
      return this.type === 'mobile'
        ? 'my-8 w-full text-center inline-block'
        : ''
    },
  },
}
</script>
