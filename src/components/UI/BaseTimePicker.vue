<script setup>
// Core
import { useModel } from "vue"
import { useI18n } from "vue-i18n"
// Components
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ClockCircleLinearIcon } from "@/components/Icons"

// Props
const props = defineProps({
  modelValue: {
    type: [Object, Array],
  },
  label: {
    type: String,
    default: null
  },
  required: {
    type: Boolean
  },
  range: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: 'select-time'
  },
  error: {
    type: Object,
    default: () => ({
      $error: false,
      $errors: []
    })
  },
  showNestedError: {
    type: Boolean,
    default: true
  }
})

// Composable
const modelValue = useModel(props, 'modelValue')
const { t } = useI18n()
</script>

<template>
  <div class="base-time-picker">
    <base-label :label="props.label" :required="props.required" />

    <VueDatePicker
      v-model="modelValue"
      time-picker
      :range="range"
      :cancel-text="t('cancel')"
      :select-text="t('select')"
      :placeholder="t(placeholder)"
      ref="datePicker"
      :class="{ 'input-error': error?.$error && showNestedError }"
    >
      <template #input-icon>
        <base-iconify :icon="ClockCircleLinearIcon" class="text-greyscale-500 ml-3" />
      </template>
    </VueDatePicker>
  </div>
</template>

<style>
.base-time-picker input {
  height: 44px!important;
  background: var(--greyscale-50)!important;
  border-radius: 12px!important;
  border: none!important;
  color: var(--greyscale-900)!important;
  font-weight: 500!important;
  font-size: 14px!important;
  margin-left: 4px;
}

.input-error input {
  border: 1px solid #e24c4c!important;
}

.base-time-picker input::placeholder {
  font-weight: 400!important;
}

.base-time-picker .dp__outer_menu_wrap {
  border-radius: 12px!important;
  box-shadow: 0 8px 28px 0 rgba(0, 0, 0, 0.12)!important;
}

.base-time-picker .dp__menu {
  border-radius: 12px;
  border: none;
  overflow: hidden;
}

.base-time-picker .dp__inc_dec_button {
  border-radius: 6px;
  width: 24px;
  height: 24px;
}

.base-time-picker .dp__time_display {
  font-size: 28px;
  color: var(--greyscale-900);
  font-weight: 600;
}

.base-time-picker .dp__time_col {
  height: 36px;
  font-size: 28px;
}

.base-time-picker .dp__time_col_reg_block {
  padding: 0 10px;
}

.base-time-picker .dp__action_button {
  border-radius: 12px;
  padding: 14px 10px;
  font-size: 12px;
  font-weight: 600;
}

.base-time-picker .dp__action_row {
  background: var(--greyscale-50);
}
</style>
