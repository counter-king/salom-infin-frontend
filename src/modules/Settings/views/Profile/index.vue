
<script setup>
// Stores
import { profileStore } from '../../stores/profile/index.store'
// Components
import TheNavigation from '@/components/TheNavigation.vue'
// Composable
const profile = profileStore()
</script>

<template>
  <the-navigation :navs="profile.routes.children" />

  <router-view />
</template>
<style></style>
