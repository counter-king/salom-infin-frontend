<script setup>
import TheNavigation from '@/components/TheNavigation.vue';
import { ref, watch, onMounted } from 'vue';
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const navs = ref([]);
const changeLanguage = () => {
  navs.value = [
    {
      icon: "UserCheckRoundedIcon",
      link: "EmployeesIndex",
      title: "Сотрудники",
    },
    {
      icon: "UsersGroupRoundedIcon",
      link: "AssistantsIndex",
      title: "Помощники",
    },
    {
      icon: "UserSpeakIcon",
      link: "TopSignersIndex",
      title: "Топ подписантов",
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