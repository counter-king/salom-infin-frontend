<script setup>
// Components
import TheNavigation from '@/components/TheNavigation.vue'
// Stores
import { useAgreementsRoutesStore } from '../stores/routes.store'
// Composable
const agreementsRoutesStore = useAgreementsRoutesStore()
</script>

<template>
  <the-navigation :navs="agreementsRoutesStore.routes.children" />

  <router-view />
</template>
