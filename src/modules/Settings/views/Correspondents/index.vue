<script setup>
// Core
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
// Components
import TheNavigation from '@/components/TheNavigation.vue'
import { BuildingsIcon, MapIcon, StreetsMapPointIcon, UserCheckRoundedBrokenIcon } from '@/components/Icons'
// Composable
const { locale } = useI18n()
// Reactive
const navs = ref([])
const changeLanguage = () => {
  navs.value = [
    {
      title: 'Физическое лицо',
      icon: UserCheckRoundedBrokenIcon,
      link: 'PhysicalIndex',
    },
    {
      title: 'Индивидуальный предприниматель',
      icon: UserCheckRoundedBrokenIcon,
      link: 'EntrepreneurIndex',
    },
    {
      title: 'Юридическое лицо',
      icon: BuildingsIcon,
      link: 'LegalIndex',
    },
    {
      title: 'Регионы',
      icon: MapIcon,
      link: 'RegionsIndex',
    },
    {
      title: 'Районы',
      icon: StreetsMapPointIcon,
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
