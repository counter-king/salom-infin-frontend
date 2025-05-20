<script setup>
// components
import NewsCategory from '@/components/Chips/NewsCategory.vue';
import ShortDescription from '@/modules/News/components/ShortDescription.vue';
import { CalendarLinearIcon, EyeLinearIcon, HeartLinearIcon, CommentDotsIcon } from '@/components/Icons';
// utils
import { formatToK } from '@/utils';
import { formatDate } from '@/utils/formatDate';

// props
const props = defineProps({
  item: { type: Object, default: () => {} }
})

</script>
<template>
  <div class="news-card-dashboard flex gap-3 w-full h-full p-4 rounded-2xl overflow-hidden bg-white duration-300 transition-shadow">
      <!-- images -->
      <div 
        class="rounded-lg overflow-hidden aspect-ratio-box relative h-[116px]" 
        :style="{ '--dynamic-src': `url(${props.item.image.url ? props.item.image.url : props.item.image?.blobUrl})` }"
      >
        <img :src="props.item.image.url ? props.item.image?.url : props.item.image?.blobUrl" alt="rasm" class="w-full h-full object-contain absolute z-2" />
      </div>
      <!-- content -->
      <div class="flex-1 flex flex-col justify-between gap-2">
        <div>
          <h3 class="font-semibold text-sm text-greyscale-900 line-clamp-2 max-h-[40px] overflow-hidden">{{ props.item.title }}</h3>
          <short-description wrap-class="mt-1 line-clamp-2 !text-greyscale-600 !text-[13px]" :text="props.item.description"/>
        </div>
        <div class="flex gap-3 mt-auto h-fit">
          <news-category :category="props.item.category"/>
          <div class="flex gap-1 items-center text-[#5F6878]">
            <base-iconify :icon="CalendarLinearIcon" class="!w-3 !h-3" />
            <span class="font-medium text-xs flex items-center">{{ formatDate(props.item.created_date) }}</span>
          </div>
        </div>
      </div>
      <!-- view-likes-comments -->
      <div class="min-w-fit flex gap-2 items-center text-greyscale-400 self-end justify-end">
        <div class="flex gap-1 items-center">
           <div class="hover:cursor-pointer">
             <base-iconify :icon="CommentDotsIcon"  />
           </div>
           <div class="text-xs font-medium text-greyscale-400">{{ props.item.comments_counts && formatToK(props.item.comments_counts) }}</div>
         </div> 
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

.news-card-dashboard:hover {
  box-shadow: 0px 2px 4px 0px rgba(47, 61, 87, 0.03), 0px 1px 1px 0px rgba(95, 110, 169, 0.03);
}

</style>