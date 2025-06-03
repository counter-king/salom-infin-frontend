<script setup>
// core
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
// Components
import TheNavigation from '@/components/TheNavigation.vue'
// Components
import { CalendarLinearIcon, FileTextIcon } from '@/components/Icons'
const { t } = useI18n()
// Reactive
const navsMenu = ref([
  {
    title: t('state'),
    icon: CalendarLinearIcon,
    link: 'StateIndex',
  },
  {
    title: t('table'),
    icon: FileTextIcon,
    link: 'TimesheetIndex',
  },
  {
    title: t('reports'),
    icon: FileTextIcon,
    link: 'RaportsIndex',
  },
])

</script>

<template>
    <the-navigation :navs="navsMenu" />
    <router-view />
</template>
