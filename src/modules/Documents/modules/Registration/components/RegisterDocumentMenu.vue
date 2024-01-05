<script setup>
// Core
import { ref, unref, computed } from 'vue'
// Store
import { useDocFlowStore } from '../stores/docflow.store'
// Composable
const docFlowStore = useDocFlowStore()
// Macros
const emit = defineEmits(['emit:up'])
// Reactive
const menuRef = ref(null)
const items = ref([
  {
    label: 'Входящий документ',
    component: 'Incoming',
    command: () => documentType('Incoming')
  },
  {
    label: 'Внутренний документ',
    component: 'Inner',
    command: () => documentType('Inner')
  },
  {
    label: 'Исходящий документ',
    component: 'Outgoing',
    command: () => documentType('Outgoing')
  },
  {
    label: 'Обращения',
    component: 'Appeal',
    command: () => documentType('Appeal')
  },
  {
    label: 'Входящие от филиалов',
    component: 'IncomingBranches',
    command: () => documentType('IncomingBranches')
  },
  {
    label: 'Приказы и распоряжения',
    component: 'OrderInstruction',
    command: () => documentType('OrderInstruction')
  },
  {
    label: 'Заявления',
    component: 'Statement',
    command: () => documentType('Statement')
  }
])
// Computed
const menuActiveText = computed(() => items.value.find(menu => menu.component === docFlowStore.documentMenuType))
// Methods
const toggle = (event) => {
  const _menuRef = unref(menuRef)
  _menuRef.menuRef.toggle(event)
}
const documentType = (type) => {
  emit('emit:up', type)
}
</script>

<template>
  <button
    aria-haspopup="true"
    aria-controls="overlay_menu2"
    class="flex items-center gap-2 outline-none bg-transparent"
    @click="toggle"
  >
    <h1 class="text-xl font-bold text-primary-900">{{ menuActiveText.label }}</h1>
    <base-icon name="AltArrowLeftIcon" class="-rotate-90 mt-1 text-gray-2" />
  </button>

  <base-menu
    :items="items"
    width="w-[225px]"
    action-size-class="min-h-[40px]"
    label-class="text-greyscale-500 group-hover:text-primary-500"
    ref="menuRef"
    id="overlay_menu2"
  ></base-menu>
</template>
