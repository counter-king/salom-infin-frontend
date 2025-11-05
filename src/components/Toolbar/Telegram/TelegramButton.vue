<script setup>
// Core
import { computed, watch } from "vue"
// Socket
import { socket } from "@/services/socket"
// Enums
import {
  DISCONNECT_ACCOUNT,
  OTP_CONFIRMATION,
  QR_SCANNING,
  SUCCESS_MESSAGE
} from "@/components/Toolbar/Telegram/constants"
// Store
import { useCommonStore } from "@/stores/common"
import { useTelegramStore } from "@/components/Toolbar/Telegram/telegram.store"
// Components
import { OTPConfirmation, QRCodeScanning, SuccessMessage, UnlinkTelegram } from "@/components/Toolbar/Telegram/components"
import { Telegram2FillIcon } from "@/components/Icons"

// Composable
const { data } = socket()
const store = useTelegramStore()
const commonStore = useCommonStore()

// Computed
const activeComponent = computed(() => {
  switch (store.component) {
    case QR_SCANNING:
      return QRCodeScanning
    case OTP_CONFIRMATION:
      return OTPConfirmation
    case SUCCESS_MESSAGE:
      return SuccessMessage
    case DISCONNECT_ACCOUNT:
      return UnlinkTelegram
    default:
      return QRCodeScanning
  }
})

const hasTelegramLinked = computed(() => {
  return commonStore.telegramProfiles?.length > 0
})

// Watch
watch(data, (value) => {
  const data = JSON.parse(value)
  if (data.type === 'need_telegram_confirmation') {
    store.component = OTP_CONFIRMATION
  }
})

// Methods
const openDialog = async () => {
  if (hasTelegramLinked.value) {
    store.component = DISCONNECT_ACCOUNT
    store.dialog = true
  } else {
    store.component = QR_SCANNING
    store.dialog = true
    await store.actionRequestTelegramQRCode()
  }
}
const resetValues = () => {
  store.actionStopQrCountdown()
  store.actionResetValues()
  store.component = QR_SCANNING
}
</script>

<template>
  <div class="telegram-button">
    <div
      class="flex items-center gap-x-2  rounded-full py-[10px] px-4 cursor-pointer bg-greyscale-800 hover:bg-greyscale-900"
      @click="openDialog"
    >
      <base-iconify
        :icon="Telegram2FillIcon"
        :class="hasTelegramLinked ? 'text-info-500' : 'text-white'"
      />
      <span class="text-white text-sm font-medium">Telegram</span>
    </div>

    <base-dialog
      v-model="store.dialog"
      max-width="max-w-[500px]"
      :draggable="false"
      :show-header="false"
      content-classes="p-0 !rounded-2xl"
      @emit:after-hide="resetValues"
    >
      <template #content>
        <div class="p-2 select-none">
          <component
            :is="activeComponent"
          />
        </div>
      </template>
    </base-dialog>
  </div>
</template>

<style scoped>

</style>
