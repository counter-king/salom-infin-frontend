<script setup>
// Core
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper/modules'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

const modules = [Pagination, Autoplay]
</script>

<template>
  <div class="flex rounded-[20px] mb-5 overflow-hidden">
    <swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="4"
      :pagination="{ clickable: true }"
      :autoplay="{ delay: 4000, disableOnInteraction: false }"
      class="w-full"
    >
      <swiper-slide>
        <div class="w-full h-full">
          <img src="/images/dashboard/slide-1.svg" alt="Slide1" class="w-full object-cover">
        </div>
      </swiper-slide>

      <swiper-slide>
        <div class="w-full h-full">
          <img src="/images/dashboard/slide-2.svg" alt="Slide2" class="w-full object-cover">
        </div>
      </swiper-slide>

      <swiper-slide>
        <div class="w-full h-full">
          <img src="/images/dashboard/slide-3.svg" alt="Slide3" class="w-full object-cover">
        </div>
      </swiper-slide>

      <swiper-slide>
        <div class="w-full h-full">
          <img src="/images/dashboard/slide-4.svg" alt="Slide4" class="w-full object-cover">
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style>
.swiper-pagination-bullet {
  background: white!important;
  opacity: 0.5!important;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  transition: all 0.3s ease-in-out;
}
.swiper-pagination-bullet-active {
  opacity: 1!important;
  width: 20px;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
}
</style>
