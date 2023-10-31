<script setup>
// Core
import { useModel } from 'vue'
import { useI18n } from 'vue-i18n'
import Textarea from 'primevue/textarea'
// Macros
const props = defineProps({
  modelValue: {
    type: [String],
  },
  label: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: "enter-content"
  },
  errorClass: {
    type: [String, Boolean ],
  }
})
// Composable
const modelValue = useModel(props, 'modelValue')
const { t } = useI18n()
</script>

<template>
  <div class="app-input">
    <base-label :label="props.label" />

    <Textarea
      v-model="modelValue"
      autoResize
      rows="5"
      cols="30"
      :placeholder="t(props.placeholder)"
      :pt="{
        root: {
          class: [
            'w-full rounded-xl bg-greyscale-50 text-sm',
            {
              'p-invalid': props.errorClass,
              'border-transparent': !props.errorClass,
            }
          ]
        }
      }"
    />
  </div>
</template>
