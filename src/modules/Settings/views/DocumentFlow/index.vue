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
    },
    {
      title: 'Вид подачи',
      icon: DocumentTextIcon,
      link: 'DeliveryTypesIndex',
    },
    {
      title: 'Журнал',
      icon: NotebookIcon,
      link: 'MagazinesIndex',
    },
    {
      title: 'Заголовки',
      icon: NotebookIcon,
      link: 'DocumentTitlesIndex',
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
