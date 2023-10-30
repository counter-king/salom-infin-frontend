<script setup>
// Core
import { useModel, useSlots, computed } from 'vue'
import Dialog from 'primevue/dialog'
// Macros
const props = defineProps({
  modelValue: {
    type: Boolean
  },
  maxWidth: {
    type: String,
    default: 'max-w-[1130px]'
  }
})
// Composable
const modelValue = useModel(props, 'modelValue')
const slots = useSlots()
// Computed
const rootClasses = computed(() => {
  return [
    'w-full rounded-2xl shadow-none',
    props.maxWidth
  ]
})
</script>

<template>
  <Dialog
    v-model:visible="modelValue"
    modal
    header="Входящий документ"
    :pt="{
      root: {
        class: rootClasses
      },
      header: {
        class: ['rounded-t-2xl bg-greyscale-50 border border-solid border-b-greyscale-200']
      },
      closeButton: {
        class: ['w-9 h-9 shadow-button bg-white']
      },
      closeButtonIcon: {
        class: ['w-3 h-3']
      },
      content: {
        class: ['py-6 px-8', { 'rounded-b-2xl' : !slots.footer }]
      },
      footer: {
        class: ['rounded-b-2xl bg-greyscale-50 border border-solid border-t-greyscale-200 py-5 pl-6 pr-4']
      }
    }"
  >
    <template #header>
      <slot name="header" />
    </template>

    <template #footer v-if="slots.footer">
      <slot name="footer" />
    </template>

    <div class="dialog-content">
      <slot name="content" />
    </div>
  </Dialog>
</template>
