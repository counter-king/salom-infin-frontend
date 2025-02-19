<script setup>
// Core
import {computed, ref} from "vue"
import {useI18n} from "vue-i18n"
import {useRoute} from "vue-router"
// Utils
import {formatDateHour} from "@/utils/formatDate"
import {formatUserFullName} from "@/utils"
// Store
import {useBusinessTripStore} from "@/modules/HR/modules/BusinessTrip/stores/businessTrip.store";
// Components
import { ArrowLeftDownIcon } from "@/components/Icons"
import {VerificationConfirmationModal} from "@/modules/HR/modules/BusinessTrip/components/index"
import {useAuthStore} from "@/modules/Auth/stores";

const props = defineProps({
  verifications: {
    type: Array,
    default: () => []
  }
})

// Composable
const { t } = useI18n()
const BTStore = useBusinessTripStore()
const route =  useRoute()
const currentUser = useAuthStore().currentUser

// Reactive
const confirmModal = ref(null)
const dialog = ref(null)

// Computed
const sender = computed(() => {
  return props.verifications.find(item => item.is_sender)
})
const isArrived = computed(() => {
  return sender.value?.arrived_at
})
const isSenderOffice = computed(() => {
  return props.verifications.find(item => item.is_sender)?.company?.id === currentUser?.company?.id
})

// Methods
const onConfirm = async () => {
  try {
    await BTStore.actionVerifyBusinessTrip(sender.value.id, route.params.id,  'arrived')
  } catch (err) {
    BTStore.detailLoading = false
  }
}
</script>

<template>
  <div class="flex flex-col rounded-xl border border-greyscale-100 py-[10px] px-3 bg-greyscale-50 mb-[6px] gap-y-2">
    <span class="text-primary-900 text-sm font-semibold">
      {{ sender?.company?.name }}
    </span>

    <div
      class="flex items-center gap-x-[6px]"
    >
      <div
        class="flex items-center py-[2px] pr-2 pl-[3px] gap-x-1 rounded-xl"
        :class="isArrived ? 'bg-success-100' : 'bg-greyscale-70'"
      >
        <div class="flex justify-center items-center w-[18px] h-[18px] bg-white rounded-full shadow">
          <base-iconify
            :icon="ArrowLeftDownIcon"
            class="!w-3 !h-3"
            :class="isArrived ? 'text-success-500' : 'text-greyscale-400'"
          />
        </div>

        <span
          class="text-xs font-medium"
          :class="isArrived ? 'text-success-500' : 'text-greyscale-400'"
        >
          {{ t('arrived') }}
        </span>
      </div>

      <div class="w-1 h-1 bg-greyscale-300 rounded-full"></div>

      <span class="text-xs font-medium text-greyscale-500">
        {{ isArrived ? formatDateHour(sender?.arrived_at) : t('date') }}
      </span>

      <div class="w-1 h-1 bg-greyscale-300 rounded-full"></div>

      <span
        class="text-xs font-medium"
        :class="isArrived ? 'text-primary-900' : 'text-greyscale-500'"
      >
        {{ isArrived ? formatUserFullName(sender?.arrived_verified_by) : 'Имя сотрудника'}}
      </span>
    </div>

<!--    <div class="flex justify-end items-center">-->

<!--      <base-button-->
<!--        v-if="!isArrived && isSenderOffice"-->
<!--        size="small"-->
<!--        label="arrived"-->
<!--        @click="dialog = true"-->
<!--      >-->
<!--      </base-button>-->
<!--    </div>-->

<!--    <verification-confirmation-modal-->
<!--      v-model="dialog"-->
<!--      ref="confirmModal"-->
<!--      @emit:on-confirm="onConfirm"-->
<!--    />-->
  </div>
</template>

<style scoped>

</style>
