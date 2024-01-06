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
      link: 'PhysicalIndex',
    },
    {
      title: 'Индивидуальный предприниматель',
      icon: 'UserCheckRoundedIcon',
      link: 'EntrepreneurIndex',
    },
    {
      title: 'Юридическое лицо',
      icon: 'BuildingsIcon',
      link: 'LegalIndex',
    },
    {
      title: 'Регионы',
      icon: 'RegionIcon',
      link: 'RegionsIndex',
    },
    {
      title: 'Районы',
      icon: 'DistrictIcon',
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