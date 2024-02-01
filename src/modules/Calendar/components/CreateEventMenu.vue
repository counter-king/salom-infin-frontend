<script setup>
// Core
import { ref, unref } from 'vue'
// Reactive
const menuRef = ref(null)
const items = ref([
  {
    label: 'Мероприятия',
    icon: 'event',
  },
  {
    label: 'Моя задача',
    icon: 'task'
  }
])
// Methods
const toggle = (event) => {
  const _menuRef = unref(menuRef)
  _menuRef.menuRef.toggle(event)
}
</script>

<template>
  <base-button
    label="create"
    icon-right="AltArrowDownIcon"
    rounded
    type="button"
    aria-haspopup="true"
    aria-controls="overlay_menu"
    @click="toggle"
  />

  <base-menu
    ref="menuRef"
    id="overlay_menu"
    :items="items"
  >
    <template #item="{ item }">
      <div class="flex items-center gap-2 py-1.5 px-3 cursor-pointer">
        <div class="w-3 h-3 rounded-full" :class="item.icon === 'event' ? 'bg-info-200' : 'bg-success-200'"></div>
        <span class="text-sm font-semibold text-primary-900">{{ item.label }}</span>
      </div>
    </template>
  </base-menu>
</template>
