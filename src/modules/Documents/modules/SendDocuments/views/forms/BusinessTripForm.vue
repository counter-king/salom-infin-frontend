<script setup>
// Core
import { computed, onMounted } from "vue"
import {useVuelidate} from "@vuelidate/core"
import {useRoute, useRouter} from "vue-router"
import {useI18n} from "vue-i18n"
// Enums
import { FORM_TYPE_CREATE } from "@/constants/constants"
// Components
import {LayoutWithTabsCompose} from "@/components/DetailLayout"
import { TripInfo, WorkPlan, Route } from "@/modules/Documents/modules/SendDocuments/views/forms/FormComponents"
// Utils
// Store
import {useAuthStore} from "@/modules/Auth/stores"
import { useBusinessTripStore } from "@/modules/Documents/modules/SendDocuments/stores/businessTrip.store"
import { STEPPER_TRIP_INFO, STEPPER_WORK_PLAN, STEPPER_ROUTE } from "@/modules/Documents/modules/SendDocuments/constants"

const props = defineProps({
  formType: {
    type: String,
    default: FORM_TYPE_CREATE
  }
})

// Composable
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const store = useBusinessTripStore()
const $v = useVuelidate(store.rules, store.model)

// Computed
const title = computed(() => {
  const isCreate = props.formType === FORM_TYPE_CREATE
  return isCreate ? 'create-business-trip-notice' : 'update-business-trip-notice'
})

const selectedComponent = computed(() => {
  switch (route.query.step) {
    case STEPPER_TRIP_INFO:
      return TripInfo
    case STEPPER_WORK_PLAN:
      return WorkPlan
    case STEPPER_ROUTE:
      return Route
    default:
      return TripInfo
  }
})

// Methods
const onStepClick = async (item) => {
  if (route.query?.step !== item.value) {
    store.stepperItems.forEach(step => step.active = step.id === item.id)
    await router.replace({
      query: {
        ...route.query,
        step: item.value
      }
    })
  }
}
const init = async () => {
  if (!route.query.step) {
    await router.replace({
      query: {
        ...route.query,
        step: STEPPER_TRIP_INFO
      }
    })
  }

  store.stepperItems.forEach(step => step.active = step.value === route.query.step)
}

// Hooks
onMounted(async () => {
  await init()
})
</script>

<template>
  <div class="business-trip-form-v2">
    <template v-if="store.detailLoading">
      <base-spinner/>
    </template>

    <template v-else>
      <layout-with-tabs-compose
        :title="title"
      >
        <template #content>
          <div class="py-4 px-6 border-b-[1.5px] border-greyscale-200">
            <base-stepper
              :items="store.stepperItems"
              @emit:step-click="onStepClick"
            />
          </div>

          <div class="px-6 py-4">
            <component
              :is="selectedComponent"
            />
          </div>
        </template>
      </layout-with-tabs-compose>
    </template>
  </div>
</template>

<style scoped>

</style>
