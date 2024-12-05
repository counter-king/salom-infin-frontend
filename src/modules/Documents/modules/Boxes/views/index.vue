<script setup>
// Components
import TheNavigation from '@/components/TheNavigation.vue'
// Stores
import { useBoxesCommonStore } from '../stores/common.store'
// Composable
const boxesStore = useBoxesCommonStore()
</script>

<template>
  <the-navigation :navs="boxesStore.routes.children" />

  <router-view class="flex-1" />
</template>

<style scoped>

</style>
