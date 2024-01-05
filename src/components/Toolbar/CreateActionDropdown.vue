<script setup>
// Core
import { ref, unref } from 'vue'
// Store
import { useDocFlowStore } from '@/modules/Documents/modules/Registration/stores/docflow.store'
// Components
import RegisterDocumentDialog from '@/modules/Documents/modules/Registration/components/RegisterDocumentDialog.vue'
// Composable
const docFlowStore = useDocFlowStore()
// Reactive
const menuRef = ref(null)
const items = ref([
  {
    label: 'Документ',
    icon: 'ClipboardCheckIcon',
    command: () => docFlowStore.actionToggleModalCreateDocument(true)
  },
  {
    label: 'Задача',
    icon: 'CheckCircleIcon'
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
    icon-left="AddIcon"
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
  />

  <!-- RegisterDocumentDialog -->
  <register-document-dialog v-model="docFlowStore.documentMenuModal" />
  <!-- /RegisterDocumentDialog -->
</template>
