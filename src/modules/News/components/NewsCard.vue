<script setup>
// Components
import NewsCategory from '@/components/Chips/NewsCategory.vue';
//Icons
import { EyeLinearIcon, HeartLinearIcon } from '@/components/Icons'
import BaseIcon from '@/components/UI/BaseIcon.vue';
import BaseIconify from '@/components/UI/BaseIconify.vue'
// utils
import { formatToK } from '@/utils';
import { formatDateNamedMonth } from '@/utils/formatDate';

const props = defineProps({
  item: { type: Object, default: () => {} }
})
</script>

<template>
  <div
    class="max-w-[328px] h-[294px] rounded-2xl p-2 bg-white select-none"
  >
    <div class="w-full max-w-[312px] h-full max-h-[158px] rounded-lg overflow-hidden">
      <img :src="props.item.image.url" alt="rasm" class="w-full h-full" />
    </div>
    <div class="p-2 pt-0 h-[108px]">
      <div class="mt-3">
        <news-category :category="props.item.category"/>
      </div>
      <h3 class="font-semibold text-sm text-greyscale-900 mt-2 min-h-[40px] max-h-[40px] leading-5 line-clamp-2 overflow-hidden">{{ props.item.title }}</h3>
      <div class="flex items-center justify-between mt-2">
        <span class="font-medium text-xs text-[#5F6878]">{{ formatDateNamedMonth(props.item.created_date) }}</span>
        <div class="flex gap-2 items-center text-greyscale-400">
          <RouterLink :to="{ name: 'NewsEdit', params: {id: item.id}}" class="text-sm hover:text-warning-500">
            <base-icon name="PenIcon"/>
          </RouterLink>
          <div class="flex gap-1 items-center">
            <div class="hover:cursor-pointer">
               <base-iconify :icon="HeartLinearIcon" />
            </div>
            <div class="text-xs font-medium text-greyscale-400">{{ formatToK(props.item.like_counts) }}</div>
          </div>
         
          <div class="flex gap-1 items-center">
            <div class="hover:cursor-pointer">
              <base-iconify :icon="EyeLinearIcon" />
            </div>
            <div class="text-xs font-medium text-greyscale-400">{{ formatToK(props.item.view_counts) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
