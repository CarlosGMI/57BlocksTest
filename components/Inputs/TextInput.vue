<template>
  <div class="form-group">
    <input
      v-model="value"
      :class="inputClasses"
      :placeholder="placeholder"
      :type="type"
      :name="name"
      :id="id"
      :autocomplete="autocomplete"
      :aria-required="isRequired ? 'true' : 'false'"
    />

    <label :for="id" class="sr-only">{{ placeholder }}</label>
    <span class="mt-2 inline-block text-regular text-red" :name="name">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
  placeholder: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  name: String,
  value: String,
  id: {
    type: String,
    required: true,
  },
  autocomplete: {
    type: String,
    default: 'off',
    required: false,
  },
  isRequired: {
    type: Boolean,
    default: true,
  },
})

const isEmail = (email) => {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

  return regex.test(email)
}

const validateInput = (value) => {
  if (!value && props.isRequired) {
    return 'This field is required'
  }

  if (props.type === 'email' && !isEmail(value)) {
    return 'This field must be a valid email'
  }

  return true
}

const { errorMessage, value } = useField(props.name, validateInput)

const inputClasses = computed(() => {
  return errorMessage.value ? 'invalid' : ''
})
</script>
