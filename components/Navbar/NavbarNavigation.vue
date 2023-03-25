<template>
  <ul :class="listClasses">
    <li v-for="(item, index) in allowedMenuItems" :key="index">
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
        @click="handleLoginButton"
        class="btn btn--small btn--secondary"
        :class="buttonClasses"
        to="/login"
      >
        {{ buttonText }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script setup>
import { computed } from 'vue'

const emit = defineEmits(['itemClicked'])
const { currentUser } = useAuth()
const props = defineProps({
  listClasses: String,
  type: String,
})
const menuItems = [
  {
    label: 'Home',
    link: '/',
    needAuth: true,
  },
  {
    label: 'My Favourites',
    link: '/',
    needAuth: true,
  },
]
const itemClasses = computed(() => {
  return props.type === 'mobile' ? 'my-4 inline-block' : ''
})
const buttonClasses = computed(() => {
  return props.type === 'mobile' ? 'my-8 w-full text-center inline-block' : ''
})
// If user is logged in return all elements. If not, return only the ones that do not need authentication
const allowedMenuItems = computed(() => {
  return menuItems.filter((item) => (currentUser.value ? true : !item.needAuth))
})
const buttonText = computed(() => {
  return currentUser.value ? 'Logout' : 'Login'
})
const handleLoginButton = async () => {
  if (currentUser.value) {
    console.log('Logging out...')
  }

  emit('itemClicked')
  await navigateTo('/login')
}
</script>
