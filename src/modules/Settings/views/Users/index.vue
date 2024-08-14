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
      title: 'Сотрудники',
    },
    {
      icon: UsersGroupTwoRoundedIcon,
      link: 'AssistantsIndex',
      title: 'Помощники',
    },
    {
      icon: UserSpeakRoundedIcon,
      link: 'TopSignersIndex',
      title: 'Топ подписантов',
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
