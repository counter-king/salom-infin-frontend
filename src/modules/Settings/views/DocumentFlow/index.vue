<script setup>
import TheNavigation from '@/components/TheNavigation.vue'
import { ref, watch, onMounted } from 'vue';
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const navs = ref([]);
const changeLanguage = () => {
  navs.value = [
    {
      title: "Тип документа",
      icon: "ClipboardCheckIcon",
      link: "DocumentTypesIndex",
    },
    {
      title: "Вид документа",
      icon: "DocumentTextIcon",
      link: "DocumentViewIndex",
    },
    {
      title: "Журнал",
      icon: "NotebookIcon",
      link: "MagazineIndex",
    }
  ];
};
watch(locale, () => {
  changeLanguage();
});
onMounted(() => {
  changeLanguage();
});
</script>
<template>
  <the-navigation :navs="navs" />
  <router-view />
</template>
<style></style>