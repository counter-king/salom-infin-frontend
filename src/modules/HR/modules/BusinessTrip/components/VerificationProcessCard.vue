<script setup>
// Core
import {computed, ref} from "vue"
import {useI18n} from "vue-i18n"
import {useRoute} from "vue-router"
// Store
import {useBusinessTripStore} from "@/modules/HR/modules/BusinessTrip/stores/businessTrip.store"
// Components
import {
  AltArrowDownIcon,
  ArrowLeftDownIcon,
  ArrowRightUpIcon,
  MapPointBoldIcon,
  ReplyLinearIcon, TrashBinTrashIcon
} from "@/components/Icons"
import {formatDateHour} from "@/utils/formatDate";
import {useAuthStore} from "@/modules/Auth/stores";
import {VerificationConfirmationModal} from "@/modules/HR/modules/BusinessTrip/components/index"
import { extractCountryAndCity, formatUserFullName } from "../../../../../utils";
import BaseIconify from "@/components/UI/BaseIconify.vue";
import { dispatchNotify } from "@/utils/notify";
import { COLOR_TYPES } from "@/enums";
import { DeleteModal } from "@/modules/HR/modules/BusinessTrip/views/Settings/components/TripPrupose";
import { fetchDeleteVisitedPlace } from "@/modules/HR/modules/BusinessTrip/services";

const props = defineProps({
  item: {
    type: Object
  },
  verifications: {
    type: Array,
    default: () => []
  },
  index: {
    type: [Number, String],
    default: null
  }
})

const { t } = useI18n()
const route = useRoute()
const currentUser = useAuthStore().currentUser
const BTStore = useBusinessTripStore()

// Reactive
const confirmModal = ref(null)
const dialog = ref(null)
const deleteDialog = ref(false)
const deleteLoading = ref(false)
const deletingPlaceId = ref(null)

// Computed
const isLeft = computed(() => {
  return props.item.left_at
})
const isSenderOffice = computed(() => {
  return props.item.is_sender
})
const buttonText = computed(() => {
  return 'left'
})
const buttonVisible = computed(() => {
  return props.item.arrived_at && !props.item.left_at && (props.item?.company?.id === currentUser?.company.id)
})
const itemId = computed(() => {
  return props.verifications.find(item => item?.company?.id === currentUser.company?.id).id
})
const buttonVisibleForSenderOffice = computed(() => {
  return !props.item.arrived_at && isSenderOffice.value && allVerified.value
})
const allVerified = computed(() => {
  const filteredEntries = props.verifications.filter(entry => !entry.is_sender)
  return filteredEntries.every(entry => entry.arrived_at && entry.left_at)
})
const leftResetVisible = computed(() => {
  const filteredEntries = props.verifications.filter(entry => !entry.is_sender)
  const hasValue = filteredEntries.some(item => item.left_at || item.arrived_at)
  const sender = props.verifications?.find(item => item.is_sender)
  return props.item?.left_at && (!props.item?.is_sender || !hasValue) && !sender.arrived_at
})
const arrivedResetVisible = computed(() => {
  return props.item?.arrived_at && !props.item?.left_at
})

// Methods
const onConfirm = async () => {
  try {
    await BTStore.actionResetTripVerification()
    dispatchNotify(null, t('success'), COLOR_TYPES.SUCCESS)
  } catch (error) {}
  finally {
    dialog.value = false
    await BTStore.actionGetBusinessTripDetail(route.params.id)
  }
  // try {
  //   await BTStore.actionVerifyBusinessTrip(itemId.value, route.params.id,  isSenderOffice.value ? 'arrived' : 'left')
  // } catch (err) {
  //   BTStore.detailLoading = false
  // }
}
const onResetClick = (item, type) => {
  BTStore.changingVerificationId = item.id
  BTStore.changingVerificationType = type
  dialog.value = true
}
const onVisitedPlaceDelete = (item) => {
  deletingPlaceId.value = item.id
  deleteDialog.value = true
}
const onDelete = async () => {
  deleteLoading.value = true
  try {
    await fetchDeleteVisitedPlace(deletingPlaceId.value)
    dispatchNotify(null, t('success'), COLOR_TYPES.SUCCESS)
  } catch (error) {}
  finally {
    deleteLoading.value = false
    deleteDialog.value = false
    await BTStore.actionGetBusinessTripDetail(route.params.id)
  }
}
</script>

<template>
  <div class="flex flex-col rounded-xl border border-greyscale-100 py-[10px] px-3 bg-greyscale-50 mb-[6px] gap-y-2">
<!--    <pre>{{ props.item }}</pre>-->
    <span class="text-primary-900 text-sm font-semibold">
      {{ item?.region?.name_uz }}
    </span>

    <div
      v-if="!props.item?.is_sender"
      class="flex items-center justify-between"
    >
      <div class="flex items-center gap-x-[6px]">
        <div
          class="flex items-center py-[2px] pr-2 pl-[3px] gap-x-1 rounded-xl"
          :class="props.item?.arrived_at ? 'bg-success-100' : 'bg-greyscale-70'"
        >
          <div class="flex justify-center items-center w-[24px] h-[24px] bg-white rounded-full shadow">
            <base-iconify
              :icon="ArrowLeftDownIcon"
              class="!w-3 !h-3"
              :class="props.item?.arrived_at ? 'text-success-500' : 'text-greyscale-400'"
            />
          </div>

          <span
            class="text-xs font-medium"
            :class="props.item?.arrived_at ? 'text-success-500' : 'text-greyscale-400'"
          >
          {{ t('arrived') }}
        </span>
        </div>

        <div class="flex flex-col gap-y-1">
          <div class="flex items-center gap-x-1">
            <div class="w-1 h-1 bg-greyscale-300 rounded-full"></div>
            <span
              class="text-xs font-medium"
              :class="props.item?.arrived_at ? 'text-primary-900' : 'text-greyscale-500'"
            >
            <template v-if="item.arrived_lat && item.arrived_lng">
              <a
                :href="`https://www.google.com/maps?q=${item.arrived_lat},${item.arrived_lng}`"
                target="_blank"
                class="underline hover:text-primary-500"
              >
                {{
                  props.item?.arrived_at && item.arrived_address ? `${extractCountryAndCity(item.arrived_address)}` : t('trip-place') }}
              </a>
            </template>

            <template v-else>
              {{
                props.item?.arrived_at && item.arrived_address ? `${extractCountryAndCity(item.arrived_address)}` : t('trip-place') }}
            </template>
          </span>

            <div class="w-1 h-1 bg-greyscale-300 rounded-full"></div>

            <span
              class="text-xs font-medium"
              :class="props.item?.arrived_at ? 'text-primary-900' : 'text-greyscale-500'"
            >
            {{ props.item?.arrived_at ? formatUserFullName(props.item.arrived_verified_by) : t('emp-name') }}
          </span>
          </div>

          <div class="flex items-center gap-x-1">
            <div class="w-1 h-1 bg-greyscale-300 rounded-full"></div>

            <span class="text-xs font-medium text-greyscale-500">
            {{ props.item?.arrived_at ? formatDateHour(props.item?.arrived_at) : t('date')}}
          </span>
          </div>
        </div>
      </div>

      <div
        v-if="arrivedResetVisible"
        v-tooltip.top="{
                  value: `<h4 class='text-xs text-white text-center -my-1'>${t('cancel')}</h4>`,
                  escape: true
                }"
        class="w-8 h-8 rounded-[10px] flex justify-center items-center bg-primary-100 cursor-pointer"
        @click="onResetClick(item, 'arrived')"
      >
        <base-iconify :icon="ReplyLinearIcon" class="text-primary-500"/>
      </div>
    </div>

    <div
      v-if="props.item?.visited_places?.length"
      class="flex flex-col gap-y-1"
    >
      <div
        v-for="(item, index) in props.item.visited_places"
        class="flex bg-white py-1 px-2 rounded-lg cursor-pointer hover:bg-greyscale-100"
      >
        <a :href="`https://www.google.com/maps?q=${item.place?.lat},${item.place?.lng}`" target="_blank" class="w-full">
          <div class="flex justify-between items-center">
            <div class="flex gap-x-1">
              <base-iconify :icon="MapPointBoldIcon" class="!w-4 !h-4 text-greyscale-300"/>

              <div class="flex flex-col gap-y-[2px]">
                <span class="text-greyscale-900 font-medium text-[13px] truncate">{{ item?.place?.name }}</span>
                <span class="text-greyscale-500 font-medium text-xs">{{ formatDateHour(item?.created_date) }}</span>
              </div>
            </div>

            <div
              class="flex justify-center items-center w-8 h-8 rounded-[10px] bg-critic-30"
              @click.prevent="onVisitedPlaceDelete(item)"
            >
              <base-iconify :icon="TrashBinTrashIcon" class="text-critic-500" />
            </div>
          </div>
        </a>
      </div>
    </div>

    <div
      class="flex items-center justify-between"
    >
      <div class="flex items-center gap-x-[6px]">
        <div
          class="flex items-center py-[2px] pr-2 pl-[3px] gap-x-1 rounded-xl"
          :class="isLeft ? 'bg-critic-30' : 'bg-greyscale-70'"
        >
          <div class="flex justify-center items-center w-[24px] h-[24px] bg-white rounded-full shadow">
            <base-iconify
              :icon="ArrowRightUpIcon"
              class="!w-3 !h-3"
              :class="isLeft ? 'text-critic-500' : 'text-greyscale-400'"
            />
          </div>

          <span
            class="text-xs font-medium"
            :class="isLeft ? 'text-critic-500' : 'text-greyscale-400'"
          >
          {{ t('left') }}
        </span>
        </div>

        <div class="flex flex-col gap-y-1">
          <div class="flex items-center gap-x-1">
            <div class="w-1 h-1 bg-greyscale-300 rounded-full"></div>
            <span
              class="text-xs font-medium"
              :class="props.item?.left_at ? 'text-primary-900' : 'text-greyscale-500'"
            >
              <template v-if="item.left_lat && item.left_lng">
                <a
                  :href="`https://www.google.com/maps?q=${item.left_lat},${item.left_lng}`"
                  target="_blank"
                  class="underline hover:text-primary-500"
                >
                  {{
                    props.item?.left_at && item.left_address ? `${extractCountryAndCity(item.left_address)}` : t('trip-place') }}
                </a>
              </template>

              <template v-else>
                {{
                  props.item?.left_at && item.left_address ? `${extractCountryAndCity(item.left_address)}` : t('trip-place') }}
              </template>
            </span>

            <div class="w-1 h-1 bg-greyscale-300 rounded-full"></div>

            <span
              class="text-xs font-medium"
              :class="isLeft ? 'text-primary-900' : 'text-greyscale-500'"
            >
            {{ isLeft ? formatUserFullName(props.item.left_verified_by) : t('emp-name')}}
          </span>
          </div>

          <div class="flex items-center gap-x-1">
            <div class="w-1 h-1 bg-greyscale-300 rounded-full"></div>

            <span class="text-xs font-medium text-greyscale-500">
            {{ isLeft ? formatDateHour(props.item?.left_at) : t('date') }}
          </span>
          </div>
        </div>
      </div>

      <div
        v-if="leftResetVisible"
        v-tooltip.top="{
                  value: `<h4 class='text-xs text-white text-center -my-1'>${t('cancel')}</h4>`,
                  escape: true
                }"
        class="w-8 h-8 rounded-[10px] flex justify-center items-center bg-primary-100 cursor-pointer"
        @click="onResetClick(item, 'left')"
      >
        <base-iconify :icon="ReplyLinearIcon" class="text-primary-500" />
      </div>
    </div>

<!--    <div class="flex justify-end items-center">

      <base-button
        v-if="buttonVisible"
        size="small"
        :label="buttonText"
        @click="dialog = true"
      >
      </base-button>

      <base-button
        v-if="buttonVisibleForSenderOffice"
        size="small"
        label="arrived"
        @click="dialog = true"
      >
      </base-button>
    </div>

    <verification-confirmation-modal
      v-model="dialog"
      ref="confirmModal"
      @emit:on-confirm="onConfirm"
    />-->
  </div>

  <verification-confirmation-modal
    v-model="dialog"
    ref="confirmModal"
    @emit:on-confirm="onConfirm"
  />

  <!-- DELETE CONFIRM MODAL -->
  <DeleteModal
    v-model="deleteDialog"
    label="delete"
    :loading="deleteLoading"
    :max-width="'max-w-[480px]'"
    :content="{
        title: 'really-want-delete'
      }"
    @click:delete="onDelete"
  />
  <!-- /DELETE CONFIRM MODAL -->
</template>

<style scoped>

</style>
