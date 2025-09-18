<script setup>
// Core
import { useI18n } from "vue-i18n"
// Store
import { useNotificationStore } from "@/modules/Dashboard/stores/notification.store"
import { ClockCircleBoldIcon } from "@/components/Icons";

// Composable
const { t } = useI18n()
const store = useNotificationStore()
</script>

<template>
  <div class="relative flex flex-col shadow-button rounded-2xl bg-white p-5 pr-2 gap-y-2">
    <div class="flex items-center justify-between">
      <div class="text-base text-greyscale-900 font-semibold">{{ t('notifications') }}</div>
    </div>

    <div class="flex flex-col overflow-y-auto">
      <div
        v-for="item in store.tempData"
        :key="item.id"
        class="flex justify-between items-center px-4 py-2 rounded-xl border-b border-b-greyscale-300 !border-dashed cursor-pointer hover:bg-greyscale-50 group"
      >
        <div class="flex gap-x-3">
          <div class="flex justify-center items-center w-10 h-10 bg-greyscale-50 rounded-full group-hover:bg-white">
            <img :src="item.icon" alt="alarm clock">
          </div>

          <div class="flex flex-col gap-y-1">
            <div class="text-[13px] text-greyscale-900 font-semibold">{{ item.title }}</div>
            <div class="text-xs text-greyscale-500 font-normal">{{ item.time }}</div>
          </div>
        </div>

        <div class="rounded-[6px] bg-greyscale-50 px-3 text-greyscale-500 group-hover:bg-white group-hover:text-primary-500 text-xs font-medium h-fit py-1">
          {{ item.buttonLabel }}
        </div>
      </div>
    </div>

    <div class="flex justify-center items-center absolute inset-0 rounded-2xl backdrop-blur-[2px] bg-white/30">
      <div class="flex gap-x-3 items-center">
        <div class="flex justify-center items-center w-10 h-10 rounded-full bg-warning-50">
          <base-iconify
            :icon="ClockCircleBoldIcon"
            class="text-warning-500"
          />
        </div>

        <div class="text-sm font-medium text-greyscale-900">{{ t('soon') }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
