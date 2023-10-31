<script setup>
// Core
import { ref, unref } from 'vue'
// Components
import RegisterDocumentDialog from '@/modules/Documents/modules/Registration/components/RegisterDocumentDialog.vue'
// Methods
const openCreateDocumentDialog = () => {
  documentDialog.value = !documentDialog.value
}
// Reactive
const menuRef = ref(null)
const items = ref([
  {

    label: 'Задача',
    icon: 'CheckCircleIcon',
    command: openCreateDocumentDialog
  },
  {
    label: 'Документ',
    icon: 'ClipboardCheckIcon'
  }
])
const documentDialog = ref(false)
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
  <register-document-dialog v-model="documentDialog" />
  <!-- /RegisterDocumentDialog -->
</template>
