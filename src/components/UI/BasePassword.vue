<script setup>
// Core
import { useModel } from 'vue'
import { useI18n } from 'vue-i18n'
import Password from 'primevue/password';
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
    default: "enter-reg-number"
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

    <Password
      v-model="modelValue"
      size="small"
      toggleMask
      :placeholder="t(props.placeholder)"
      :pt="{
        root: {
          class: ['w-full rounded-xl bg-greyscale-50 ']
        },
        input: {
          class: [
            'w-full rounded-xl bg-greyscale-50 border-greyscale-50 focus:border-primary-500 placeholder:text-sm placeholder:font-medium',
            {
              'p-invalid !shadow-none': props.error.$error
            }
          ]
        },
        panel: {
          class: ['hidden ']
        }
      }"
    />

    <div class="mt-1">
      <template v-if="props.error.$errors.length">
        <div
          v-for="element of props.error.$errors"
          :key="element.$uid"
        >
          <span class="block text-sm font-medium text-red-500">{{ element.$message }}</span>
        </div>
      </template>
    </div>
  </div>
</template>
