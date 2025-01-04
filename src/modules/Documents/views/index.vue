<script setup>
// Core
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
// Stores
import { useBoxesCommonStore } from '../modules/Boxes/stores/common.store'
import { useDocFlowStore } from '../modules/Registration/stores/docflow.store'
// Components
import TheSidebar from '@/components/TheSidebar.vue'
import TheFooter from '@/components/TheFooter.vue'
import { ArchiveUpIcon } from '@/components/Icons'
// Composable
const { t, locale } = useI18n()
const boxesStore = useBoxesCommonStore()
const docFlowStore = useDocFlowStore()
// Reactive
const menus = ref([])
// Watch
watch(
  () => locale.value,
  () => {
    menus.value = [
      {
        title: t('document'),
        prefix: true
      },
      // Ящики
      boxesStore.routes,
      // Отправка документов
      {
        title: t('sending-documents'),
        icon: ArchiveUpIcon,
        link: 'SendDocumentsIndex',
        children: [],
        permission: 'sending-documents'
      },
      // Регистрация
      docFlowStore.routes
    ]
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div class="document-view flex w-full">
    <the-sidebar :menus="menus" />
    <div class="flex flex-col overflow-y-auto flex-1 p-6 pb-2">
      <div class="document-view-aside flex flex-col">
        <router-view />
      </div>
      <div class="mt-auto">
        <the-footer/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
