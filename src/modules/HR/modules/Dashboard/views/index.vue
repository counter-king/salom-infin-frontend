<script setup>
import { useHRDashboardStore } from '../stores'
import TheNavigation from '@/components/TheNavigation.vue'

const dashboardStore = useHRDashboardStore()
</script>

<template>
  <the-navigation :navs="dashboardStore.routes.children" />

  <router-view class="flex-1" />
</template>

<style scoped>

</style>
