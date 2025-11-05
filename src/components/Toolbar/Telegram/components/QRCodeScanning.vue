<script setup>
// Core
import { useI18n } from "vue-i18n"
// Store
import { useTelegramStore } from "@/components/Toolbar/Telegram/telegram.store"
// Components
import { CalendarScheduleFillIcon, CloseSmIcon, CloudFillIcon, MailUnreadFillIcon } from "@/components/Icons"
import QrcodeVue from "qrcode.vue"

// Composable
const { t } = useI18n()
const store = useTelegramStore()

const items = [
  {
    id: 1,
    title: "attendance-tracking",
    description: "attendance-tracking-desc",
    icon: CalendarScheduleFillIcon
  },
  {
    id: 2,
    title: "instant-notifications",
    description: "instant-notifications-desc",
    icon: MailUnreadFillIcon
  },
  {
    id: 3,
    title: "convenient-integration",
    description: "convenient-integration-desc",
    icon: CloudFillIcon
  }
]
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

    <div class="flex justify-center">
      <div class="relative bg-white border border-greyscale-200 rounded-[20px] p-4 mb-4 shadow-button w-fit min-w-[160px] min-h-[160px]">
        <template v-if="!store.qrCodeLoading">
          <qrcode-vue
            :value="store.qrCodeValue"
            :size="160"
            level="H"
            render-as="svg"
          />

          <div
            class="absolute flex items-center justify-center  w-10 h-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style="background: linear-gradient(180deg, #2AABEE 0%, #229ED9 100%);"
          >
            <img src="/src/assets/svg/TelegramBold.svg" class="w-6" alt="Telegram">
          </div>
        </template>

        <template v-else>
          <base-spinner />
        </template>
      </div>
    </div>
  </div>

  <div class="text-lg text-primary-500 font-semibold mt-5 text-center">{{ store.qrCodeTimer }}</div>
  <div class="text-base text-greyscale-500 font-regular text-center">{{ t('qr-update-soon') }}</div>

  <div class="flex flex-col gap-y-4 my-9 px-10">
    <div class="text-xl text-greyscale-900 font-semibold text-center">
      {{ t('scan-qr') }}
    </div>

    <div
      v-for="item in items"
      :key="item.id"
      class="flex gap-x-5"
    >
      <div class="w-12 h-12 rounded-full bg-primary-30 flex justify-center items-center">
        <base-iconify :icon="item.icon" class="!w-6 !h-6 text-primary-500" />
      </div>

      <div>
        <div class="text-lg text-greyscale-900 font-semibold">{{ t(item.title) }}</div>
        <div class="text-base text-greyscale-500 font-regular">{{ t(item.description) }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
