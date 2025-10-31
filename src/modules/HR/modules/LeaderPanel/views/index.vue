<script setup>
// core
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
// Components
import TheNavigation from '@/components/TheNavigation.vue'
// Components
import { CalendarLinearIcon, FileTextIcon, History2Icon, UsersGroupTwoRoundedIcon } from '@/components/Icons'
const { t } = useI18n()
// Reactive
const navsMenu = computed(() => [
  {
    title: t('employee-attendance'),
    icon: CalendarLinearIcon,
    link: 'LeaderPanelMainIndex',
  },
  {
    title: t('employees-timesheet'),
    icon: UsersGroupTwoRoundedIcon,
    link: 'EmployeesTimesheetIndex',
  },
  {
    title: t('action-history'),
    icon: History2Icon,
    link: 'ActionHistoryIndex',
  },
])

</script>

<template>
    <the-navigation :navs="navsMenu" />
    <router-view />
</template>
