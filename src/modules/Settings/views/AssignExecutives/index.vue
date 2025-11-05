<script setup>
// Components
import { Buildings2OutlineIcon, BuildingsIcon } from "@/components/Icons"
import TheNavigation from "@/components/TheNavigation.vue"

const navs = [
  {
    title: 'department',
    icon: Buildings2OutlineIcon,
    link: 'AssignExecutivesDepartment'
  },
  {
    title: 'branch',
    icon: BuildingsIcon,
    link: 'AssignExecutivesBranch'
  }
]
</script>

<template>
  <the-navigation :navs="navs" />
  <router-view />
</template>

<style scoped>

</style>
