<script setup>
// Core
import {useI18n} from "vue-i18n"
// Components
import {ArrowLeftDownIcon, ArrowRightUpIcon} from "@/components/Icons"
import {formatDateHour} from "../../../../../utils/formatDate";

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

const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col rounded-xl border border-greyscale-100 py-[10px] px-3 bg-greyscale-50 mb-[6px] gap-y-2">
      <span class="text-primary-900 text-sm font-semibold">
        {{ props.item?.company?.name }}
      </span>

    <div
      v-if="props.item?.arrived_at"
      class="flex items-center gap-x-[6px]"
    >
      <div class="flex items-center bg-success-100 py-[2px] pr-2 pl-[3px] gap-x-1 rounded-xl">
        <div class="flex justify-center items-center w-[18px] h-[18px] bg-white rounded-full shadow">
          <base-iconify
            :icon="ArrowLeftDownIcon"
            class="text-success-500 !w-3 !h-3"
          />
        </div>

        <span class="text-success-500 text-xs font-medium">{{ t('arrived') }}</span>
      </div>

      <div class="w-1 h-1 bg-greyscale-300 rounded-full"></div>

      <span class="text-xs font-medium text-greyscale-500">13.08.2024 16:35</span>
    </div>

    <div
      v-if="props.item?.left_at"
      class="flex items-center gap-x-[6px]"
    >
      <div class="flex items-center bg-critic-30 py-[2px] pr-2 pl-[3px] gap-x-1 rounded-xl">
        <div class="flex justify-center items-center w-[18px] h-[18px] bg-white rounded-full shadow">
          <base-iconify
            :icon="ArrowRightUpIcon"
            class="text-critic-500 !w-3 !h-3"
          />
        </div>

        <span class="text-critic-500 text-xs font-medium">{{ t('left') }}</span>
      </div>

      <div class="w-1 h-1 bg-greyscale-300 rounded-full"></div>

      <span class="text-xs font-medium text-greyscale-500">{{ formatDateHour(props.item?.left_at) }}</span>
    </div>

    <span class="text-xs font-medium text-primary-900">{{ props.item.verified_by?.full_name }}</span>
  </div>
</template>

<style scoped>

</style>
