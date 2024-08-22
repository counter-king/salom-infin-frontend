<script setup>
// Core
import { useI18n } from "vue-i18n"
// Store
import {useBusinessTripStore} from "@/modules/HR/modules/BusinessTrip/stores/businessTrip.store"
// utils
import {formatDate} from "@/utils/formatDate"
// Components
import {FileTextBoldIcon} from "@/components/Icons"
import Empty from '@/components/Empty.vue'

const { t } = useI18n()
const BTStore = useBusinessTripStore()
</script>

<template>
  <div class="flex flex-col p-6">
    <div class="flex items-center justify-between text-xs font-medium text-greyscale-500 h-10 rounded-lg bg-greyscale-50 w-full px-4">
      <div class="w-[6%]">№</div>
      <div class="w-[16%]">{{ t('expense-type') }}</div>
      <div class="w-[16%]">{{ t('date') }}</div>
      <div class="w-[16%]">{{ t('amount') }}</div>
      <div class="w-[30%]">{{ t('description') }}</div>
      <div class="w-[16%]">{{ t('attached-documents') }}</div>
    </div>

    <div class="overflow-y-auto" style="height: calc(100vh - 300px)">
      <div
        v-if="BTStore.detailModel?.expenses.length"
        v-for="(item, index) in BTStore.detailModel?.expenses"
        class="flex items-center px-4 py-[22px] border-b-2 border-greyscale-100 w-full text-sm font-medium text-greyscale-900"
      >
        <div class="w-[6%]">{{ index + 1 }}</div>
        <div class="w-[16%]">{{ item?.type?.name }}</div>
        <div class="w-[16%]">{{ formatDate(item.date) }}</div>
        <div class="w-[16%]">{{ item.amount }}</div>
        <div class="w-[30%]">{{ item.comment }}</div>
        <div class="w-[16%]">
          <a
            v-if="item.file"
            :href="item.file.url"
            target="_blank"
            class="flex gap-x-[6px] px-2 border-b-2 rounded-lg py-[6px] bg-greyscale-50 cursor-pointer"
          >
            <base-iconify
              :icon="FileTextBoldIcon"
              class="text-primary-500"
            />
            <span class="text-sm font-medium text-primary-900 truncate">{{ item.file.name }}</span>
          </a>
        </div>
      </div>

      <div v-else class="flex justify-center items-center h-full">
        <empty />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
