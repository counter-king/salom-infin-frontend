<script setup>
// Core
import { ref } from 'vue'
// Components
import TheNavigation from '@/components/TheNavigation.vue'
import { WidgetAddLinearIcon } from '@/components/Icons'
// Reactive
const navs = ref([
  {
    title: "department-assignment-setting",
    icon: WidgetAddLinearIcon,
    link: "DepartmentAssignmentSettings",
    permission: 'department-assignment-setting',
  }
])
</script>

<template>
  <the-navigation :navs="navs"/>

  <router-view/>
</template>

<style scoped>

</style>
