<script setup>
// Core
import { ref, unref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
// Components
import { AltArrowDownIcon } from '@/components/Icons'
// Store
import { useCalendarStore } from '../stores/calendar.store'
// Enums
import { ACTION_FORM_TYPES } from '../enums'
// Composable
const { t, locale } = useI18n()
const calendarStore = useCalendarStore()
// Reactive
const menuRef = ref(null)
const items = ref([])
// Computed
const menuActiveText = computed(() => items.value.find(menu => menu.component === calendarStore.actionTypesMenuSelected.name))
// Watch
watch(
  () => locale.value,
  () => {
    items.value = [
      {
        label: t('events'),
        component: ACTION_FORM_TYPES.EVENT,
        command: () => actionTypesMenu(ACTION_FORM_TYPES.EVENT)
      },
      {
        label: t('tasks'),
        component: ACTION_FORM_TYPES.TASK,
        command: () => actionTypesMenu(ACTION_FORM_TYPES.TASK)
      }
    ]
  },
  {
    immediate: true
  }
)
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
    <slot name="text" :text="menuActiveText.label">
      <h1 class="text-xl font-bold text-primary-900">{{ menuActiveText.label }}</h1>
    </slot>

    <base-iconify :icon="AltArrowDownIcon" class="mt-1 text-gray-2" />
  </button>

  <base-menu
    ref="menuRef"
    :items="items"
    width="w-[225px]"
    action-size-class="min-h-[40px]"
    label-class="text-greyscale-500 group-hover:text-primary-500"
    id="overlay_menu2"
  ></base-menu>
</template>
