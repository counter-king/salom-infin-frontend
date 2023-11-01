<script setup>
// Core
import { useModel } from 'vue'
import { useI18n } from 'vue-i18n'
import InputText from 'primevue/inputtext'
// Macros
const props = defineProps({
  modelValue: {
    type: [Number, String],
  },
  label: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: "enter-reg-number"
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

    <InputText
      v-model="modelValue"
      type="text"
      size="small"
      :placeholder="t(props.placeholder)"
      :pt="{
        root: {
          class: [
            'w-full rounded-xl bg-greyscale-50 ',
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
