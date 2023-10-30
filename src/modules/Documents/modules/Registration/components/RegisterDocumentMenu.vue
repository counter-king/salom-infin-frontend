<script setup>
// Core
import { ref, unref } from 'vue'
// Macros
const emit = defineEmits(['emit:up'])
// Reactive
const menuRef = ref(null)
const menuActiveText = ref('Входящий документ')
const items = ref([
  {
    label: 'Входящие',
    command: () => documentType('Incoming', 'Входящий документ')
  },
  {
    label: 'Внутренние',
    command: () => documentType('Inner', 'Внутренний документ')
  },
  {
    label: 'Исходящие',
  },
  {
    label: 'Обращения',
  },
  {
    label: 'Входящие от филиалов',
  },
  {
    label: 'Приказы и распоряжения',
  },
  {
    label: 'Заявления',
  }
])
// Methods
const toggle = (event) => {
  const _menuRef = unref(menuRef)
  _menuRef.menuRef.toggle(event)
}
const documentType = (type, text) => {
  menuActiveText.value = text
  emit('emit:up', type)
}
</script>

<template>
  <button
    class="flex items-center gap-2 outline-none bg-transparent"
    aria-haspopup="true"
    aria-controls="overlay_menu2"
    @click="toggle"
  >
    <h1 class="text-xl font-bold text-primary-900">{{ menuActiveText }}</h1>
    <base-icon name="AltArrowLeftIcon" class="-rotate-90 mt-1 text-gray-2" />
  </button>

  <base-menu
    ref="menuRef"
    id="overlay_menu2"
    :items="items"
    action-size-class="min-h-[40px]"
    label-class="text-greyscale-500 group-hover:text-primary-500"
  ></base-menu>
</template>
