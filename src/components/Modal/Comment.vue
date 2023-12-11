<script setup>
// Core
import { ref, useModel } from 'vue'
// Macros
const props = defineProps({
  modelValue: {
    type: Boolean
  },
  label: {
    type: String,
    default: 'delete-resolutions'
  },
  headerClasses: {
    type: String,
  },
  contentClasses: {
    type: String,
    default: 'py-6 px-8'
  },
  createButtonLoading: {
    type: Boolean
  },
  createButtonColor: {
    type: String,
    default: 'primary'
  }
})
const emit = defineEmits(['emit:up'])
// Composable
const modelValue = useModel(props, 'modelValue')
// Reactive
const text = ref(null)
// Methods
const create = async () => {
  if(!text.value.trim()) return

  emit('emit:up', text.value)
}
</script>

<template>
  <base-dialog
    v-model="modelValue"
    v-bind="props"
    max-width="max-w-[610px]"
  >
    <template #content>
      <base-textarea
        v-model="text"
        label="enter-content"
      />
    </template>

    <template #footer>
      <base-button
        :severity="props.createButtonColor"
        :loading="props.createButtonLoading"
        :label="props.label"
        rounded
        @click="create"
      />
    </template>
  </base-dialog>
</template>
