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
  contentBgColor: {
    type: String,
  }
})
defineExpose({
  menuRef
})
// Computed
const rootClasses = computed(() => {
  return [
    'translate-y-1 rounded-xl overflow-hidden shadow-menu px-1 pb-0',
    // Width
    props.width,
    props.menuClass,
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
        class: 'group mb-1 '
      },
      content: {
        class: ['rounded-lg', props.contentBgColor]
      },
      action: {
        class: ['py-[6px] pl-2 pl-3', props.actionSizeClass]
      },
      label: {
        class: ['text-sm font-medium', props.labelClass]
      }
    }"
  >
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
