<script setup>
// cores
import { computed } from 'vue'
// Components
import TheNavigation from '@/components/TheNavigation.vue'
import { Buildings2OutlineIcon, SettingsIcon } from '@/components/Icons'
// stores
import { useAuthStore } from '@/modules/Auth/stores'

// Composable
const authStore = useAuthStore()

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

const filterNavs = computed(() => {
  return navs.filter(nav => nav.link == 'BusinessTripList' || authStore.currentUser?.is_superuser || authStore.currentUser?.table_number === '145105')
})

</script>

<template>
  <the-navigation :navs="filterNavs"  />
  <router-view />
</template>

<style scoped>

</style>
