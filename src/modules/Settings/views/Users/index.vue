<script setup>
// Core
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
// Components
import TheNavigation from '@/components/TheNavigation.vue'
import { UserCheckRoundedBrokenIcon, UsersGroupTwoRoundedIcon, UserSpeakRoundedIcon } from '@/components/Icons'
// Composable
const { locale } = useI18n()
// Reactive
const navs = ref([])
const changeLanguage = () => {
  navs.value = [
    {
      icon: UserCheckRoundedBrokenIcon,
      link: 'EmployeesIndex',
      title: 'employees',
      permission: 'settings-users-employees'
    },
    {
      icon: UsersGroupTwoRoundedIcon,
      link: 'AssistantsIndex',
      title: 'assistants',
      permission: 'settings-users-assistants'
    },
    {
      icon: UserSpeakRoundedIcon,
      link: 'TopSignersIndex',
      title: 'top-signers',
      permission: 'settings-users-top-signers'
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
