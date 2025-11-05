<script setup>
// Core
import { useModel, useSlots, computed } from 'vue'
import Dialog from 'primevue/dialog'
import {useI18n} from "vue-i18n";
// Macros
const props = defineProps({
  modelValue: {
    type: Boolean
  },
  maxWidth: {
    type: String,
    default: 'max-w-[1130px]'
  },
  label: {
    type: String,
    default: 'Входящий документ'
  },
  blur: {
    type: Boolean
  },
  headerClasses: {
    type: String,
  },
  contentClasses: {
    type: String,
    default: 'py-6 px-8'
  },
  footerClasses: {
    type: String
  },
  dismissableMask: {
    type: Boolean,
  },
  showHeader: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['update:modelValue', 'emit:after-hide'])
const { t } = useI18n();
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
    :dismissableMask="props.dismissableMask"
    modal
    :header="t(props.label)"
    :show-header="showHeader"
    :pt="{
      root: {
        class: rootClasses
      },
      header: {
        class: ['rounded-t-2xl bg-greyscale-50 border border-solid border-b-greyscale-200', props.headerClasses]
      },
      closeButton: {
        class: ['w-9 h-9 shadow-button bg-white']
      },
      closeButtonIcon: {
        class: ['w-3 h-3']
      },
      content: {
        class: [props.contentClasses, { 'rounded-b-2xl' : !slots.footer }]
      },
      footer: {
        class: ['rounded-b-2xl bg-greyscale-50 border border-solid border-t-greyscale-200 py-5 pl-6 pr-4',props.footerClasses]
      },
      mask: {
        class: [
          {
            'backdrop-blur-sm': props.blur
          }
        ]
      },
      headerIcons: {
        class: 'z-10'
      }
    }"
    @after-hide="emit('emit:after-hide')"
  >
    <template #header>
      <slot name="header" />
    </template>

    <template #footer v-if="slots.footer">
      <slot name="footer" />
    </template>

    <div class="dialog-content h-full">
      <slot name="content" />
    </div>
  </Dialog>
</template>
