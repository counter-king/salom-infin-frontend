<script setup>
// Core
import { computed } from 'vue'
// Components
import TheNavigation from '@/components/TheNavigation.vue'
// Stores
import { useCommonStore } from '@/stores/common'
import { formatDateReverse } from "@/utils/formatDate";
import { useRoute } from "vue-router";
// Composable
const commonStore = useCommonStore()
const route = useRoute()
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
    },
    query: {
      created_start_date: route.query.created_start_date || formatDateReverse(new Date()),
      created_end_date: route.query.created_end_date || formatDateReverse(new Date())
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
