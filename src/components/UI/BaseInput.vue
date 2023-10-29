<script setup>
// Core
import { useModel } from 'vue'
import { useI18n } from 'vue-i18n'
import InputText from 'primevue/inputtext'
// Macros
const props = defineProps({
  modelValue: {
    type: Boolean
  },
  label: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: "enter-reg-number"
  }
})
// Composable
const modelValue = useModel(props, 'modelValue')
const { t } = useI18n()
</script>

<template>
  <div class="app-input">
    <base-label :label="props.label" />

    <InputText
      v-model="modelValue"
      type="text"
      size="small"
      :placeholder="t(props.placeholder)"
      :pt="{
        root: {
          class: ['w-full rounded-xl bg-greyscale-50 border-transparent']
        }
      }"
    />
  </div>
</template>
