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
    title: t('my-attendance'),
    icon: CalendarLinearIcon,
    link: 'MyAttendanceIndex',
  },
  {
    title: t('my-applications'),
    icon: FileTextIcon,
    link: 'MyApplicationsIndex',
  },
])

</script>

<template>
    <the-navigation :navs="navsMenu" />
    <router-view />
</template>
