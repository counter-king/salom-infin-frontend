<script setup>
// Core
import { ref, useModel } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
// Macros
const props = defineProps({
  modelValue: {
    type: Boolean
  },
  label: {
    type: String,
    default: 'delete-resolutions'
  },
  createButtonFn: {
    type: Function,
    default: () => void 0
  },
  header: {
    type: String,
    default: null
  },
  maxWidth: {
    type: String,
    default: 'max-w-[610px]'
  },
  loading: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue'])
// Composable
const modelValue = useModel(props, 'modelValue')
// Reactive
const text = ref({
  message: null
})
// Non-reactive
const rules = {
  message: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  }
}
// Composable
const $v = useVuelidate(rules, text)
// Methods
const create = async () => {
  const valid = await $v.value.$validate()

  if(!valid) {
    return
  }

  try {
    await props.createButtonFn(text.value.message)
    text.value.message = null
    emit('update:modelValue', false)
  }
  finally {

  }
}
</script>

<template>
  <base-dialog
    v-model="modelValue"
    :label="props.header"
    :max-width="props.maxWidth"
    :draggable="false"
  >
    <template #content>
      <base-textarea
        v-model="$v.message.$model"
        :error="$v.message"
        :max-length="250"
        label="comment"
        placeholder="enter-comment"
      />
    </template>

    <template #footer>
      <base-button
        label="cancel"
        rounded
        outlined
        shadow
        color="text-primary-900"
        border-color="border-transparent"
        @click="modelValue = false"
      />

      <base-button
        :label="props.label"
        :loading="loading"
        rounded
        @click="create"
      />
    </template>
  </base-dialog>
</template>
