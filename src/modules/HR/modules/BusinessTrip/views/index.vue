<script setup>
// Components
import TheNavigation from '@/components/TheNavigation.vue'
import { Buildings2OutlineIcon, ClipboardCheckIcon, SettingsIcon } from '@/components/Icons'

const navs = [
  {
    title: 'business-trip',
    icon: Buildings2OutlineIcon,
    link: 'BusinessTripList',
  },
  {
    title: 'settings',
    icon: SettingsIcon,
    link: 'BusinessTripSettings',
  }
]
</script>

<template>
  <the-navigation :navs="navs" />
  <router-view />
</template>

<style scoped>

</style>
