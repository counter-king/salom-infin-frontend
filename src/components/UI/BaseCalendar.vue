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
    type: [String, Date],
    default: ""
  },
  inline: {
    type: Boolean
  },
  minDate: {
    type: Date
  },
  maxDate: {
    type: Date
  },
  view: {
    type: String,
    default: 'date',
    validator(value) {
      return ['date', 'month', 'year'].includes(value)
    }
  },
  dateFormat: {
    type: String,
    default: 'yy-mm-dd'
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
const emit = defineEmits(['update:modelValue', 'emit:month-change', 'emit:day-select'])
// Computed
const rootClasses = computed(() => {
  return [
    'group w-full rounded-xl overflow-hidden focus:border-primary-500',
    { 'border border-greyscale-50': !props.inline },
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
    'bg-greyscale-50 text-sm font-medium text-greyscale-900 rounded-s-xl border-transparent',
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
    emit('update:modelValue', value)
  }
})
// Methods
const monthChange = ({ month, year }) => {
  emit('emit:month-change', { day: 1, month: month - 1, year })
}
const daySelect = (value) => {
  emit('emit:day-select', value)
}
</script>

<template>
  <div class="app-input">
    <base-label :label="props.label" :required="props.required" />

    <Calendar
      v-model="modelValue"
      :inline="props.inline"
      :min-date="props.minDate"
      :max-date="props.maxDate"
      :view="props.view"
      :disabled="props.disabled"
      :placeholder="t(props.placeholder)"
      :date-format="props.dateFormat"
      show-icon
      @month-change="monthChange"
      @date-select="daySelect"
      :pt="{
        root: {
          class: rootClasses
        },
        input: {
          class: [inputClasses, 'placeholder:font-regular placeholder:text-greyscale-400']
        },
        dropdownButton: {
          root: {
            class: [
              'bg-greyscale-50 border-greyscale-50 text-gray-2',
              { 'hidden': props.inline },
              {
                'size-small py-[2px] pr-2 pl-4': props.size === 'x-small',
                'size-small py-[5px] pr-2 pl-4': props.size === 'small',
                'size-normal py-2 pr-2 pl-4': props.size === null || props.size === 'normal',
              },
            ]
          }
        },
        panel: {
          class: [
            { 'shadow-calendar !w-[288px] !min-w-[288px] !h-[288px] translate-y-2 border border-solid border-greyscale-200 ': !props.inline },
            { 'border-none border-0': props.inline },
            'rounded-xl p-0'
          ]
        },
        groupContainer: {
          class: [
            { '!w-[288px] p-4': !props.inline },
          ]
        },
        group: {
          class: '!w-full !h-full'
        },
        previousButton: {
          class: 'w-5 h-5'
        },
        previousIcon: {
          class: 'w-3 h-3'
        },
        nextButton: {
          class: 'w-5 h-5'
        },
        nextIcon: {
          class: 'w-3 h-3'
        },
        monthTitle: {
          class: 'text-sm text-primary-900 hover:text-primary-500'
        },
        yearTitle: {
          class: 'text-sm text-primary-900 hover:text-primary-500'
        },
        header: {
          class: 'bg-greyscale-50 border-0 rounded-lg py-0 mb-1'
        },
        container: { class: ['w-full'] },
        table: {
          class: 'w-full border-separate border-spacing-y-1 m-0'
        },
        tableHeader: { class: ['w-full'] },
        tableHeaderRow: { class: ['w-full'] },
        weekLabel: { class: ['text-xs'] },
        weekday: {
          class: 'text-xs font-medium text-greyscale-300'
        },
        tableHeaderCell: {
          class: 'w-8 h-8 border-b !rounded-none p-0 m-0'
        },
        day: { class: ['p-0'] },
        dayLabel: ({ context }) => (
          {
            class: [
              'w-8 h-8 text-xs font-medium text-primary-900',
              { 'font-semibold bg-primary-500 text-white' : context.selected }
            ]
          }
        )
      }"
    >
      <template #dropdownicon>
        <base-iconify icon="solar:calendar-linear" class="!w-5 !h-5" />
      </template>
    </Calendar>

    <template v-if="props.error.$errors.length">
      <div class="space-y-1 mt-2">
        <div
          v-for="element of props.error.$errors"
          :key="element.$uid"
        >
          <span class="block text-sm font-medium text-red-500">{{ element.$message }}</span>
        </div>
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
