<script setup>
// Core
import { ref } from 'vue'
// Components
import TheSidebar from '@/components/TheSidebar.vue'

const menus = ref([
  {
    title: "HR",
    prefix: true
  },
  {
    title: "Командировка",
    icon: "SchoolCaseIcon",
    link: "BusinessTripIndex",
    children: []
  }
])
</script>

<template>
  <div class="hr-view flex w-full">
    <the-sidebar :menus="menus" :icon-stroke="false" />

    <div class="flex flex-col flex-1 overflow-y-auto p-6">
      <router-view />
    </div>
  </div>
</template>

<style scoped>

</style>
