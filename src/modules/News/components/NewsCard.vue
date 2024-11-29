<script setup>
// Components
import { StatusChip } from '@/components/Chips';
//Icons
import { EyeLinearIcon, HeartLinearIcon } from '@/components/Icons'
import BaseIconify from '@/components/UI/BaseIconify.vue'
// Services

const props = defineProps({
  data: { type: Object, default: () => {} }
})
</script>

<template>
  <div
    class="max-w-[328px] rounded-2xl p-2 bg-white select-none"
  >
    <div class="w-full max-w-[312px] h-full max-h-[158px] rounded-lg overflow-hidden">
      <img :src="props.data.image" alt="rasm" class="w-full h-full" />
    </div>
    <div class="p-2 pt-0">
      <div class="mt-3">
        <status-chip type="news" :status="{name: 'Новости', id: 1}" root-class="!text-xs !font-semibold !rounded-md !mt-3">
          {{ props.data.status.name }}
        </status-chip>
      </div>
      <h3 class="font-semibold text-sm text-greyscale-900 mt-2">{{ props.data.title }}</h3>
      <div class="flex items-center justify-between mt-[10px]">
        <span class="font-medium text-xs text-[#5F6878]">{{ props.data.date }}</span>
        <div class="flex gap-2 items-center text-greyscale-400">
          <div class="hover:cursor-pointer">
            <base-iconify :icon="HeartLinearIcon" />
          </div>
          <div class="flex gap-1 items-center">
            <div class="hover:cursor-pointer">
              <base-iconify :icon="EyeLinearIcon" />
            </div>
            <div class="text-xs font-medium text-greyscale-400">{{ props.data.totalViewCount }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
