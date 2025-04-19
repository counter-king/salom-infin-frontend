<script setup>
// Core
import { onMounted, ref } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute, useRouter } from "vue-router"
// Store
import { useBusinessTripStore } from "@/modules/HR/modules/BusinessTrip/stores/businessTrip.store"

// Props
const props = defineProps({
  actionList: {
    type: Function,
    default: () => void 0
  },
})

// Composable
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const store = useBusinessTripStore()



// Methods
const onStatusChange = async (status) => {
  if (!route.query?.trip_status || route.query.trip_status !== status.value) {
    store.tripStatuses.forEach(item => item.active = item.value === status.value)
    await router.replace({
      query: {
        ...route.query,
        page: 1,
        page_size: 10,
        first_row: 0,
        trip_status: status.value
      }
    })
    await props.actionList(route.query)
  }
  else if (status.active) {
    store.tripStatuses.forEach(item => item.active = item.value === null)
    await router.replace({
      query: {
        page: 1,
        page_size: 10,
        first_row: 0
      }
    })
    await props.actionList(route.query)
  }
}
const init = () => {
  if (route.query?.trip_status) {
    store.tripStatuses.forEach(item => item.active = item.value === route.query?.trip_status)
  } else {
    store.tripStatuses.forEach(item => item.active = item.value === null)
  }
}

// Hooks
onMounted(() => {
  init()
})
</script>

<template>
  <div class="trip-status-buttons flex gap-x-1">
    <div
      v-for="status in store.tripStatuses"
      :key="status.value"
      class="px-2 py-1 text-xs font-semibold rounded-lg cursor-pointer hover:text-primary-500 select-none"
      :class="status.active ? 'bg-primary-100 text-primary-500 border-primary-100' : 'bg-greyscale-50 text-greyscale-500 border-greyscale-200'"
      @click="onStatusChange(status)"
    >
      {{ t(status.label) }}
    </div>
  </div>
</template>

<style scoped>

</style>
