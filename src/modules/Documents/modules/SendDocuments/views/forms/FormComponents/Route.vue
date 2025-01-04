<script setup>
// Core
import { computed, ref } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute, useRouter } from "vue-router"
import { useVuelidate } from "@vuelidate/core"
// Enums
import {
  MULTI_CITY,
  ROUND_TRIP, ROUTE_SD_DETAIL, ROUTE_SD_LIST,
  STEPPER_WORK_PLAN,
  TRANSPORT_CLASS_LIST
} from "@/modules/Documents/modules/SendDocuments/constants"
import { COLOR_TYPES, JOURNAL } from "@/enums"
import { FORM_TYPE_CREATE } from "@/constants/constants"
// Store
import { useAuthStore } from "@/modules/Auth/stores"
import { useBusinessTripStore } from "@/modules/Documents/modules/SendDocuments/stores/businessTrip.store"
import { useCommonStore } from "@/stores/common"
import { useCountStore } from "@/stores/count.store"
// Utils
import { formatDateReverse } from "@/utils/formatDate"
import { dispatchNotify } from "@/utils/notify"
import { adjustUsersToArray } from "@/utils"
import { adjustDateTime } from "@/modules/Documents/modules/SendDocuments/utils"
// Components
import BaseBrickRadio from "@/components/UI/BaseBrickRadio.vue"
import BaseTimePicker from "@/components/UI/BaseTimePicker.vue"
import PreviewDialog from "@/modules/Documents/modules/SendDocuments/components/PreviewDialog.vue"
import UserMultiSelect from "@/components/Select/UserMultiSelect.vue"
import { AddPlusIcon, InfoCircleBoldIcon, TrashBinTrashBoldIcon } from "@/components/Icons"
import { BusinessTripTemplate } from "@/components/Templates"
import { UserWithRadio } from "@/components/Users"
import BaseIconify from "@/components/UI/BaseIconify.vue"

// Props
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
const store = useBusinessTripStore()
const commonStore = useCommonStore()
const authStore = useAuthStore()
const countStore = useCountStore()
const $v = useVuelidate(store.booking_model_rules, store.booking_model)
const $vTripInfo = useVuelidate(store.rules, store.model)
const $vWorkPlan = useVuelidate(store.trip_plan_rules, store.trip_plan_model)

// Reactive
const dialog = ref(false)
const showNestedError = ref(false)

// Computed
const users = computed(() => {
  const seenIds = new Set()
  return store.model.__groups
    .reduce((acc, obj) => {
      if (obj.__users && Array.isArray(obj.__users)) {
        return acc.concat(obj.__users)
      }
      return acc
    }, [])
    .filter((user) => {
      if (seenIds.has(user.id)) {
        return false
      }
      seenIds.add(user.id)
      return true
    })
})

// Methods
const onRouteTabChange = (item) => {
  store.routeTabItems.forEach(route => route.active = route.id === item.id)
}
const onRouteTypeTabChange = (item, index) => {
  store.routeTypeTabItems.forEach(route => route.active = route.id === item.id)
  store.actionChangeRouteSegment(item.value, index)
}
const stepClick = async (step) => {
  // const valid = await $v.value.$validate()
  // showNestedError.value = true
  // if (!valid) {
  //   dispatchNotify(null, t('fill-required-fields'), COLOR_TYPES.WARNING)
  //   return
  // }

  await store.actionStepClick(router, route, step)
}
const addRoute = () => {
  store.actionAddRouteRow()
  showNestedError.value = false
}
const onDepartureRegionChange = (value, parentIndex, childIndex, booking) => {
  if (booking.type === ROUND_TRIP) {
    store.booking_model.bookings[parentIndex].segments[childIndex + 1].arrival_city = value
  }
}
const onArrivalRegionChange = (value, parentIndex, childIndex, booking) => {
  if (booking.type === ROUND_TRIP) {
    store.booking_model.bookings[parentIndex].segments[childIndex + 1].departure_city = value
  }
}
const preview = async () => {
  const valid = await $v.value.$validate()
  showNestedError.value = true
  const validTripInfo = await $vTripInfo.value.$validate()
  const validWorkPlan = await $vWorkPlan.value.$validate()
  if (!valid) {
    dispatchNotify(null, t('fill-required-fields'), COLOR_TYPES.WARNING)
    return
  }
  if (!validTripInfo) {
    dispatchNotify(null, `${t('trip-info')} - ${t('fill-required-fields')}`, COLOR_TYPES.WARNING)
    return
  }
  if (!validWorkPlan) {
    dispatchNotify(null, `${t('work-plan')} - ${t('fill-required-fields')}`, COLOR_TYPES.WARNING)
    return
  }

  store.model.approvers = []
  store.model.signers = []
  store.model.notices = []
  store.model.bookings = []
  store.model.trip_plans = []
  store.model.approvers = adjustUsersToArray(store.model.__approvers)
  store.model.signers = adjustUsersToArray(store.model.__signers)
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
        regions: group.__regions.map(r => r.id),
        tags: group.__tags.map(t => ({ id: t.id })),
        group_id
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
      departure_date: adjustDateTime(segment.date, segment.time, 0),
      departure_end_date: adjustDateTime(segment.date, segment.time, 1),
      segment_class: segment.segment_class.value
    })),
    passengers: item.passengers.map(passenger => ({ user: passenger.id }))
  }))

  store.model.trip_plans = store.trip_plan_model.trip_plans.map(plan => ({
    users: plan.users.map(user => ({ id: user.id })),
    text: plan.text
  }))

  dialog.value = true
}

const create = async () => {
  const response = await store.actionCreateDocument(store.model)
  if (response) {
    dialog.value = false
    dispatchNotify(null, t('document-sent'), COLOR_TYPES.SUCCESS)
    await router.replace({
      name: ROUTE_SD_LIST,
      query: {
        document_type: route.query.document_type
      }
    })
  }
  else {
    dispatchNotify(null, t('error-occurred'), COLOR_TYPES.ERROR)
  }
}
const update = async () => {
  try {
    await store.actionUpdateDocument(
      {
        id: route.params.id,
        body: store.model
      }
    )
    await countStore.actionCountList();
    dispatchNotify(null, t('changed'), COLOR_TYPES.SUCCESS)
    await router.replace({
      name: ROUTE_SD_DETAIL,
      params: {
        id: route.params.id,
        document_type: route.params.document_type,
        document_sub_type: route.params.document_sub_type
      }
    })
  } catch (err) {

  }
}
const manage = () => {
  if (props.formType === FORM_TYPE_CREATE) {
    create()
  } else {
    update()
  }
}

// Expose
defineExpose({
  stepClick
})
</script>

<template>
  <div class="route-component flex flex-col gap-y-3">
    <div
      v-for="(item, index) in store.booking_model.bookings"
      class="border-[1.5px] border-greyscale-200 rounded-2xl px-5 py-4"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-x-4">
          <span class="text-base text-primary-900 font-semibold mb-1">{{ t('route') }}-{{ index + 1 }}</span>

          <base-brick-radio
            v-model="item.route"
            :items="store.routeTabItems"
            @emit:on-change="(routeTab) => onRouteTabChange(routeTab)"
          />

          <base-brick-radio
            v-model="item.type"
            :items="store.routeTypeTabItems"
            @emit:on-change="(routeTypeTab) => onRouteTypeTabChange(routeTypeTab, index)"
          />
        </div>

        <div
          v-if="index !== 0"
          class="flex justify-center items-center bg-critic-50 rounded-lg w-7 h-7 cursor-pointer"
          @click="store.actionDeleteRouteRow"
        >
          <base-iconify :icon="TrashBinTrashBoldIcon" class="text-critic-500 !w-4 !h-4" />
        </div>
      </div>

      <div class="flex items-center rounded-lg p-2 gap-x-2 bg-warning-50 border border-warning-100 mt-3 mb-2">
        <base-iconify :icon="InfoCircleBoldIcon" class="text-warning-500" />

        <span class="text-xs text-greyscale-900 font-medium">{{ t('route-warning') }}</span>
      </div>

      <div
        v-for="(subItem, subIndex) in item.segments"
      >
        <base-row>
          <base-col col-class="w-1/5">
            <base-dropdown
              v-model="subItem.departure_city"
              :error="$v.bookings.$each.$response.$data[index].segments.$each.$data[subIndex].departure_city"
              v-model:options="commonStore.regionsList"
              required
              searchable
              api-url="regions"
              label="where-from"
              placeholder="choose-one"
              menu-placeholder="search"
              option-label="name"
              :show-nested-error="showNestedError"
              :disabled="item.type === ROUND_TRIP && subIndex % 2 !== 0"
              @emit:change="value => onDepartureRegionChange(value, index, subIndex, item)"
            >
              <template #option="{ option }">
                <user-with-radio
                  :title="option.name"
                  :text-truncate="false"
                >
                </user-with-radio>
              </template>
            </base-dropdown>
          </base-col>

          <base-col col-class="w-1/5">
            <base-dropdown
              v-model="subItem.arrival_city"
              :error="$v.bookings.$each.$response.$data[index].segments.$each.$data[subIndex].arrival_city"
              v-model:options="commonStore.regionsList"
              required
              searchable
              api-url="regions"
              label="where-to"
              placeholder="choose-one"
              menu-placeholder="search"
              option-label="name"
              :show-nested-error="showNestedError"
              :disabled="item.type === ROUND_TRIP && subIndex % 2 !== 0"
              @emit:change="value => onArrivalRegionChange(value, index, subIndex, item)"
            >
              <template #option="{ option }">
                <user-with-radio
                  :title="option.name"
                  :text-truncate="false"
                >
                </user-with-radio>
              </template>
            </base-dropdown>
          </base-col>

          <base-col col-class="w-1/5">
            <base-dropdown
              v-model="subItem.segment_class"
              :error="$v.bookings.$each.$response.$data[index].segments.$each.$data[subIndex].segment_class"
              v-model:options="TRANSPORT_CLASS_LIST"
              required
              label="class"
              placeholder="choose-one"
              option-label="name"
              :show-nested-error="showNestedError"
              translatable
            >
              <template #option="{ option }">
                <user-with-radio
                  :title="option.name"
                  :text-truncate="false"
                >
                </user-with-radio>
              </template>
            </base-dropdown>
          </base-col>

          <base-col col-class="w-1/5">
            <base-calendar
              v-model="subItem.date"
              :error="$v.bookings.$each.$response.$data[index].segments.$each.$data[subIndex].date"
              :min-date="new Date()"
              required
              label="date"
              placeholder="choose-start-time"
              :show-nested-error="showNestedError"
              @update:modelValue="(value) => subItem.date = formatDateReverse(value)"
            />
          </base-col>

          <base-col col-class="w-1/5 flex gap-x-2 items-end">
            <base-time-picker
              v-model="subItem.time"
              :error="$v.bookings.$each.$response.$data[index].segments.$each.$data[subIndex].time"
              label="time"
              required
              range
              :show-nested-error="showNestedError"
            />

            <div
              v-if="item.type === MULTI_CITY && subIndex !== 0"
              class="flex justify-center items-center bg-critic-50 rounded-lg w-5 h-5 cursor-pointer"
              @click="store.actionDeleteRouteLine(index, subIndex)"
            >
              <base-iconify :icon="TrashBinTrashBoldIcon" class="text-critic-500 !w-3 !h-3" />
            </div>
          </base-col>
        </base-row>
      </div>

      <div
        v-if="item.type === MULTI_CITY"
        class="flex items-center gap-x-1 mt-1 mb-2 cursor-pointer w-fit"
        @click="store.actionAddRouteLine(index)"
      >
        <base-iconify :icon="AddPlusIcon" class="text-primary-500" />
        <span class="text-sm text-primary-500 font-semibold">{{ t('add-line') }}</span>
      </div>

      <base-row>
        <base-col col-class="w-full">
          <user-multi-select
            v-model="item.passengers"
            :options="users"
            :error="$v.bookings.$each.$response.$data[index].passengers"
            label="employees"
            placeholder="select-employees"
            required
            :show-nested-error="showNestedError"
          />
        </base-col>
      </base-row>
    </div>

    <base-button
      color="bg-primary-30 hover:bg-primary-100 text-primary-500"
      border-color="border-transparent"
      label="add-more"
      icon-color="#767994"
      :icon-left="AddPlusIcon"
      root-classes=""
      type="button"
      shadow
      class="rounded-[10px] w-fit"
      @click="addRoute"
    />

    <div class="flex items-center justify-between mt-10">
      <base-button
        label="save-as-draft"
        color="bg-primary-0 hover:bg-greyscale-100 text-primary-dark"
        rounded
        shadow
        border-color="border-transparent"
      />

      <div class="flex items-center gap-x-1">
        <base-button
          label="previous-stage"
          rounded
          shadow
          border-color="border-transparent"
          class="ml-2"
          @click="stepClick(STEPPER_WORK_PLAN)"
        />

        <base-button
          label="preview"
          rounded
          shadow
          border-color="border-transparent"
          class="ml-2"
          @click="preview"
        />
      </div>
    </div>

    <!-- PREVIEW -->
    <preview-dialog
      v-model="dialog"
      :send-button-loading="store.buttonLoading"
      @emit:send="manage"
    >
      <template #content>
        <business-trip-template
          :compose-model="{
            ...store.model,
            bookings: store.booking_model.bookings,
            trip_plans: store.trip_plan_model.trip_plans
          }"
          :preview="true"
        />
      </template>
    </preview-dialog>
  </div>
</template>

<style scoped>

</style>
