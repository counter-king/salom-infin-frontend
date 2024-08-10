<script setup>
// Core
import { ref, unref } from 'vue'
// Utils
import { formatDate } from '@/utils/formatDate'
// Macros
const props = defineProps({
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
  }
})
const emit = defineEmits(['emit:date-select', 'emit:date-clear'])
// Reactive
const panelRef = ref(null)
const date = ref(null)
const dispatchEvent = ref(null)
// Methods
const toggle = (event) => {
  const _panelRef = unref(panelRef)
  _panelRef.opRef.toggle(event)
  dispatchEvent.value = event
}
const dateSelect = (value) => {
  date.value = formatDate(value)
  toggle(dispatchEvent.value)
  emit('emit:date-select', date.value)
}
const clear = (event) => {
  event.stopImmediatePropagation()
  date.value = null
  emit('emit:date-select', formatDate(new Date()))
}
</script>

<template>
  <button
    class="p-button p-component font-semibold text-sm bg-primary-0 hover:bg-greyscale-100 text-primary-dark border-transparent !rounded-full shadow-button pt-[10px] pb-[9px] pl-4 pr-3"
    @click="toggle"
  >
    <base-iconify icon="solar:calendar-outline" class="!w-5 !h-5 text-greyscale-500 mr-2" />

    <span>{{ date ?? 'Дата' }}</span>

    <template v-if="!date">
      <base-iconify icon="solar:alt-arrow-down-linear" class="!w-5 !h-5 text-greyscale-500 ml-1" />
    </template>

    <template v-else>
      <base-iconify
        icon="solar:close-circle-bold"
        class="!w-5 !h-5 text-greyscale-500 ml-1"
        @click="clear"
      />
    </template>
  </button>

  <base-overlay-panel
    ref="panelRef"
    width="w-[250px]"
    no-angle
  >
    <base-calendar
      inline
      :view="props.view"
      :date-format="props.dateFormat"
      @emit:day-select="dateSelect"
    />
  </base-overlay-panel>
</template>
