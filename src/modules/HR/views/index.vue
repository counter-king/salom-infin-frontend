<script setup>
// Core
import { ref } from 'vue'
// Components
import { CaseIcon, UserIcon, SettingsMinimalisticIcon, DocumentAddIcon, CheckCircleIcon, HomeSmileAngleIcon, BoltLinearIcon, ChecklistMinimalisticLinearIcon, UserSpeakRoundedLinearIcon } from '@/components/Icons'
import TheSidebar from '@/components/TheSidebar.vue'
import TheFooter from '@/components/TheFooter.vue';
// Stores
import { useAgreementsRoutesStore } from '../modules/Agreements/stores/routes.store'
import { useAuthStore } from '@/modules/Auth/stores'
// Composable
const agreementsRoutesStore = useAgreementsRoutesStore()
const authStore = useAuthStore()

const menus = ref([
  {
    title: "HR",
    prefix: true,
  },
  {
    title: 'my-profile',
    icon: UserIcon,
    link: 'ProfileIndex',
    children: [],
  },
  {
    title: "attendance",
    icon: CheckCircleIcon,
    link: "AttendanceIndex",
    children: [],
    roles: ["hr"]
  },
  {
    title: "leader-panel",
    icon: UserSpeakRoundedLinearIcon,
    link: "LeaderPanelIndex",
    children: [],
  },
  {
    title: "my-activities",
    icon: BoltLinearIcon,
    link: "MyActivitiesIndex",
  },
  {
    title: "business-trip",
    icon: CaseIcon,
    link: "BusinessTripIndex",
    children: [],
  },
  agreementsRoutesStore.routes,
  // {
  //   title: "agreement-settings",
  //   icon: SettingsMinimalisticIcon,
  //   link: "AgreementSettingsIndex",
  //   children: [],
  // },
  // {
  //   title: "dashboard",
  //   icon: HomeSmileAngleIcon,
  //   link: "HrDashboardIndex",
  //   children: []
  // },
  // {
  //   title: 'tests-surveys',
  //   icon: ArchiveDownMinimlisticOutlineIcon,
  //   link: 'TestsSurveyIndex',
  //   children: [],
  // },
])

if(authStore.currentUser.is_superuser || authStore.currentUser.id == 3104 || authStore.currentUser?.roles?.some(role => role.name === "hr")) {
  menus.value.push({
    title: "interaction-with-abs2",
    icon: DocumentAddIcon,
    link: "InteractionABSIndex",
    children: []
  })

  menus.value.push({
    title: "agreement-settings",
    icon: SettingsMinimalisticIcon,
    link: "AgreementSettingsIndex",
    children: [],
  })
}

</script>

<template>
  <div class="hr-view flex w-full">
    <the-sidebar :menus="menus" :icon-stroke="false" />

    <div class="flex flex-col flex-1 overflow-y-auto p-6 pb-2">
      <router-view />
      <div class="mt-auto">
        <the-footer/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
