<script setup>
// Core
import { ref } from 'vue'
// Components
import TheNavigation from '@/components/TheNavigation.vue'
import { BuildingsIcon, UserSpeakRoundedIcon } from '@/components/Icons'
// Reactive
const navs = ref([
  {
    title: "Департаменты",
    icon: BuildingsIcon,
    link: "DepartmentsIndex",
  },
  {
    title: "Филиалы",
    icon: BuildingsIcon,
    link: "BranchesIndex",
  },
  {
    title: "Должность",
    icon: UserSpeakRoundedIcon,
    link: "PositionsIndex",
  }
])
</script>

<template>
  <the-navigation :navs="navs" />

  <router-view />
</template>

<style></style>
