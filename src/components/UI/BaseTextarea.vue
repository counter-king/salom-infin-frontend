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
  required: {
    type: Boolean
  },
  error: {
    type: Object,
    default: () => ({
      $error: false,
      $errors: []
    })
  }
})
// Composable
const modelValue = useModel(props, 'modelValue')
const { t } = useI18n()
</script>

<template>
  <div class="app-input">
    <base-label :label="props.label" :required="props.required" />

    <Textarea
      v-model="modelValue"
      autoResize
      rows="5"
      cols="30"
      :placeholder="t(props.placeholder)"
      :pt="{
        root: {
          class: [
            'w-full rounded-xl bg-greyscale-50 text-sm border-greyscale-50 focus:border-primary-500',
            {
              'p-invalid !shadow-none': props.error.$error
            }
          ]
        }
      }"
    />

    <template v-if="props.error.$errors.length">
      <div
        v-for="element of props.error.$errors"
        :key="element.$uid"
        class="mt-1"
      >
        <span class="block text-sm font-medium text-red-500">{{ element.$message }}</span>
      </div>
    </template>
  </div>
</template>
