<script setup>
// Core
import { ref } from "vue"
import { useI18n } from "vue-i18n"
// Store
import { useAttendanceStore } from "@/modules/Dashboard/stores/attendance.store"
// Components
import LateDays from "@/modules/Dashboard/components/Attendance/LateDays.vue"

// Composable
const { t } = useI18n()
const store = useAttendanceStore()

// Methods
const onTabChange = (tab) => {
  store.tabItems.forEach(item => item.active = item.id === tab.id)
}

</script>

<template>
  <div class="flex flex-col shadow-button rounded-2xl bg-white p-5 pr-2 gap-y-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-x-5">
        <div
          v-for="item in store.tabItems"
          :key="item.id"
          class="text-base font-semibold hover:text-greyscale-900 cursor-pointer select-none"
          :class="item.active ? 'text-greyscale-900' : 'text-greyscale-300'"
          @click="onTabChange(item)"
        >
          {{ t(item.label) }}
        </div>
      </div>
    </div>

    <component
      :is="LateDays"
    />
  </div>
</template>

<style scoped>

</style>
