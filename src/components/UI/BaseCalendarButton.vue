<script setup>
// Core
import { ref, unref, computed } from 'vue'
// Components
import { AltArrowDownLinearIcon, CalendarIcon, CloseCircleBoldIcon } from '@/components/Icons'
import BaseOverlayPanel from "@/components/UI/BaseOverlayPanel.vue";
// Macros
const props = defineProps({
  modelValue: {
    type: [String, Number, Date],
    default: ""
  },
  parsedText: {
    type: String
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
  rootClass: {
    type: String
  },
  clearable: {
    type: Boolean,
    default: true
  },
  primary: {
    type: Boolean,
    default: false
  },
  maxDate: {
    type: Date,
  }
})
const emit = defineEmits(['update:modelValue', 'emit:date-select', 'emit:clear'])
// Reactive
const panelRef = ref(null)
const date = ref(null)
const dispatchEvent = ref(null)
// Computed
const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    if (value) {
      emit('update:modelValue', value)
    } else {
      emit('emit:clear')
    }
  }
})
// Methods
const toggle = (event) => {
  const _panelRef = unref(panelRef)
  _panelRef.opRef.toggle(event)
  dispatchEvent.value = event
}
const dateSelect = () => {
  toggle(dispatchEvent.value)
  emit('emit:date-select')
}
const clear = (event) => {
  event.stopImmediatePropagation()
  emit('emit:clear')
}
</script>

<template>
  <button
    class="p-button p-component font-semibold text-sm bg-primary-0 hover:bg-greyscale-100 text-primary-dark border-transparent !rounded-full shadow-button pt-[10px] pb-[9px] pl-4 pr-3"
    :class="props.rootClass"
    @click="toggle"
  >
    <base-iconify
      :icon="CalendarIcon"
      class="mr-2"
      :class="primary ? 'text-white' : 'text-greyscale-500'"
    />

    <span>{{ parsedText ?? modelValue }}</span>

    <template v-if="!modelValue || !clearable">
      <base-iconify
        :icon="AltArrowDownLinearIcon"
        class="ml-1"
        :class="primary ? 'text-white' : 'text-greyscale-500'"
      />
    </template>

    <template v-else>
      <base-iconify
        :icon="CloseCircleBoldIcon"
        class="ml-1"
        :class="primary ? 'text-white' : 'text-greyscale-500'"
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
      v-model="modelValue"
      inline
      :view="props.view"
      :date-format="props.dateFormat"
      :clearable="clearable"
      :primary="primary"
      :max-date="maxDate"
      @emit:day-select="dateSelect"
    />
  </base-overlay-panel>
</template>
