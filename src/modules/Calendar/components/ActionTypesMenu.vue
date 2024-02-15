<script setup>
// Core
import { ref, unref, computed } from 'vue'
// Store
import { useCalendarStore } from '../stores/calendar.store'
// Enums
import { ACTION_FORM_TYPES } from '../enums'
// Composable
const calendarStore = useCalendarStore()
// Reactive
const menuRef = ref(null)
const items = ref([
  {
    label: 'Мероприятия',
    component: ACTION_FORM_TYPES.EVENT,
    command: () => actionTypesMenu(ACTION_FORM_TYPES.EVENT)
  },
  {
    label: 'Моя задача',
    component: ACTION_FORM_TYPES.TASK,
    command: () => actionTypesMenu(ACTION_FORM_TYPES.TASK)
  }
])
// Computed
const menuActiveText = computed(() => items.value.find(menu => menu.component === calendarStore.actionTypesMenuSelected.name))
// Methods
const toggle = (event) => {
  const _menuRef = unref(menuRef)
  _menuRef.menuRef.toggle(event)
}
const actionTypesMenu = (type) => {
  calendarStore.actionTypesMenuSelected.name = type
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
