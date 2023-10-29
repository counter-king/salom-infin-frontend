<script setup>
// Core
import { useModel, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Dropdown from 'primevue/dropdown'
// Composable
const modelValue = useModel(props, 'modelValue')
const { t } = useI18n()
// Macros
const props = defineProps({
  modelValue: {
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
  label: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: 'choose-one'
  },
  borderColor: {
    type: String
  },
  size: {
    type: String,
    default: 'normal',
    validator(value) {
      return ['x-small', 'small', 'normal', 'large'].includes(value)
    }
  },
})
// Computed
const rootClasses = computed(() => {
  return [
    'group w-full bg-greyscale-50 rounded-xl hover:border-primary-500',
    // Border
    props.borderColor,
    {
      'border-transparent': !props.border
    },
    // Size
    {
      'size-small': props.size === 'small',
      'size-normal': props.size === null || props.size === 'normal',
    },
  ]
})
</script>

<template>
  <div class="app-input">
    <base-label :label="props.label" />

    <Dropdown
      v-model="modelValue"
      :options="props.options"
      :optionLabel="props.optionLabel"
      :placeholder="t(props.placeholder)"
      :pt="{
        root: {
          class: rootClasses
        },
        input: {
          class: [
            'text-sm font-medium text-greyscale-500',
            {
              'size-small py-[2px] pr-2 pl-4': props.size === 'x-small',
              'size-small py-[5px] pr-2 pl-4': props.size === 'small',
              'size-normal py-3 pr-2 pl-4': props.size === null || props.size === 'normal',
            },
          ]
        },
        panel: {
          class: ['translate-y-[8px] shadow-menu rounded-2xl overflow-hidden']
        },
        list: {
          class: ['py-0']
        },
        item: {
          class: ['py-[6px] px-3 text-sm font-medium text-primary-900 transition-all hover:bg-greyscale-50']
        },
        option: {
          class: ['text-sm font-medium text-primary-900']
        }
      }"
    />
  </div>
</template>
