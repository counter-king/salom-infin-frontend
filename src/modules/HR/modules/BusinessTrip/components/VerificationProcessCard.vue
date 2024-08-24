<script setup>
// Core
import {computed, ref} from "vue"
import {useI18n} from "vue-i18n"
import {useRoute} from "vue-router"
// Store
import {useBusinessTripStore} from "@/modules/HR/modules/BusinessTrip/stores/businessTrip.store"
// Components
import {ArrowLeftDownIcon, ArrowRightUpIcon} from "@/components/Icons"
import {formatDateHour} from "@/utils/formatDate";
import {useAuthStore} from "@/modules/Auth/stores";
import {VerificationConfirmationModal} from "@/modules/HR/modules/BusinessTrip/components/index"
import {formatUserFullName} from "../../../../../utils";

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

// Computed
const isLeft = computed(() => {
  return props.item.left_at
})
const isSenderOffice = computed(() => {
  return props.verifications.find(item => item.is_sender).company?.id === currentUser?.company.id
    && props.item.is_sender
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

// Methods
const onConfirm = async () => {
  try {
    await BTStore.actionVerifyBusinessTrip(itemId.value, route.params.id,  isSenderOffice.value ? 'arrived' : 'left')
  } catch (err) {
    BTStore.detailLoading = false
  }
}
</script>

<template>
  <div class="flex flex-col rounded-xl border border-greyscale-100 py-[10px] px-3 bg-greyscale-50 mb-[6px] gap-y-2">
<!--    <pre>{{ props.item }}</pre>-->
    <span class="text-primary-900 text-sm font-semibold">
      {{ props.item?.company?.name }}
    </span>

    <div
      v-if="props.item?.arrived_at"
      class="flex items-center gap-x-[6px]"
    >
      <div class="flex items-center bg-success-100 py-[2px] pr-2 pl-[3px] gap-x-1 rounded-xl">
        <div class="flex justify-center items-center w-[18px] h-[18px] bg-white rounded-full shadow">
          <base-iconify
            :icon="ArrowLeftDownIcon"
            class="text-success-500 !w-3 !h-3"
          />
        </div>

        <span class="text-success-500 text-xs font-medium">{{ t('arrived') }}</span>
      </div>

      <div class="w-1 h-1 bg-greyscale-300 rounded-full"></div>

      <span class="text-xs font-medium text-greyscale-500">{{ formatDateHour(props.item?.arrived_at) }}</span>

      <div class="w-1 h-1 bg-greyscale-300 rounded-full"></div>

      <span class="text-xs font-medium text-primary-900">{{ formatUserFullName(props.item.arrived_verified_by) }}</span>
    </div>

    <div
      v-if="isLeft || !isSenderOffice"
      class="flex items-center gap-x-[6px]"
    >
      <div
        class="flex items-center py-[2px] pr-2 pl-[3px] gap-x-1 rounded-xl"
        :class="isLeft ? 'bg-critic-30' : 'bg-greyscale-70'"
      >
        <div class="flex justify-center items-center w-[18px] h-[18px] bg-white rounded-full shadow">
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

      <div class="w-1 h-1 bg-greyscale-300 rounded-full"></div>

      <span class="text-xs font-medium text-greyscale-500">
        {{ isLeft ? formatDateHour(props.item?.left_at) : t('date') }}
      </span>

      <div class="w-1 h-1 bg-greyscale-300 rounded-full"></div>

      <span
        class="text-xs font-medium"
        :class="isLeft ? 'text-primary-900' : 'text-greyscale-500'"
      >
        {{ isLeft ? formatUserFullName(props.item.left_verified_by) : 'Имя сотрудника'}}
      </span>

    </div>

    <div class="flex justify-end items-center">

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
    />
  </div>
</template>

<style scoped>

</style>
