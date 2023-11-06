<script setup>
// Core
import { ref, computed, useSlots } from 'vue'
import OverlayPanel from 'primevue/overlaypanel';
// Composable
const slots = useSlots()
// Reactive
const opRef = ref(null)
// Macros
const props = defineProps({
  width: {
    type: String,
  },
  hasOverlay: {
    type: Boolean
  },
  menuClass: {
    type: String,
  },
  content: {
    type: String,
  }
})
defineExpose({
  opRef
})
// Computed
const rootClasses = computed(() => {
  return [
    'translate-y-1 rounded-xl shadow-menu after_none',
    // Width
    props.width,
    props.menuClass,
  ]
})
</script>

<template>
  <OverlayPanel
    ref="opRef"
    :model="props.items"
    :pt="{
      root: {
        class: rootClasses
      },
      content: {
          class: ['p-0', props.content  ]
      },
    }"
  >
    <template #default>
      <Teleport v-if="props.hasOverlay" to="body">
        <div class="modal-layer fixed bottom-0 w-full transition-all duration-[400ms]"></div>
      </Teleport>
      <slot></slot>
    </template>
  </OverlayPanel>
</template>

<style>
.modal-layer {
  height: calc(100vh - 80px);
  background: rgba(0, 8, 28, 0.45);
  z-index: 9;
}
.after_none::after {
  display: none;
}
</style>
