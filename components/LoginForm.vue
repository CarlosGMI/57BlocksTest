<template>
  <div class="max-w-[470px] mx-auto mt-6">
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
  </div>
</template>

<script setup>
import TextInput from './Inputs/TextInput.vue'
import { useForm } from 'vee-validate'

const { handleSubmit } = useForm()

const onSubmit = handleSubmit(async (values) => {
  console.log(values)
})
</script>
