<script setup>
// Core
import { useModel, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Calendar from 'primevue/calendar'
// Composable
const modelValue = useModel(props, 'modelValue')
const { t } = useI18n()
// Macros
const props = defineProps({
  modelValue: {
    type: String,
    default: null
  },
  label: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: "enter-reg-number"
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
    'group w-full rounded-xl overflow-hidden border border-transparent hover:border-primary-500',
    // Border
    props.borderColor,
    {
      'border-transparent': !props.border
    },
  ]
})
const inputClasses = computed(() => {
  return [
    'bg-greyscale-50 text-sm font-medium text-greyscale-500 rounded-s-xl border-transparent',
    {
      'size-small py-[2px] pr-2 pl-4': props.size === 'x-small',
      'size-small py-[5px] pr-2 pl-4': props.size === 'small',
      'size-normal py-3 pr-2 pl-4': props.size === null || props.size === 'normal',
    },
  ]
})
</script>

<template>
  <div class="app-input">
    <base-label :label="props.label" />

    <Calendar
      v-model="modelValue"
      :placeholder="t(props.placeholder)"
      show-icon
      :pt="{
        root: {
          class: rootClasses
        },
        input: {
          class: inputClasses
        },
        dropdownButton: {
          root: {
            class: ['bg-greyscale-50 border-greyscale-50 text-gray-2']
          }
        }
      }"
    >
      <template #dropdownicon>
        <base-icon name="CalendarIcon" />
      </template>
    </Calendar>
  </div>
</template>
