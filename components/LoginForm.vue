<template>
  <div class="max-w-[470px] mx-auto mt-6">
    <p v-if="errorMessage" class="text-regular text-red">{{ errorMessage }}</p>
    <form @submit="onSubmit" class="login__form" novalidate>
      <TextInput id="email" name="email" placeholder="Email" type="email" />
      <TextInput
        id="password"
        name="password"
        placeholder="Password"
        type="password"
      />
      <button type="submit" class="btn btn--primary w-full mt-[60px]">
        Login
      </button>
    </form>
    <p>{{ currentUser }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TextInput from './Inputs/TextInput.vue'
import { useForm } from 'vee-validate'

const { handleSubmit } = useForm()
const { login, currentUser } = useAuth()
const errorMessage = ref(null)

const onSubmit = handleSubmit(async (values) => {
  try {
    errorMessage.value = null

    await login(values.email, values.password)
  } catch (error) {
    errorMessage.value = error.data.message

    console.error(error)
  }
})
</script>
