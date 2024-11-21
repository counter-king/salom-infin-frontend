<script setup>
// Core
import { useReward } from 'vue-rewards'
import { useI18n } from "vue-i18n"
import { computed, onMounted, ref } from "vue"
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
// Utils
import { returnFirstLetter } from "@/utils"
// Store
import { useDashboardBirthdayStore } from "@/modules/Dashboard/stores/birthday.store"
// Non-reactive
const modules = [Autoplay, Navigation]
const config = {
  startVelocity: 10,
  spread: 180,
  elementCount: 100
}
// Composable
const { reward } = useReward('confetti', 'confetti', config)
const { t } = useI18n()
const birthdayStore = useDashboardBirthdayStore()

// Computed
const todayActive = computed(() => {
  return birthdayStore.tabItems[0].active
})

// Methods
const onTabChange = (item) => {
  birthdayStore.tabItems.forEach(tab => tab.active = tab.id === item.id)
  birthdayStore.birthdayList = item.id === 1 ? birthdayStore.todayBornList : birthdayStore.tomorrowBornList
}
const onGiftClick = async (gift) => {
  if (todayActive.value && !gift.disable) {
    reward()
    gift.count += 1
    gift.disable = true
    gift.selected = true
    birthdayStore.todayBornList?.find(item => item.id === gift.user_id)?.gifts?.forEach(g => g.disable = true)
    await birthdayStore.actionCongratulateUser({
      birthday_user: gift.user_id,
      reaction: gift.value
    })
  }

}
const returnGiftClass = (gift) => {
  if (gift.selected) {
    return 'border-2 border-primary-200 bg-primary-100'
  } else if (gift.disable) {
    return ''
  } else {
    return 'cursor-pointer hover:bg-greyscale-100'
  }
}
// Hooks
onMounted(async () => {
  await birthdayStore.actionGetBirthdayList({})
})
</script>

<template>

  <div class="birthday-widgget flex flex-col shadow-button rounded-[20px] bg-white py-4 px-5">
    <div class="flex justify-between items-center">
      <span class="text-greyscale-900 text-base font-semibold">{{ t('birthday') }}</span>

      <div class="flex gap-x-1">
        <div
          v-for="item in birthdayStore.tabItems"
          :key="item.id"
          class="hover:bg-greyscale-50 text-xs font-semibold rounded-[6px] px-2 py-[2px] cursor-pointer select-none relative"
          :class="item.active ? 'bg-greyscale-50 text-primary-500' : 'bg-white text-greyscale-500'"
          @click="onTabChange(item)"
        >
          {{ t(item.label) }}

          <div
            v-if="item.count"
            class="absolute w-4 h-4 rounded-full flex justify-center items-center text-[10px] text-white -top-2 -right-1"
            :class="item.active ? 'bg-critic-500' : 'bg-greyscale-200'"
          >
            {{ item.count }}
          </div>
        </div>
      </div>
    </div>

    <div class="flex w-full h-full mt-6">
      <template v-if="birthdayStore.loading">
        <base-spinner />
      </template>
      <template v-else>
        <template v-if="!birthdayStore.birthdayList.length">
          <div class="flex flex-col gap-y-3 justify-center items-center w-full">
            <div class="flex justify-center items-center w-16 h-16 rounded-[20px] bg-greyscale-50">
              <img src="/images/dashboard/gift-1.svg" alt="Gift" class="w-8 h-8">
            </div>
            <span class="text-greyscale-400 text-xs font-medium">{{ t('no-birthdays-today') }}</span>
          </div>
        </template>
        <template v-else>
          <swiper
            :modules="modules"
            :slides-per-view="1"
            :space-between="4"
            navigation
            :autoplay="{ delay: 60000, disableOnInteraction: false }"
            class="w-full"
          >
            <swiper-slide
              v-for="item in birthdayStore.birthdayList"
              :key="item.id"
            >
              <div class="flex flex-col items-center">
                <div class="flex flex-col w-12 h-12 justify-center items-center text-base font-semibold text-white bg-primary-500 rounded-full">{{ returnFirstLetter(item.full_name) }}</div>
                <div class="text-greyscale-900 text-sm font-semibold mt-3">{{ item?.full_name }}</div>
                <div class="text-greyscale-400 text-xs font-medium mt-1">{{ item?.position?.name }}</div>

                <div class="flex justify-around items-center mt-3 w-full">
                  <div
                    v-for="gift in item.gifts"
                    :key="gift.id"
                    class="flex flex-col items-center gap-y-1"
                  >
                    <div
                      class="flex flex-col justify-center items-center w-12 h-12 bg-greyscale-50 rounded-2xl"
                      :class="returnGiftClass(gift)"
                      @click="onGiftClick(gift)"
                    >
                      <img
                        :src="gift.image"
                        alt="Gift"
                        class="w-7 h-7"
                        :class="{ 'opacity-50' : gift.disable && !gift.selected }"
                      >
                    </div>

                    <span class="text-greyscale-400 text-xs font-medium">{{ gift.count }}</span>
                  </div>
                </div>
              </div>
            </swiper-slide>
            <span id="confetti" class="absolute top-0 right-1/2 w-0 h-full"></span>
          </swiper>
        </template>
      </template>
    </div>
  </div>
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
