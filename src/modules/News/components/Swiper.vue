<script setup>
// Core
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
import { useI18n } from 'vue-i18n';
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// icons
import { AltArrowLeftIcon, AltArrowRightIcon } from '@/components/Icons';

const { t } = useI18n()
// props
const props = defineProps({
  images: {
    type: Array,
    required: true
  }
})

const modules = [Pagination, Autoplay,Navigation]
</script>

<template>
  <div class="mt-10 relative ">
    <h2 class=" font-semibold text-2xl text-greyscale-900 mb-5">{{ t('our-gallery') }}</h2>
    <div class="flex rounded-[20px] mb-5 overflow-hidden">     
        <swiper
        :modules="modules"
        :slides-per-view="3"
        :space-between="12"
        :autoplay="{ delay: 4000 }"
         style="width: 100%; min-height: 158px;"
         :navigation="{ nextEl: '.custom-next', prevEl: '.custom-prev' }"
        >
        <template v-for="(item, index) in props.images" :key="index">
          <swiper-slide>
            <div
                class="w-full h-full rounded-2x relative"
              >
                <div 
                  class="rounded-lg overflow-hidden aspect-ratio-box relative" 
                  :style="{ '--dynamic-src': `url(${item.url})` }"
                >
                  <img :src="item.url" alt="rasm" class="w-full h-full object-contain absolute z-2" />
                </div>
            </div>
          </swiper-slide>
        </template>
        </swiper>
        <template v-if="props.images.length > 3">
          <div class="custom-prev shadow-slide-button cursor-pointer absolute top-0 right-14  w-[42px] h-[42px] rounded-full bg-greyscale-50 hover:bg-primary-100 flex justify-center items-center">
            <div class="text-primary-500">
              <base-iconify :icon="AltArrowLeftIcon" />
            </div>
          </div>
          <div class="custom-next shadow-slide-button cursor-pointer absolute top-0 right-2 w-[42px] h-[42px] rounded-full bg-greyscale-50 hover:bg-primary-100 flex items-center justify-center">
            <div class="text-primary-500">
              <base-iconify :icon="AltArrowRightIcon" />
            </div>
          </div>
        </template>
    </div>
  </div>
</template>

<style scoped>
.swiper-slide  {
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
}

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
