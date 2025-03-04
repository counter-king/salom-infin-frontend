<script setup>
// Components
import NewsCategory from '@/components/Chips/NewsCategory.vue';
import ShortDescription from './ShortDescription.vue';
//Icons
import { EyeLinearIcon, HeartLinearIcon } from '@/components/Icons'
import BaseIconify from '@/components/UI/BaseIconify.vue'
// import { EditLightIcon } from '../../../components/Icons';
// utils
import { formatToK } from '@/utils';
import { formatDateNamedMonth } from '@/utils/formatDate';

const props = defineProps({
  item: { type: Object, default: () => {} }
})
</script>

<template>
  <div
    class="w-full h-full rounded-2xl p-2 bg-white gap-8 relative hover:shadow-xl duration-300 transition-shadow"
  >
    <div class="flex flex-col h-full">
      <div 
        class="rounded-lg overflow-hidden aspect-ratio-box relative" 
        :style="{ '--dynamic-src': `url(${props.item.image.url ? props.item.image?.url : props.item.image?.blobUrl})` }"
      >
        <img :src="props.item.image.url ? props.item.image?.url : props.item.image?.blobUrl" alt="rasm" class="w-full h-full object-contain absolute z-2" />
      </div>
      <!-- content -->
      <div class="p-2 pt-0 flex flex-col">
        <div class="mt-3">
          <news-category :category="props.item.category"/>
        </div>
        <h3 class="font-semibold text-sm text-greyscale-900 mt-2 line-clamp-2 h-[40px] overflow-hidden">{{ props.item.title }}</h3>
        <short-description wrap-class="mt-2 line-clamp-3 !text-greyscale-600 !text-sm" :text="props.item.description"/>
      </div>
      <!-- bottom -->
      <div class="flex items-center justify-between p-2 mt-auto">
          <span class="font-medium text-xs text-[#5F6878]">{{ formatDateNamedMonth(props.item.created_date) }}</span>
          <div class="flex gap-2 items-center text-greyscale-400">
            <!-- <RouterLink :to="{ name: 'NewsEdit', params: {id: props.item.id}}" class="text-sm hover:text-warning-500">
              <base-iconify :icon="EditLightIcon" />
            </RouterLink> -->
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
<style scoped>
.aspect-ratio-box {
    aspect-ratio: 3 / 2
}

.aspect-ratio-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;  
  width: 100%;
  height: 100%;
  background-image: var(--dynamic-src);
  background-size: cover;
  filter: blur(10px);
  background-position: center; 
  z-index: 0;
}
</style>
