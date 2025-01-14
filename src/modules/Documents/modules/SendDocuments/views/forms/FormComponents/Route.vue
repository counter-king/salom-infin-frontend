<script setup>
// Core
import { computed, ref } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute, useRouter } from "vue-router"
import { useVuelidate } from "@vuelidate/core"
// Enums
import {
  BY_CAR, BY_PLANE,
  CAR_CLASS_LIST,
  MULTI_CITY, PLANE_CLASS_LIST,
  ROUND_TRIP, ROUTE_SD_DETAIL, ROUTE_SD_LIST, STEPPER_DECREE,
  STEPPER_WORK_PLAN, TRAIN_CLASS_LIST
} from "@/modules/Documents/modules/SendDocuments/constants"
import { COLOR_TYPES, COMPOSE_DOCUMENT_SUB_TYPES, COMPOSE_DOCUMENT_TYPES, JOURNAL } from "@/enums"
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
import { BusinessTripTemplate, MultipleTemplates } from "@/components/Templates"
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
  const valid = await $v.value.$validate()
  showNestedError.value = true
  if (!valid) {
    dispatchNotify(null, t('fill-required-fields'), COLOR_TYPES.WARNING)
    return
  }

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
const onSegmentClassChange = (value, parentIndex, childIndex, booking) => {
  if (booking.type === ROUND_TRIP) {
    store.booking_model.bookings[parentIndex].segments[childIndex + 1].segment_class = value
  }
}

const validateAndSend = () => {
  stepClick(STEPPER_DECREE)
  emit('emit:onValidateAndSend')
}

// Emits
const emit = defineEmits(['emit:onValidateAndSend'])

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
              :options="item.route === BY_CAR ? CAR_CLASS_LIST : item.route === BY_PLANE ? PLANE_CLASS_LIST : TRAIN_CLASS_LIST"
              required
              label="class"
              placeholder="choose-one"
              option-label="name"
              :show-nested-error="showNestedError"
              translatable
              :disabled="item.type === ROUND_TRIP && subIndex % 2 !== 0"
              @emit:change="value => onSegmentClassChange(value, index, subIndex, item)"
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
          label="next-step"
          rounded
          shadow
          border-color="border-transparent"
          class="ml-2"
          :loading="store.buttonLoading"
          @click="validateAndSend"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
