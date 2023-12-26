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
    type: [Number, String, Object]
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
  disabled: {
    type: Boolean
  },
  label: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: 'choose-one'
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
// Computed
const rootClasses = computed(() => {
  return [
    'group w-full bg-greyscale-50 rounded-xl border-greyscale-50 focus:border-primary-500',
    // Border
    props.borderColor,
    // Validation
    {
      'p-invalid !shadow-none': props.error.$error,
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
    <base-label :label="props.label" :required="props.required" />

    <Dropdown
      v-model="modelValue"
      :options="props.options"
      :option-label="props.optionLabel"
      :option-value="props.optionValue"
      :placeholder="t(props.placeholder)"
      :disabled="props.disabled"
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
.p-dropdown.p-focus {
  border-color: rgb(99 90 255 / 1);
}

.p-dropdown.p-invalid.p-component {
  border-color: #e24c4c !important;
}
</style>
