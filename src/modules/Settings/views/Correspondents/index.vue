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
      title: 'physical',
      icon: UserCheckRoundedBrokenIcon,
      link: 'PhysicalIndex',
      permission: 'settings-correspondent-physical'
    },
    {
      title: 'individual-entrepreneur',
      icon: UserCheckRoundedBrokenIcon,
      link: 'EntrepreneurIndex',
      permission: 'settings-correspondent-individual'
    },
    {
      title: 'legal-entity',
      icon: BuildingsIcon,
      link: 'LegalIndex',
      permission: 'settings-correspondent-legal'
    },
    {
      title: 'regions',
      icon: MapIcon,
      link: 'RegionsIndex',
      permission: 'settings-correspondent-regions'
    },
    {
      title: 'areas',
      icon: StreetsMapPointIcon,
      link: 'DistrictsIndex',
      permission: 'settings-correspondent-districts'
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
