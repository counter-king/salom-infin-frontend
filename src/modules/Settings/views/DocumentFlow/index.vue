<script setup>
// Core
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
// Components
import TheNavigation from '@/components/TheNavigation.vue'
import { ClipboardCheckIcon, DocumentTextIcon, NotebookIcon } from '@/components/Icons'
// Composable
const { locale } = useI18n()
// Reactive
const navs = ref([])
const changeLanguage = () => {
  navs.value = [
    {
      title: 'Тип документа',
      icon: ClipboardCheckIcon,
      link: 'DocumentTypesIndex',
      permission: 'settings-e-docs-document-types'
    },
    {
      title: 'Вид подачи',
      icon: DocumentTextIcon,
      link: 'DeliveryTypesIndex',
      permission: 'settings-e-docs-delivery-types'
    },
    {
      title: 'Журнал',
      icon: NotebookIcon,
      link: 'MagazinesIndex',
      permission: 'settings-e-docs-journal'
    },
    {
      title: 'Заголовки',
      icon: NotebookIcon,
      link: 'DocumentTitlesIndex',
      permission: 'settings-e-docs-document-titles'
    }
  ];
};
watch(locale, () => {
  changeLanguage()
});
onMounted(() => {
  changeLanguage()
});
</script>
<template>
  <the-navigation :navs="navs" />
  <router-view />
</template>
<style></style>
