<script setup>
import { formatDateNamedMonth } from '@/utils/formatDate';

// Components

const props = defineProps({
    news: {
        type: Object,
        default: () => {}
    }   
})
</script>

<template>
    <RouterLink 
     :to="{ name: 'NewsShow', params: {id: props.news.id}}" 
     class="min-h-[116px] min-w-[416px] w-full p-3 grid grid-cols-[1.63fr_3.2fr] items-center gap-4 rounded-2xl overflow-hidden bg-greyscale-50 hover:bg-greyscale-90 duration-300 transition-colors relative"

     >
        <div 
            class="aspect-ratio-box rounded-lg overflow-hidden relative" 
            :style="{ '--dynamic-src': `url(${props.news.image.url})` }"
            >
          <img :src="props.news.image.url" alt="rasm" class="w-full h-full object-contain absolute z-2" />
        </div>
        <div class="flex flex-col gap-3 justify-center">
            <div class=" font-semibold text-[15px] text-greyscale-900 line-clamp-2" >
               {{ props.news?.title }}
            </div>
            <div class="font-medium text-[11px] text-greyscale-500 mt-auto">
                {{ formatDateNamedMonth(props.news?.created_date) }}
            </div>
        </div>
    </RouterLink>
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
