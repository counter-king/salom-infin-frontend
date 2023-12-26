<script setup>
// Core
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Calendar from 'primevue/calendar'
// Composable
const { t } = useI18n()
// Macros
const props = defineProps({
  modelValue: {
    type: [String],
    default: ""
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
    default: "enter-reg-number"
  },
  required: {
    type: Boolean
  },
  border: {
    type: Boolean
  },
  borderColor: {
    type: String
  },
  error: {
    type: Object,
    default: () => ({
      $error: false,
      $errors: []
    })
  },
  size: {
    type: String,
    default: 'normal',
    validator(value) {
      return ['x-small', 'small', 'normal', 'large'].includes(value)
    }
  },
})
const emit = defineEmits(['update:modelValue'])
// Computed
const rootClasses = computed(() => {
  return [
    'group w-full rounded-xl overflow-hidden border border-greyscale-50 focus:border-primary-500',
    // Border
    props.borderColor,
    // Validation
    {
      'p-invalid !shadow-none': props.error.$error,
    },
  ]
})
const inputClasses = computed(() => {
  return [
    'bg-greyscale-50 text-sm font-medium text-greyscale-500 rounded-s-xl border-transparent',
    {
      'size-small py-[2px] pr-2 pl-4': props.size === 'x-small',
      'size-small py-[5px] pr-2 pl-4': props.size === 'small',
      'size-normal py-[9px] pr-2 pl-4': props.size === null || props.size === 'normal',
    },
  ]
})
const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value.toISOString().replace(/T.*$/, ''))
  }
})
</script>

<template>
  <div class="app-input">
    <base-label :label="props.label" :required="props.required" />

    <Calendar
      v-model="modelValue"
      :disabled="props.disabled"
      :placeholder="t(props.placeholder)"
      show-icon
      date-format="yy-mm-dd"
      :pt="{
        root: {
          class: rootClasses
        },
        input: {
          class: inputClasses
        },
        dropdownButton: {
          root: {
            class: [
              'bg-greyscale-50 border-greyscale-50 text-gray-2',
              {
                'size-small py-[2px] pr-2 pl-4': props.size === 'x-small',
                'size-small py-[5px] pr-2 pl-4': props.size === 'small',
                'size-normal py-2 pr-2 pl-4': props.size === null || props.size === 'normal',
              },
            ]
          }
        },
        panel: {
          class: '!min-w-[425px]'
        }
      }"
    >
      <template #dropdownicon>
        <base-icon name="CalendarIcon" />
      </template>
    </Calendar>

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

<style>
.p-calendar.p-focus {
  border-color: rgb(99 90 255 / 1);
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 0.2rem #C7D2FE;
}

.p-calendar.p-invalid {
  border-color: #e24c4c !important;
}
</style>
