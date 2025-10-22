<script setup>
// Components
import AttendanceEntryHours from "@/modules/HR/modules/Attendance/components/AttendanceEntryHours.vue"
import AttendanceExitHours from "@/modules/HR/modules/Attendance/components/AttendanceExitHours.vue"

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
    required: true
  }
})
</script>

<template>
  <div class="attendance-status flex gap-x-1 items-center">
    <div class="w-1/2 border-r border-r-greyscale-300">
      <attendance-entry-hours :item="item" />
    </div>
    <div class="w-1/2">
      <attendance-exit-hours :item="item"/>
    </div>
  </div>
</template>

<style scoped>

</style>
