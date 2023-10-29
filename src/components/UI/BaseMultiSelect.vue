<script setup>
// Core
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import MultiSelect from 'primevue/multiselect'
import BaseButton from "@/components/UI/BaseButton.vue";
import BaseIcon from "@/components/UI/BaseIcon.vue";
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
  tokenClass: {
    type: Array,
    default: () => []
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
      token: {
        class: props.tokenClass
      },
      tokenLabel: {
        class: ['text-sm font-medium']
      },
      label: {
        class: [
          'text-sm font-medium text-greyscale-500',
          {
            'size-small py-[2px] pr-2 pl-4': props.size === 'x-small',
            'size-small py-[5px] pr-2 pl-4': props.size === 'small',
            'size-normal py-3 pr-2 pl-4': props.size === null || props.size === 'normal',
          },
        ]
      },
      dropdownIcon: {
        class: ['w-3 h-3']
      },
      panel: {
        class: ['translate-y-[8px] shadow-menu rounded-2xl overflow-hidden']
      },
      header: {
        class: ['bg-white hidden']
      },
      list: {
        class: ['py-0']
      },
      checkboxContainer: {
        class: ['hidden']
      },
      item: {
        class: ['py-[6px] px-3 transition-all hover:bg-greyscale-50']
      },
      option: {
        class: ['text-sm font-medium text-primary-900']
      }
    }"
  >
    <template #header="{ value, options }">
      <div class="flex items-center border-b border-greyscale-200">
        <input
          type="text"
          placeholder="Введите имя..."
          class="flex-1 p-3 block outline-none font-medium text-sm text-gray-1"
        />
        <button
          v-tooltip.left="{
            value: `<h4 class='text-xs text-white -my-1'>Очистить</h4>`,
            escape: true,
            autoHide: false
          }"
          class="text-grey-500 ml-auto mr-3"
        >
          <base-icon name="XIcon" width="18" height="18" />
        </button>
      </div>
    </template>

    <template #chip="{ value }">
      <slot name="chip" :value="value" />
    </template>

    <template #removetokenicon="{ onClick }">
      <slot name="removetokenicon" :click="onClick" />
    </template>
  </MultiSelect>
</template>

<style scoped>

</style>
