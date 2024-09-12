<script setup>
// Core
import { ref } from 'vue'
// Components
import { CaseIcon, UserIcon, SettingsMinimalisticIcon } from '@/components/Icons'
import TheSidebar from '@/components/TheSidebar.vue'
// Stores
import { useAgreementsRoutesStore } from '../modules/Agreements/stores/routes.store'
// Composable
const agreementsRoutesStore = useAgreementsRoutesStore()

const menus = ref([
  {
    title: "HR",
    prefix: true
  },
  {
    title: 'Мой профиль',
    icon: UserIcon,
    link: 'ProfileIndex',
    children: []
  },
  {
    title: "Командировка",
    icon: CaseIcon,
    link: "BusinessTripIndex",
    children: []
  },
  agreementsRoutesStore.routes,
  {
    title: "Настройки согласия",
    icon: SettingsMinimalisticIcon,
    link: "AgreementSettingsIndex",
    children: []
  },
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
