<script setup>
// Core
import { computed } from "vue"
import { useI18n } from "vue-i18n"
// Enums
import { TRIP_STATUSES } from "@/enums"
// Store
import { useBusinessTripStore } from "@/modules/HR/modules/BusinessTrip/stores/businessTrip.store"

const props = defineProps({
  status: {
    type: String,
    default: '',
  }
})

// Composable
const store = useBusinessTripStore()
const { t, locale } = useI18n()

const label = computed(() => {
  const statusObject = store.tripStatuses.find(item => item.value === props.status)
  return t(statusObject.label)
})

const classes = computed(() => {
  switch (props.status) {
    case 'not_started':
      return "bg-greyscale-50 text-greyscale-500 border-greyscale-200"
    case 'on_trip':
      return 'bg-info-50 text-info-500 border-info-100'
    case 'reporting':
      return "bg-warning-50 text-warning-500 border-warning-500"
    default:
      return "bg-success-50 text-success-500 border-success-500"
  }
})
</script>

<template>
<span
  class="px-2 py-1 text-xs font-semibold rounded-lg"
  :class="classes"
>
    <slot>
      {{ label }}
    </slot>
  </span>
</template>

<style scoped>

</style>
