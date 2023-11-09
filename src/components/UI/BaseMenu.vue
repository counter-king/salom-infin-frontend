<script setup>
// Core
import { ref, computed, useSlots, onMounted } from 'vue'
import Menu from 'primevue/menu'
// Composable
const slots = useSlots()
// Reactive
const menuRef = ref(null)
// Macros
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  width: {
    type: String,
    default: 'w-[145px]'
  },
  menuClass: {
    type: String,
  },
  actionSizeClass: {
    type: String,
    default: 'min-h-[32px]'
  },
  labelClass: {
    type: String,
    default: 'text-primary-900'
  },
  contentClass: {
    type: String,
  },
  hasAngle: {
    type: Boolean
  },
  hasOverlay: {
    type: Boolean
  }
})
defineExpose({
  menuRef
})
// Computed
const rootClasses = computed(() => {
  return [
    'translate-y-1 rounded-xl shadow-menu px-1 pb-0',
    // Width
    props.width,
    props.menuClass,
    // hasAngle
    {
      'after:content-[""]': props.hasAngle
    }
  ]
})
</script>

<template>
  <Menu
    ref="menuRef"
    :model="props.items"
    popup
    :pt="{
      root: {
        class: rootClasses
      },
      menuitem: {
        class: 'group mb-1'
      },
      content: {
        class: ['rounded-lg', props.contentClass]
      },
      action: {
        class: ['py-[6px] pl-2 pl-3', props.actionSizeClass]
      },
      label: {
        class: ['text-sm font-medium', props.labelClass]
      }
    }"
  >
    <template #start>
      <Teleport v-if="props.hasOverlay" to="body">
        <div class="modal-layer fixed bottom-0 w-full transition-all duration-[400ms]"></div>
      </Teleport>
    </template>

    <template #item="{ item }" v-if="slots.item">
      <slot name="item" :item="item" />
    </template>

    <template #itemicon="{ item }">
      <base-icon
        v-if="item.icon"
        :name="item.icon"
        width="18"
        height="18"
        class="mr-2"
      />
    </template>
  </Menu>
</template>

<style>
.modal-layer {
  height: calc(100vh - 80px);
  background: rgba(0, 8, 28, 0.45);
  z-index: 9;
}

.p-menu::after {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 12px 10px 12px;
  border-color: transparent transparent #F2F3F8 transparent;
  transform: rotate(0deg);
  position: absolute;
  top: -8px;
  right: 50px;
}
</style>
