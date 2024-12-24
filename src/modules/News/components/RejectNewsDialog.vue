<script setup>
// Core
import { onMounted, ref, useModel } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
// Macros
const props = defineProps({
  modelValue: {
    type: Boolean
  },
  createButtonFn: {
    type: Function,
  },
  onCancelModal:{
    type: Function,
    default: () => void 0
  },
  maxWidth: {
    type: String,
    default: 'max-w-[610px]'
  },
  loading: {
    type: Boolean,
    default: false
  },
  headerLable: {
    type: String
  },
  disabled : {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'reject-reason',
    validator: (value) => {
      return ['show-reason', 'reject-reason'].includes(value)
    }
  },
  value: {
    type: String,
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

onMounted(() => { 
  if(!!props.value){    
    text.value.message = props.value
  }
})
</script>

<template>
  <base-dialog
    v-model="modelValue"
    :label="props.headerLable"
    :max-width="props.maxWidth"
    :draggable="false"
    :content-classes="props.type === 'show-reason' ? 'pt-6 pb-[78px]' : 'pt-6'"

  >
    <template #content>
      <base-textarea
        v-model="$v.message.$model"
        :error="$v.message"
        :max-length="250"
        :disabled="props.type === 'show-reason' && props.disabled"
        :label="props.type === 'show-reason' ? 'reason' : 'reject-news-reason'"
        placeholder="enter-reject-news-reason"
      />
    </template>

    <template #footer v-if="props.type === 'reject-reason'">
      <base-button
        :loading="props.loading"
        label="refuse"
        rounded
        outlined
        shadow
        color="!text-critic-500"
        border-color="border-transparent"
        @click="create"
      />
    </template>
  </base-dialog>
</template>
