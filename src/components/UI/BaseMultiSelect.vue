<script setup>
// Core
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import MultiSelect from 'primevue/multiselect'
// Composable
const { t } = useI18n()
// Macros
const props = defineProps({
  border: {
    type: Boolean
  },
  optionLabel: {
    type: String,
    default: 'name'
  },
  placeholder: {
    type: String,
    default: 'create'
  },
  borderColor: {
    type: String
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
// Reactive
const selectedCities = ref(null)
const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' }
])
// Computed
const rootClasses = computed(() => {
  return [
    'group w-80 bg-greyscale-50 rounded-xl hover:border-primary-500',
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
  <div class="p-10">
    <MultiSelect
      v-model="selectedCities"
      :options="cities"
      :optionLabel="props.optionLabel"
      :placeholder="t(props.placeholder)"
      :display="props.display"
      filter
      :pt="{
        root: {
          class: rootClasses
        },
        tokenLabel: {
          class: [
            'text-sm font-medium'
          ]
        },
        label: {
          class: [
            'text-sm font-medium text-greyscale-500',
            {
              'size-small py-[2px] pr-2 pl-4': props.size === 'x-small',
              'size-small py-[5px] pr-2 pl-4': props.size === 'small',
              'size-normal py-[11px] pr-2 pl-4': props.size === null || props.size === 'normal',
            },
          ]
        },
        dropdownIcon: {
          class: [
            'w-3 h-3'
          ]
        }
      }"
    >
      <template #chip="{ value }">
        {{ value?.name }}
      </template>
    </MultiSelect>
  </div>
</template>

<style scoped>

</style>
