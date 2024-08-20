<script setup>
// Core
import { useI18n } from "vue-i18n"
// Components
import {BillListIcon, CheckListMinimalisticIcon, DocumentTextBoldIcon} from "@/components/Icons"

const { t } = useI18n()
</script>

<template>
  <div class="business-trip-detail-view bg-white shadow-block h-full rounded-2xl">
    <div class="flex items-center w-full py-4 px-6 border-b-[1.5px]">
      <div class="flex gap-x-2 items-center py-[10px] px-4 border border-primary-500 rounded-[80px] text-base font-semibold text-primary-900">
        <base-iconify
          :icon="CheckListMinimalisticIcon"
          class="text-primary-500"
        />
        <span>{{ t('process') }}</span>
      </div>
      <div class="flex h-2 bg-greyscale-200 w-8"></div>
      <div class="flex gap-x-2 items-center py-[10px] px-4 border border-greyscale-70 bg-greyscale-50 rounded-[80px] text-base font-semibold text-greyscale-500">
        <base-iconify
          :icon="BillListIcon"
          class="text-greyscale-400"
        />
        <span>{{ t('avans-report') }}</span>
      </div>
    </div>

    <div class="flex px-6 py-6">
      <div class="flex w-2/3">
        <div class="flex flex-col w-[350px] rounded-xl border border-greyscale-100 py-[10px] px-3 bg-greyscale-50">
          <span class="text-primary-900 text-sm font-semibold">{{ t('sketch') }}</span>

          <div class="mt-2">
            <div class="flex bg-white rounded-lg p-2">
              <div class="flex items-center gap-x-[6px]">
                <base-iconify
                  :icon="DocumentTextBoldIcon"
                  class="text-primary-500"
                />
                <span class="text-xs text-greyscale-900 font-semibold">{{ t('notice') }}</span>
              </div>
            </div>
          </div>
        </div>
        <div>

        </div>

      </div>
      <div class="flex w-1/3">
        sdsdsd
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
