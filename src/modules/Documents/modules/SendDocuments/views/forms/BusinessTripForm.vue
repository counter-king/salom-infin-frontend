<script setup>
// Core
import { computed, onBeforeMount, onMounted, onUnmounted, ref, unref } from "vue"
import {useVuelidate} from "@vuelidate/core"
import {useRoute, useRouter} from "vue-router"
import {useI18n} from "vue-i18n"
// Enums
import { FORM_TYPE_CREATE, FORM_TYPE_UPDATE } from "@/constants/constants"
// Components
import {LayoutWithTabsCompose} from "@/components/DetailLayout"
import { TripInfo, WorkPlan, Route, Decree } from "@/modules/Documents/modules/SendDocuments/views/forms/FormComponents"
// Utils
// Store
import {useAuthStore} from "@/modules/Auth/stores"
import { useBusinessTripStore } from "@/modules/Documents/modules/SendDocuments/stores/businessTrip.store"
import {
  STEPPER_TRIP_INFO,
  STEPPER_WORK_PLAN,
  STEPPER_ROUTE,
  STEPPER_DECREE
} from "@/modules/Documents/modules/SendDocuments/constants"
import { dispatchNotify } from "@/utils/notify";
import { COLOR_TYPES, COMPOSE_DOCUMENT_SUB_TYPES, COMPOSE_DOCUMENT_TYPES, JOURNAL } from "@/enums";
import { adjustUsersToArray } from "@/utils";
import { adjustDateTime } from "@/modules/Documents/modules/SendDocuments/utils";

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
const $vTripInfo = useVuelidate(store.rules, store.model)
const $vWorkPlan = useVuelidate(store.trip_plan_rules, store.trip_plan_model)
const $vBooking = useVuelidate(store.booking_model_rules, store.booking_model)
const $vDecree = useVuelidate(store.decreeRules, store.decreeModel)

// Reactive
const childComponent = ref(null)

// Computed
const title = computed(() => {
  const isCreate = props.formType === FORM_TYPE_CREATE
  return isCreate ? 'create-business-trip-notice' : 'update-business-trip-notice'
})

const selectedComponent = computed(() => {
  switch (route.query.step) {
    case STEPPER_TRIP_INFO:
      return TripInfo
    case STEPPER_DECREE:
      return Decree
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
  const _childComponent = unref(childComponent)
  if (route.query?.step !== item.value) {
    await _childComponent.stepClick(item.value)
    if (item.value === STEPPER_DECREE) {
      await validateAndSendNotice()
      await dispatchNotify(null, t('notice-saved-successfully'), COLOR_TYPES.SUCCESS)
    }
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
const validateAndSendNotice = async () => {
  const approvers = adjustUsersToArray(store.model.__approvers)
  const signers = adjustUsersToArray(store.model.__signers)

  store.model.approvers = []
  store.model.signers = []
  store.model.notices = []
  store.model.bookings = []
  store.model.trip_plans = []
  store.model.approvers = approvers
  store.model.signers = signers
  store.model.curator = store.model?.__curator?.user_id
  store.model.journal = JOURNAL.INNER
  store.model.company = authStore.currentUser?.company?.id

  store.model.__groups.forEach((group, index) => {
    const group_id = index + 1
    store.model.notices.push(
      ...group.__users.map(user => ({
        start_date: group.__start_date,
        end_date: group.__end_date,
        user: user.id,
        company: authStore.currentUser?.company?.id,
        regions: group.__regions.map(r => r.id),
        tags: group.__tags.map(t => ({ id: t.id })),
        group_id,
        ...(user.business_trip_id ? { id: user.business_trip_id } : {})
      }))
    )
  })

  store.model.sender = authStore?.currentUser?.top_level_department?.id
  store.model.files = store.model.__files.map(item => { return { id: item.id } })
  store.model.document_type = route.params.document_type
  store.model.document_sub_type = route.params.document_sub_type

  store.model.bookings = store.booking_model.bookings.map(item => ({
    ...item,
    segments: item.segments.map(segment => ({
      departure_city: segment.departure_city.id,
      arrival_city: segment.arrival_city.id,
      departure_date: `${segment.date}T${segment.time?.hours}:${segment.time?.minutes}:00+05:00`,
      departure_end_date: null,
      // departure_date: adjustDateTime(segment.date, segment.time, 0),
      // departure_end_date: adjustDateTime(segment.date, segment.time, 1),
      segment_class: segment.segment_class.value
    })),
    passengers: item.passengers.map(passenger => ({ user: passenger.id }))
  }))

  store.model.trip_plans = store.trip_plan_model.trip_plans.map(plan => ({
    users: plan.users.map(user => ({ id: user.id })),
    text: plan.text
  }))

  if (props.formType === FORM_TYPE_CREATE && route.query.notice_id) {
    try {
      await store.actionUpdateDocument(
        {
          id: route.query.notice_id,
          body: store.model
        }
      )
    } catch (err) {}
  } else if (props.formType === FORM_TYPE_CREATE) {
    try {
      const { data } = await store.actionCreateDocument(store.model)

      const model = {
        approvers: [],
        signers: [],
        curator: store.model?.__curator?.user_id,
        journal: JOURNAL.ORDERS_PROTOCOLS,
        company: authStore.currentUser.company.id,
        sender: authStore?.currentUser?.top_level_department?.id,
        document_type: COMPOSE_DOCUMENT_TYPES.DECREE,
        document_sub_type: COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_DECREE_V2,
        short_description: store.model?.short_description,
        trip_notice_id: data.id,
        content: data.content
      }
      store.decreeModel.content = data.content
      try {
        const res = await store.actionCreateDocument(model)
        store.decreeModel.id = res?.data?.id
        await router.replace({
          query: {
            ...route.query,
            notice_id: data.id
          }
        })

        await store.actionGetDocumentDetailForUpdate(data.id)
      } catch (err){}
    } catch (err) {}
  } else if (props.formType === FORM_TYPE_UPDATE && route.params.id) {
    try {
      await store.actionUpdateDocument(
        {
          id: route.params.id,
          body: store.model
        }
      )
    } catch (err) {}
  }
}

const onValidateAndSend = async () => {
  try {
    await validateAndSendNotice()
    await dispatchNotify(null, t('notice-saved-successfully'), COLOR_TYPES.SUCCESS)
  } catch (err) {}
}

// Hooks
onBeforeMount(async () => {
  await init()
  if (props.formType === FORM_TYPE_UPDATE) {
    await store.actionGetDocumentDetailForUpdate(route.params.id)
  } else if (route.query.notice_id) {
    await store.actionGetDocumentDetailForUpdate(route.query.notice_id)
  }
})

onUnmounted(() => {
  store.actionResetBTModel()
})
</script>

<template>
  <div
    class="business-trip-form-v2"
    :class="{'h-[calc(100vh-200px)]' : store.detailLoading}"
  >
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
              :form-type="formType"
              ref="childComponent"
              @emit:onValidateAndSend="onValidateAndSend"
            />
          </div>
        </template>
      </layout-with-tabs-compose>
    </template>
  </div>
</template>

<style scoped>

</style>
