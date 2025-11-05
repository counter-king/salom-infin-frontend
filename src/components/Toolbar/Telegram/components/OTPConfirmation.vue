<script setup>
// Core
import { useI18n } from "vue-i18n"
// Store
import { useTelegramStore } from "@/components/Toolbar/Telegram/telegram.store"
// Components
import { CloseSmIcon } from "@/components/Icons"
import OTPCode from "@/modules/Auth/components/otpcode.vue"

// Composable
const store = useTelegramStore()
const { t } = useI18n()
</script>

<template>
  <div class="p-3">
    <div class="flex justify-end">
      <div
        class="w-9 h-9 rounded-full bg-greyscale-50 flex items-center justify-center cursor-pointer"
        @click="store.dialog = false"
      >
        <base-iconify :icon="CloseSmIcon"/>
      </div>
    </div>

    <div class="my-4 flex flex-col justify-center">
      <div class="text-xl text-greyscale-900 font-semibold text-center">{{ t('enter-password') }}</div>
      <div class="text-lg text-greyscale-500 font-regular text-center mb-8">{{ t('enter-code-via-telegram-bot') }}</div>

      <div class="flex justify-center">
        <OTPCode
          :digit-count="6"
          input-classes="!w-14 !bg-greyscale-50 !border-none !rounded-2xl !text-greyscale-900 !font-semibold !text-2xl"
          @emit:up="(value) => store.otpValue = value"
        />
      </div>

      <div class="text-lg text-primary-500 font-semibold mt-8 text-center">{{ store.qrCodeTimer }}</div>
      <div class="text-base text-greyscale-500 font-regular text-center">{{ t('qr-update-soon') }}</div>

      <base-button
        label="continue"
        rounded
        type="button"
        class="h-12 mt-12 mx-5"
        :loading="store.buttonLoading"
        @click="store.actionConfirmTelegramOtp()"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
