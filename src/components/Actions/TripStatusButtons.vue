<script setup>
// Core
import { onMounted, ref } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute, useRouter } from "vue-router"

// Props
const props = defineProps({
  actionList: {
    type: Function,
    default: () => void 0
  },
})

// Composable
const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()

// Reactive
const tripStatuses = ref([
  {
    title_uz: "Boshlanmagan",
    title_ru: "Не начато",
    value: "not_started",
    active: false
  },
  {
    title_uz: "Xizmat safarida",
    title_ru: "В командировке",
    value: "on_trip",
    active: false
  },
  {
    title_uz: "Hisobot topshrish",
    title_ru: "Предоставление отчета",
    value: "reporting",
    active: false
  },
  {
    title_uz: "Yakunlangan",
    title_ru: "Закрыто",
    value: "closed",
    active: false
  },
  {
    title_uz: "Barchasi",
    title_ru: "Все",
    value: null,
    active: false
  }
])

// Methods
const onStatusChange = async (status) => {
  if (!route.query?.trip_status || route.query.trip_status !== status.value) {
    tripStatuses.value.forEach(item => item.active = item.value === status.value)
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
}
const init = () => {
  if (route.query?.trip_status) {
    tripStatuses.value.forEach(item => item.active = item.value === route.query?.trip_status)
  } else {
    tripStatuses.value.forEach(item => item.active = item.value === null)
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
      v-for="status in tripStatuses"
      :key="status.value"
      class="px-2 py-1 text-xs font-semibold rounded-lg cursor-pointer hover:text-primary-500 select-none"
      :class="status.active ? 'bg-primary-100 text-primary-500 border-primary-100' : 'bg-greyscale-50 text-greyscale-500 border-greyscale-200'"
      @click="onStatusChange(status)"
    >
      {{ locale === 'uz' ? status.title_uz : status.title_ru }}
    </div>
  </div>
</template>

<style scoped>

</style>
