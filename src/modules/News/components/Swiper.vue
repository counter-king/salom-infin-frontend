<script setup>
// Core
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import { AltArrowLeftIcon, AltArrowRightIcon } from '@/components/Icons';

const modules = [Pagination, Autoplay,Navigation]
</script>

<template>
  <div class="mt-10 relative ">
    <h2 class=" font-semibold text-2xl text-greyscale-900 mb-5">Наша галерея</h2>
    <div class="flex rounded-[20px] mb-5 overflow-hidden">     
        <swiper
        :modules="modules"
        :slides-per-view="3"
        :loop="Boolean(true)"
        :space-between="12"
        :autoplay="{ delay: 4000, disableOnInteraction: false }"
        style="width: 840px; height: 158px;"
         :navigation="{ nextEl: '.custom-next', prevEl: '.custom-prev' }"
        >
        <swiper-slide>
            <div class="w-full h-full">
             <img src="/images/dashboard/slide-1.svg" alt="Slide1" class="w-full h-full object-cover">
            </div>
        </swiper-slide>

        <swiper-slide>
            <div class="w-full h-full">
            <img src="/images/dashboard/slide-2.svg" alt="Slide2" class="w-full  h-full object-cover">
            </div>
        </swiper-slide>

        <swiper-slide>
            <div class="w-full h-full">
            <img src="/images/dashboard/slide-3.svg" alt="Slide3" class="w-full  h-full object-cover">
            </div>
        </swiper-slide>

        <swiper-slide>
            <div class="w-full h-full ">
            <img src="/images/dashboard/slide-4.svg" alt="Slide4" class="w-full  h-full object-cover">
            </div>
        </swiper-slide>
        </swiper>
        <div class="custom-prev shadow-slide-button cursor-pointer absolute top-0 right-14  w-[42px] h-[42px] rounded-full bg-greyscale-50 flex justify-center items-center">
          <div class="text-primary-500">
            <base-iconify :icon="AltArrowLeftIcon" />
          </div>
        </div>
        <div class="custom-next shadow-slide-button cursor-pointer absolute top-0 right-2 w-[42px] h-[42px] rounded-full bg-greyscale-50 flex items-center justify-center hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300">
          <div class="text-primary-500">
            <base-iconify :icon="AltArrowRightIcon" />
          </div></div>
    </div>
  </div>
</template>

<style>
.swiper-slide  {
  width: 178px;  /* Har bir slaydning kengligi */
  height: 158px;  /* Har bir slaydning balandligi */
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
}
</style>
