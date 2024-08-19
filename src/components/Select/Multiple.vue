<script setup>
// Core
import { useModel } from 'vue'
// Components
import { XMarkSolidIcon } from '@/components/Icons'
// Composable
const modelValue = useModel(props, 'modelValue')
// Macros
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  apiUrl: {
    type: String,
    default: null
  },
  apiParams: {
    type: Object,
    default: () => {}
  },
  options: {
    type: Array,
    default: () => []
  },
  optionLabel: {
    type: String,
    default: 'name'
  },
  optionValue: {
    type: [Number, String]
  },
  border: {
    type: Boolean
  },
  placeholder: {
    type: String,
    default: 'create'
  },
  borderColor: {
    type: String
  },
  tokenClass: {
    type: Array,
    default: () => []
  },
  error: {
    type: Object,
    default: () => ({
      $error: false,
      $errors: []
    })
  },
  display: {
    type: String,
    default: 'comma',
    validator(value) {
      return ['comma', 'chip'].includes(value)
    }
  },
  size: {
    type: String,
    default: 'normal',
    validator(value) {
      return ['x-small', 'small', 'normal', 'large'].includes(value)
    }
  },
})
</script>

<template>
  <div class="app-input">
    <base-label :label="props.label" :required="props.required" />

    <base-multi-select
      v-model="modelValue"
      v-bind="props"
      api-url="users"
      :token-class="['chip-hover shadow-button bg-white cursor-pointer']"
    >
      <template #chip="{ value }">
        <div class="flex items-center gap-2">
          <base-avatar
            color="#635AFF"
            shape="circle"
            avatar-classes="w-5 h-5"
          />

          <h1 class="text-xs font-semibold text-primary-900">{{ value.full_name }}</h1>
        </div>
      </template>

      <template #option="{ value }">
        <div class="flex items-center gap-2">
          <base-avatar
            color="#635AFF"
            shape="circle"
            avatar-classes="w-6 h-6"
          />

          <h1 class="text-sm font-medium text-primary-900">{{ value.full_name }}</h1>
        </div>
      </template>

      <template #removetokenicon="{ item }">
        <base-iconify :icon="XMarkSolidIcon" class="!w-4 !h-4 ml-[6px] hover:text-critic-500" />
      </template>
    </base-multi-select>
  </div>
</template>

<style scoped>
</style>
