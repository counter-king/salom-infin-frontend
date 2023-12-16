<script setup>
// Core
import { ref } from 'vue'
// Stores
import { useBoxesCommonStore } from '../modules/Boxes/stores/common.store'
import { useDocFlowStore } from '../modules/Registration/stores/docflow.store'
// Components
import TheSidebar from '@/components/TheSidebar.vue'
// Composable
const boxesStore = useBoxesCommonStore()
const docFlowStore = useDocFlowStore()
// Reactive
const menus = ref([
  {
    title: "Документ",
    prefix: true
  },
  // Ящики
  boxesStore.routes,
  // Отправка документов
  {
    title: "Отправка документов",
    icon: "ArchiveUpIcon",
    link: "SendDocumentsIndex",
    children: []
  },
  // Регистрация
  docFlowStore.routes
])
</script>

<template>
  <div class="document-view flex w-full">
    <the-sidebar :menus="menus" />

    <div class="flex-1 overflow-y-auto p-6">
      <router-view />
    </div>
  </div>
</template>

<style scoped>

</style>
