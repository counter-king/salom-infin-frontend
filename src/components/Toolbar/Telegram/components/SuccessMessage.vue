<script setup>
// Core
import { useI18n } from "vue-i18n"
// Store
import { useTelegramStore } from "@/components/Toolbar/Telegram/telegram.store"
// Components
import { CheckBigIcon } from "@/components/Icons"

// Composable
const { t } = useI18n()
const store = useTelegramStore()

// Methods
const onSuccess = async () => {
  store.dialog = false
}
</script>

<template>
  <div class="p-3 flex flex-col items-center pt-11 pb-9">
    <div class="w-[112px] h-[112px] bg-success-10 rounded-full flex items-center justify-center">
      <div
        class="w-16 h-16 rounded-full flex items-center justify-center bg-success-500"
        style="box-shadow: 0 12px 12px 0 #62BA3D40;"
      >
        <base-iconify :icon="CheckBigIcon" class="text-white !w-10 !h-10"/>
      </div>
    </div>

    <div class="text-xl text-greyscale-900 font-semibold mt-8">{{ t('successfully-connected') }}</div>
    <div class="text-lg text-greyscale-500 font-regular text-center px-10">{{ t('track-employees') }}</div>

    <base-button
      label="got-it"
      rounded
      type="button"
      class="h-12 mt-12 w-3/4"
      @click="onSuccess"
    />
  </div>
</template>

<style scoped>

</style>
