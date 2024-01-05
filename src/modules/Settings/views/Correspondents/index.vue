<script setup>
import TheNavigation from '@/components/TheNavigation.vue';
import { ref, onMounted, watch } from 'vue';
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const navs = ref([]);
const changeLanguage = () => {
  navs.value = [
    {
      title: 'Физическое лицо',
      icon: 'UserCheckRoundedIcon',
      link: 'IndividualIndex',
    },
    {
      title: 'Индивидуальный предприниматель',
      icon: 'BuildingsIcon',
      link: 'OrganizationsIndex',
    },
    {
      title: 'Регионы',
      icon: 'BuildingsIcon',
      link: 'RegionsIndex',
    },
    {
      title: 'Районы',
      icon: 'BuildingsIcon',
      link: 'DistrictsIndex',
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