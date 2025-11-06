<script setup>
// Core
import { ref } from 'vue'
// Components
import TheNavigation from '@/components/TheNavigation.vue'
import { BuildingsIcon, UserSpeakRoundedIcon, CheckListMinimalisticLinearIcon } from '@/components/Icons'
// Reactive
const navs = ref([
  {
    title: "department",
    icon: BuildingsIcon,
    link: "DepartmentsIndex",
    permission: 'settings-structure-departments'
  },
  {
    title: "branch",
    icon: BuildingsIcon,
    link: "BranchesIndex",
    permission: 'settings-structure-branches'
  },
  {
    title: "position",
    icon: UserSpeakRoundedIcon,
    link: "PositionsIndex",
    permission: 'settings-structure-positions'
  },
  {
    title: "assign-executives",
    icon: CheckListMinimalisticLinearIcon,
    link: "AssignExecutivesIndex",
    permission: 'settings-structure-assign-executives'
  }
])
</script>

<template>
  <the-navigation :navs="navs" />

  <router-view />
</template>

<style></style>
