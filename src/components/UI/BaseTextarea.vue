<script setup>
// Core
import { useModel } from 'vue'
import { useI18n } from 'vue-i18n'
import Textarea from 'primevue/textarea'
// Components
import { ModalShortDescription } from '@/components/Modal'
// Macros
const props = defineProps({
  modelValue: {
    type: [String],
  },
  disabled: {
    type: Boolean
  },
  label: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: "enter-content"
  },
  rows: {
    type: [Number, String],
    default: 5
  },
  required: {
    type: Boolean
  },
  loading: {
    type: Boolean
  },
  rootClass: {
    type: String
  },
  error: {
    type: Object,
    default: () => ({
      $error: false,
      $errors: []
    })
  },
  setFromTemplate: {
    type: Boolean
  }
})
// Composable
const modelValue = useModel(props, 'modelValue')
const { t } = useI18n()
</script>

<template>
  <div class="app-input">
    <base-label :label="props.label" :required="props.required" />

    <div class="relative">
      <Textarea
        v-model="modelValue"
        :disabled="props.disabled"
        :rows="props.rows"
        cols="30"
        :placeholder="t(props.placeholder)"
        auto-resize
        :pt="{
          root: {
            class: [
              'flex w-full text-greyscale-900 rounded-xl bg-greyscale-50 text-sm border-greyscale-50 focus:border-primary-500 placeholder:text-sm placeholder:font-regular placeholder:text-greyscale-400',
              props.rootClass,
              {
                'p-invalid !shadow-none': props.error.$error
              }
            ]
          }
        }"
      />

      <div class="flex items-center gap-3 absolute top-[10px] right-[10px]">
        <template v-if="props.loading">
          <base-spinner root-classes="!w-6 !h-6" />
        </template>

        <slot name="append" />
      </div>
    </div>

    <template v-if="props.error.$errors.length">
      <div class="space-y-1 mt-1">
        <div
          v-for="element of props.error.$errors"
          :key="element.$uid"
        >
          <span class="block text-sm font-medium text-red-500">{{ element.$message }}</span>
        </div>
      </div>
    </template>

    <template v-if="props.setFromTemplate">
      <modal-short-description @emit:selected="(value) => modelValue = value" />
    </template>
  </div>
</template>
