<script setup>
import TheNavigation from '@/components/TheNavigation.vue'
import { useI18n } from "vue-i18n";
import { ref, watch, onMounted } from 'vue';
const { locale } = useI18n();
const navs = ref([]);
const changeLanguage = () => {
  navs.value = [
    {
      title: "Департаменты",
      icon: "BuildingsIcon",
      link: "DepartmentsIndex",
    },
    {
      title: "Региональные филиалы",
      icon: "BuildingsIcon",
      link: "BranchesIndex",
    },
  ];
};
watch(locale, () => {
  changeLanguage();
});
onMounted(() => {
  changeLanguage();
})
</script>
<template>
   <the-navigation :navs="navs"/>
   <div>Depamrtents Page</div>
</template>
<style></style>