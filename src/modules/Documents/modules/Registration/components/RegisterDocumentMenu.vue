<script setup>
// Core
import { ref, unref, computed } from 'vue'
// Store
import { useCommonStore } from '@/stores/common'
import { useDocFlowStore } from '../stores/docflow.store'
// Enums
import { JOURNAL_CODES } from '@/enums'
// Composable
const commonStore = useCommonStore()
const docFlowStore = useDocFlowStore()
// Reactive
const menuRef = ref(null)
const items = ref([
  {
    label: 'Входящий документ',
    component: 'Incoming',
    command: () => documentType(JOURNAL_CODES.INCOMING)
  },
  {
    label: 'Внутренний документ',
    component: 'Inner',
    command: () => documentType(JOURNAL_CODES.INNER)
  },
  {
    label: 'Исходящий документ',
    component: 'Outgoing',
    command: () => documentType(JOURNAL_CODES.OUTGOING)
  },
  {
    label: 'Обращения',
    component: 'Appeal',
    command: () => documentType(JOURNAL_CODES.APPEALS)
  },
  {
    label: 'Приказы и распоряжения',
    component: 'OrderInstruction',
    command: () => documentType(JOURNAL_CODES.ORDERS_PROTOCOLS)
  },
  {
    label: 'Заявления',
    component: 'Statement',
    command: () => documentType(JOURNAL_CODES.APPLICATION)
  }
])
// Computed
const menuList = computed(() => commonStore.journalsList.map(journal => {
  return {
    ...journal,
    label: journal.name,
    command: () => documentType(journal.code)
  }
}))
const menuActiveText = computed(() => items.value.find(menu => menu.component === docFlowStore.documentMenuType.name))
// Methods
const toggle = (event) => {
  const _menuRef = unref(menuRef)
  _menuRef.menuRef.toggle(event)
}
const documentType = (journalCode) => {
	docFlowStore.actionLoadFormCreateDocument({ journalCode })
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
    :items="menuList"
    width="w-[225px]"
    action-size-class="min-h-[40px]"
    label-class="text-greyscale-500 group-hover:text-primary-500"
    ref="menuRef"
    id="overlay_menu2"
  ></base-menu>
</template>
