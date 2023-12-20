<script setup>
import TheNavigation from '@/components/TheNavigation.vue';
import { ref, onMounted, watch } from 'vue';
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const navs = ref([]);
const changeLanguage = () => {
  navs.value = [
    {
      title: 'Индивидулны',
      icon: 'UserCheckRoundedIcon',
      link: 'IndividualIndex',
      children: []
    },
    {
      title: 'Организации',
      icon: 'BuildingsIcon',
      link: 'OrganizationsIndex',
      children: []
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