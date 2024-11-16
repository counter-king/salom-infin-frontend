<script setup>
// Core
import { useReward } from 'vue-rewards'
import { useI18n } from "vue-i18n"
import { ref } from "vue"
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation } from 'swiper/modules'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

const modules = [Autoplay, Navigation]
// Components
import { UserWithAction } from '@/components/Users'
import { GiftIcon } from '@/components/Icons'
import WidgetWrapper from '../WidgetWrapper.vue'
// Non-reactive
const config = {
  startVelocity: 10,
  spread: 180,
  elementCount: 100
}
const wishItems = [
  {
    id: 1,
    image: '/images/dashboard/gift-1.svg',
    count: 12
  },
  {
    id: 2,
    image: '/images/dashboard/gift-2.svg',
    count: 73
  },
  {
    id: 3,
    image: '/images/dashboard/gift-3.svg',
    count: 45
  },
  {
    id: 4,
    image: '/images/dashboard/gift-4.svg',
    count: 24
  }
]
// Reactive
const tabItems = ref([
  {
    id: 1,
    label: 'today',
    active: true
  },
  {
    id: 2,
    label: 'tomorrow',
    active: false
  }
])
// Composable
const { reward } = useReward('confetti', 'confetti', config)
const { t } = useI18n()

// Methods
const onTabChange = (item) => {
  tabItems.value.forEach(tab => tab.active = tab.id === item.id)
}
</script>

<template>

  <div class="birthday-widgget flex flex-col shadow-button rounded-[20px] bg-white py-4 px-5">
    <div class="flex justify-between items-center">
      <span class="text-greyscale-900 text-base font-semibold">{{ t('birthday') }}</span>

      <div class="flex gap-x-1">
        <div
          v-for="item in tabItems"
          :key="item.id"
          class="hover:bg-greyscale-50 text-xs font-semibold rounded-[6px] px-2 py-[2px] cursor-pointer select-none"
          :class="item.active ? 'bg-greyscale-50 text-primary-500' : 'bg-white text-greyscale-500'"
          @click="onTabChange(item)"
        >
          {{ t(item.label) }}
        </div>
      </div>
    </div>

    <div class="flex w-full h-full mt-6">
      <swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="4"
        navigation
        :autoplay="{ delay: 60000, disableOnInteraction: false }"
        class="w-full"
      >
        <swiper-slide>
          <div class="flex flex-col items-center">
            <div class="flex flex-col w-12 h-12 justify-center items-center text-base font-semibold text-white bg-primary-500 rounded-full">N</div>
            <div class="text-greyscale-900 text-sm font-semibold mt-3">Nematullayev Davron Karim o’g’li</div>
            <div class="text-greyscale-400 text-xs font-medium mt-1">Bosh mutaxasis</div>

            <div class="flex justify-around items-center mt-3 w-full">
              <div
                v-for="item in wishItems"
                :key="item.id"
                class="flex flex-col items-center gap-y-1"
              >
                <div class="flex flex-col justify-center items-center w-12 h-12 bg-greyscale-50 hover:bg-greyscale-100 rounded-2xl cursor-pointer">
                  <img :src="item.image" alt="Gift" class="w-7 h-7">
                </div>

                <span class="text-greyscale-400 text-xs font-medium">{{ item.count }}</span>
              </div>
            </div>
          </div>
        </swiper-slide>

        <swiper-slide>
          <div class="flex flex-col items-center">
            <div class="flex flex-col w-12 h-12 justify-center items-center text-base font-semibold text-white bg-primary-500 rounded-full">E</div>
            <div class="text-greyscale-900 text-sm font-semibold mt-3">Eshmatov Toshmat Bahodir o'g'li</div>
            <div class="text-greyscale-400 text-xs font-medium mt-1">Yetakchi mutaxassis</div>

            <div class="flex justify-around items-center mt-3 w-full">
              <div
                v-for="item in wishItems"
                :key="item.id"
                class="flex flex-col items-center gap-y-1"
              >
                <div class="flex flex-col justify-center items-center w-12 h-12 bg-greyscale-50 hover:bg-greyscale-100 rounded-2xl cursor-pointer">
                  <img :src="item.image" alt="Gift" class="w-7 h-7">
                </div>

                <span class="text-greyscale-400 text-xs font-medium">{{ item.count }}</span>
              </div>
            </div>
          </div>
        </swiper-slide>

        <swiper-slide>
          <div class="flex flex-col items-center">
            <div class="flex flex-col w-12 h-12 justify-center items-center text-base font-semibold text-white bg-primary-500 rounded-full">A</div>
            <div class="text-greyscale-900 text-sm font-semibold mt-3">Alijonova Nigora Otamurodovna</div>
            <div class="text-greyscale-400 text-xs font-medium mt-1">Mutaxassis</div>

            <div class="flex justify-around items-center mt-3 w-full">
              <div
                v-for="item in wishItems"
                :key="item.id"
                class="flex flex-col items-center gap-y-1"
              >
                <div class="flex flex-col justify-center items-center w-12 h-12 bg-greyscale-50 hover:bg-greyscale-100 rounded-2xl cursor-pointer">
                  <img :src="item.image" alt="Gift" class="w-7 h-7">
                </div>

                <span class="text-greyscale-400 text-xs font-medium">{{ item.count }}</span>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>

<!--  <widget-wrapper title="birthday">
    <template #content>
      <template v-for="(item, index) in 7" :key="index">
        <user-with-action
          label="Нэматуллаев Даврон"
          sub-title="Bank ijro apparati"
          :class="{ 'mb-1': index !== 7 - 1 }"
        >
          <template #title-after>
            <div class="w-[6px] h-[6px] bg-greyscale-400 rounded-full"></div>
            <span class="text-xs text-greyscale-500">00-12</span>
          </template>

          <template #action>
            <base-iconify
              :icon="GiftIcon"
              class="!w-4 !h-4 text-greyscale-400"
              @click="reward"
            />
          </template>
        </user-with-action>
      </template>
      <span id="confetti" class="absolute top-0 right-1/2 w-0 h-full"></span>
    </template>
  </widget-wrapper>-->
</template>

<style>
.swiper-button-prev,
.swiper-button-next {
  width: 32px!important;
  height: 32px!important;
  border-radius: 50%!important;
  background: var(--primary-50)!important;
  top: 32px
}

.swiper-button-prev:after,
.swiper-button-next:after {
  font-size: 12px!important;
  font-weight: bold!important;
  color: #7A86A0!important;
}
</style>
