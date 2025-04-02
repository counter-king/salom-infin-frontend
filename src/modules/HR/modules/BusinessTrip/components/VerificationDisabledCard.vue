<script setup>
// Core
import {computed, ref} from "vue"
import {useRoute} from "vue-router"
import {useI18n} from "vue-i18n"
// Components
import { ArrowLeftDownIcon, ArrowRightUpIcon } from "@/components/Icons"
import { VerificationConfirmationModal } from "@/modules/HR/modules/BusinessTrip/components/index"
// Store
import {useAuthStore} from "@/modules/Auth/stores"
import { useBusinessTripStore } from "@/modules/HR/modules/BusinessTrip/stores/businessTrip.store"

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

const route = useRoute()
const { t } = useI18n()
const currentUser = useAuthStore().currentUser
const BTStore = useBusinessTripStore()

// Reactive
const confirmModal = ref(null)
const dialog = ref(null)

// Computed
const isSenderOffice = computed(() => {
  return props.verifications.find(item => item.is_sender).company?.id === currentUser?.company.id
    && props.item.is_sender
})
const buttonText = computed(() => {
  if (isSenderOffice.value) {
    return 'left'
  } else {
    return 'arrived'
  }
})
const buttonVisible = computed(() => {
  return !props.verifications.find(item => item.company.id === currentUser.company.id).arrived_at && !isSenderOffice.value
    && props.verifications.find(item => item.company.id === currentUser.company.id).is_sender === false && (!props.item.is_sender && !(props.item.arrived_at && props.item.left_at))
})
const itemId = computed(() => {
  return props.verifications.find(item => item?.company?.id === currentUser.company?.id).id
})
const buttonVisibleForSenderOffice = computed(() => {
  return !props.item.arrived_at && isSenderOffice.value && !props.verifications.find(item => item.is_sender).left_at
})

// Methods
const onConfirm = async () => {
  try {
    await BTStore.actionVerifyBusinessTrip(itemId.value, route.params.id, isSenderOffice.value ? 'left' : 'arrived')
  } catch (err) {
    BTStore.detailLoading = false
  }
}
</script>

<template>
  <div class="flex flex-col rounded-xl border border-greyscale-100 py-[10px] px-3 bg-greyscale-50 mb-[6px] gap-y-2">
      <span class="text-greyscale-400 text-sm font-semibold">
        Филиал банка
      </span>

    <div
      v-if="!isSenderOffice && !props.item?.is_sender"
      class="flex items-center gap-x-[6px]"
    >
      <div class="flex items-center bg-greyscale-70 py-[2px] pr-2 pl-[3px] gap-x-1 rounded-xl">
        <div class="flex justify-center items-center w-[18px] h-[18px] bg-white rounded-full shadow">
          <base-iconify
            :icon="ArrowLeftDownIcon"
            class="text-greyscale-400 !w-3 !h-3"
          />
        </div>

        <span class="text-greyscale-400 text-xs font-medium">{{ t('arrived') }}</span>
      </div>

      <div class="w-1 h-1 bg-greyscale-300 rounded-full"></div>

      <span class="text-xs font-medium text-greyscale-400">Дата</span>

      <div class="w-1 h-1 bg-greyscale-300 rounded-full"></div>

      <span class="text-xs font-medium text-greyscale-400">{{ t('trip-place') }}</span>
    </div>

    <div class="flex items-center gap-x-[6px]">
      <div class="flex items-center bg-greyscale-70 py-[2px] pr-2 pl-[3px] gap-x-1 rounded-xl">
        <div class="flex justify-center items-center w-[18px] h-[18px] bg-white rounded-full shadow">
          <base-iconify
            :icon="ArrowRightUpIcon"
            class="text-greyscale-400 !w-3 !h-3"
          />
        </div>

        <span class="text-greyscale-400 text-xs font-medium">{{ t('left') }}</span>
      </div>

      <div class="w-1 h-1 bg-greyscale-300 rounded-full"></div>

      <span class="text-xs font-medium text-greyscale-400">Дата</span>

      <div class="w-1 h-1 bg-greyscale-300 rounded-full"></div>

      <span class="text-xs font-medium text-greyscale-400">Имя сотрудника</span>
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
        label="left"
        @click="dialog = true"
      >
      </base-button>
    </div>
  </div>

  <verification-confirmation-modal
    v-model="dialog"
    ref="confirmModal"
    @emit:on-confirm="onConfirm"
  />
</template>

<style scoped>

</style>
