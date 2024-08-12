<script setup>
// Core
import { ref, unref } from 'vue'
// Components
import EventSidebar from './EventSidebar.vue'
// Stores
import { useCalendarStore } from '../stores/calendar.store'
// Enums
import { EVENT_TYPES, ACTION_FORM_TYPES } from '../enums'
// Composable
const calendarStore = useCalendarStore()
// Reactive
const menuRef = ref(null)
const items = ref([
  {
    label: 'Мероприятия',
    icon: EVENT_TYPES.EVENT,
    command: () => {
      calendarStore.actionTypesMenuSelected.name = ACTION_FORM_TYPES.EVENT
      calendarStore.eventSidebar = true
    }
  },
  {
    label: 'Моя задача',
    icon: EVENT_TYPES.TASK,
    command: () => {
      calendarStore.actionTypesMenuSelected.name = ACTION_FORM_TYPES.TASK
      calendarStore.eventSidebar = true
    }
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
    icon-right="solar:alt-arrow-down-outline"
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
        <div class="w-3 h-3 rounded-full" :class="item.icon === EVENT_TYPES.EVENT ? 'bg-info-200' : 'bg-success-200'"></div>
        <span class="text-sm font-semibold text-primary-900">{{ item.label }}</span>
      </div>
    </template>
  </base-menu>

  <!-- Event sidebar -->
  <event-sidebar />
  <!-- /Event sidebar -->
</template>
