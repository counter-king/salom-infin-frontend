<script setup>
// Core
import { useModel, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Sidebar from 'primevue/sidebar'
// Composable
const modelValue = useModel(props, 'modelValue')
const { t } = useI18n()
// Reactive
const successButtonLoading = ref(false)
// Macros
const props = defineProps({
  modelValue: {
    type: Boolean
  },
  title: {
    type: String,
    default: 'create'
  },
  successText: {
    type: String,
    default: 'save'
  },
  cancelText: {
    type: String,
    default: 'cancel'
  },
  closeButtonClass:{
    type: String,
  },
  headerClass: {
    type: String,
  },
  position: {
    type: String,
    default: 'right',
    validator(value) {
      return ['left', 'right', 'top', 'bottom', 'full'].includes(value)
    }
  },
  rootClass: {
    type: String
  }
})
defineExpose({ successButtonLoading })
</script>

<template>
  <Sidebar
    v-model:visible="modelValue"
    :position="props.position"
    :pt="{
      root: {
        class: ['w-[1500px]', props.rootClass]
      },
      header: {
        class: 'bg-greyscale-50 p-6'
      },
      headerContent: {
        class: ['mr-auto', props.headerClass]
      },
      closeButton: {
        class: ['w-9 h-9 bg-white rounded-full shadow-button', props.closeButtonClass]
      },
      content: {
        class: 'p-0'
      }
    }"
  >
    <template #header>
      <div class="flex w-full">
        <span class="text-xl font-semibold text-primary-900 flex-1">{{ t(props.title) }}</span>
        <slot name="headerCloseIcons" />
      </div>
    </template>

    <div class="flex flex-col h-full">
      <div class="flex-1 p-6 border-t overflow-y-auto">
        <slot name="content" />
      </div>

      <slot name="footer">
        <div class="flex justify-end gap-3 bg-greyscale-50 px-6 py-5 border-t">
          <base-button
            :label="t(props.cancelText)"
            size="large"
            border-color="border-transparent"
            outlined
            rounded
            shadow
            @click="$emit('emit:cancel-button', false)"
          />

          <base-button
            :label="t(props.successText)"
            :loading="successButtonLoading"
            size="large"
            rounded
            @click="$emit('emit:success-button')"
          />
        </div>
      </slot>
    </div>
  </Sidebar>
</template>
