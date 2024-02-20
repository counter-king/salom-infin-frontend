<script setup>
// Core
import { computed } from 'vue'
// Components
import TheNavigation from '@/components/TheNavigation.vue'
// Stores
import { useCommonStore } from '@/stores/common'
import { useDocFlowStore } from '../stores/docflow.store'
// Composable
const commonStore = useCommonStore()
const docFlowStore = useDocFlowStore()
// Computed
const routes = computed(() => {
  return commonStore.journalsList
  .filter(journal => journal.is_active)
  .map(journal => ({
    ...journal,
    title: journal.name,
    link: 'RegistrationList',
    params: {
      code: journal.code
    }
  }))
})
</script>

<template>
  <the-navigation :navs="routes" />

  <router-view />
</template>

<style scoped>

</style>
