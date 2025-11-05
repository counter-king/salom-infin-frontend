<script setup>
// Core
import { useI18n } from "vue-i18n"
// Store
import { useCommonStore } from "@/stores/common"
import { useTelegramStore } from "@/components/Toolbar/Telegram/telegram.store"
// Components
import { CloseSmIcon } from "@/components/Icons"
import { computed } from "vue";

// Composable
const { t } = useI18n()
const commonStore = useCommonStore()
const store = useTelegramStore()

// Computed
const telegram = computed(() => {
  return commonStore.telegramProfiles?.length ? commonStore.telegramProfiles[0] : null
})
</script>

<template>
  <div class="rounded-t-2xl rounded-b-xl bg-[linear-gradient(109.21deg,#EDF3F7_2.26%,#EEEEFA_100%)] p-3">
    <div class="flex justify-end">
      <div
        class="w-9 h-9 rounded-full bg-white flex items-center justify-center cursor-pointer"
        @click="store.dialog = false"
      >
        <base-iconify :icon="CloseSmIcon"/>
      </div>
    </div>

    <div class="flex flex-col items-center">
      <div
        class="w-[120px] h-[120px] rounded-full flex justify-center items-center"
        style="box-shadow: 0 7px 15.3px 0 #1B96D554; background: linear-gradient(180deg, #2AABEE 0%, #229ED9 100%);"
      >
        <img src="/src/assets/svg/TelegramBold.svg" alt="Telegram" class="w-16 h-14">
      </div>

      <div class="text-xl text-greyscale-900 font-semibold my-7 text-center">{{ t('telegram-bot') }}</div>
    </div>
  </div>

  <div class="flex flex-col py-4 px-5 bg-white rounded-[20px] m-8 drop-shadow border border-greyscale-100">
    <div class="flex justify-between items-center py-3">
      <span class="text-base text-greyscale-500 font-regular">Chat ID</span>
      <span class="text-lg text-greyscale-900 font-semibold">{{ telegram?.chat_id || '-' }}</span>
    </div>

    <div class="flex justify-between items-center py-3">
      <span class="text-base text-greyscale-500 font-regular">{{ t('phone-number') }}</span>
      <span class="text-lg text-greyscale-900 font-semibold">+{{ telegram?.phone || '-' }}</span>
    </div>

    <div class="flex justify-between items-center py-3">
      <span class="text-base text-greyscale-500 font-regular">Telegram username</span>
      <span class="text-lg text-primary-500 font-semibold">@{{ telegram?.username || '-' }}</span>
    </div>
  </div>

  <div class="flex justify-center mb-6 w-full">
    <base-button
      label="disconnect-account"
      rounded
      type="button"
      severity="danger"
      class="h-12 w-full mx-8 bg-critic-30 text-critic-500 border-none hover:bg-critic-100"
      color="bg-critic-30"
      :loading="store.buttonLoading"
      @click="store.actionUnlinkTelegram(t)"
    />
  </div>
</template>

<style scoped>

</style>
