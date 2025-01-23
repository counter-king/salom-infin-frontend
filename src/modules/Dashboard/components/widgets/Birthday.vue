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
import { returnFirstLetter, returnStatusColor } from "@/utils"
// Store
import { useDashboardBirthdayStore } from "@/modules/Dashboard/stores/birthday.store"
import { useAuthStore } from "@/modules/Auth/stores"
// Components
import { AltArrowRightIcon } from "@/components/Icons"
import BaseBrickRadio from "@/components/UI/BaseBrickRadio.vue"
// Non-reactive
const modules = [Autoplay, Navigation]
const config = {
  startVelocity: 10,
  spread: 180,
  elementCount: 100
}
// Reactive
const dialog = ref(false)
const selectedTab = ref('today')
// Composable
const { reward } = useReward('confetti', 'confetti', config)
const { t } = useI18n()
const birthdayStore = useDashboardBirthdayStore()
const authStore = useAuthStore()

// Computed
const todayActive = computed(() => {
  return birthdayStore.tabItems[0].active
})

// Methods
const onTabChange = (item) => {
  const todayOurCompanyBornList = birthdayStore.todayBornList.filter(tb => tb?.company?.id === authStore?.currentUser?.company?.id)
  const tomorrowOurCompanyBornList = birthdayStore.tomorrowBornList.filter(tb => tb?.company?.id === authStore?.currentUser?.company?.id)

  birthdayStore.tabItems.forEach(tab => tab.active = tab.id === item.id)
  birthdayStore.filialItems.forEach(tab => tab.active = tab.id === 1)
  birthdayStore.birthdayList = item.id === 1 ?
    todayOurCompanyBornList
    : tomorrowOurCompanyBornList

  birthdayStore.filialItems[0].count = item.id === 1 ? todayOurCompanyBornList?.length || null : tomorrowOurCompanyBornList?.length || null
  birthdayStore.filialItems[1].count = item.id === 1 ? birthdayStore.todayBornList?.length || null : birthdayStore.tomorrowBornList?.length || null
}
const onFilialTabChange = (item) => {
  const todayOurCompanyBornList = birthdayStore.todayBornList.filter(tb => tb?.company?.id === authStore?.currentUser?.company?.id)
  const todayAllList = birthdayStore.todayBornList
  const tomorrowOurCompanyBornList = birthdayStore.tomorrowBornList.filter(tb => tb?.company?.id === authStore?.currentUser?.company?.id)
  const tomorrowAllList = birthdayStore.tomorrowBornList
  const today = Boolean(birthdayStore.tabItems[0].active)

  birthdayStore.birthdayList = item.id === 1 && today ? todayOurCompanyBornList :
    item.id === 2 && today ? todayAllList :
      item.id === 1 && !today ? tomorrowOurCompanyBornList :
        tomorrowAllList

  birthdayStore.filialItems.forEach(tab => tab.active = tab.id === item.id)

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

<!--          <div-->
<!--            v-if="item.count"-->
<!--            class="absolute w-4 h-4 rounded-full flex justify-center items-center text-[10px] text-white -top-2 -right-1"-->
<!--            :class="item.active ? 'bg-critic-500' : 'bg-greyscale-200'"-->
<!--          >-->
<!--            {{ item.count }}-->
<!--          </div>-->
        </div>
      </div>
    </div>

    <div class="bg-greyscale-200 w-full h-[0.5px] rounded-full mt-2 -mx-5" />

    <div class="flex items-center gap-x-4 mt-3 mb-6">
      <div
        v-for="item in birthdayStore.filialItems"
        :key="item.id"
        class="flex items-center gap-x-1 cursor-pointer select-none"
        @click="onFilialTabChange(item)"
      >
              <span
                class="text-xs font-semibold"
                :class="item.active ? 'text-greyscale-900' : 'text-greyscale-400'"
              >
                {{ t(item.label) }}
              </span>

        <div
          v-if="item.count"
          class="flex justify-center items-center w-5 h-5 rounded-full text-xs font-semibold"
          :class="item.active ? 'bg-critic-500 text-white' : 'bg-greyscale-50 text-greyscale-300'"
        >
          {{ item.count }}
        </div>
      </div>
    </div>

    <div class="flex flex-col w-full h-full mt-3">
      <template v-if="birthdayStore.loading">
        <base-spinner />
      </template>
      <template v-else>
        <template v-if="!birthdayStore.birthdayList.length">
          <div class="flex flex-col gap-y-3 justify-center items-center w-full h-full">
            <div class="flex justify-center items-center w-16 h-16 rounded-[20px] bg-greyscale-50">
              <img src="/images/dashboard/gift-1.svg" alt="Gift" class="w-8 h-8">
            </div>
            <span class="text-greyscale-400 text-xs font-medium">{{ todayActive ? t('no-birthdays-today') : t('no-birthdays-tomorrow') }}</span>
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
                <base-avatar
                  v-if="item.avatar"
                  :label="item?.full_name"
                  :image="item.avatar?.url"
                  :color="item?.color"
                  avatarClasses="w-12 h-12"
                />
                <div v-else class="flex flex-col w-12 h-12 justify-center items-center text-base font-semibold text-white bg-primary-500 rounded-full">{{ returnFirstLetter(item.full_name) }}</div>
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

          <div class="flex justify-center mt-6">
            <div
              class="flex items-center gap-x-1 text-sm text-primary-500 font-semibold cursor-pointer select-none"
              @click="dialog = true"
            >
              <span>{{ t('all-birthdays') }}</span>
              <base-iconify
                :icon="AltArrowRightIcon"
                class="text-primary-500 !h-4 !w-4"
              />
            </div>
          </div>
        </template>
      </template>
    </div>

    <!-- All birthday users dialog -->
    <base-dialog
      v-model="dialog"
      max-width="max-w-[893px]"
      label="all-birthdays"
      :draggable="false"
    >
      <template #content>
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-x-4 mb-3">
            <div
              v-for="item in birthdayStore.filialItems"
              :key="item.id"
              class="flex items-center gap-x-2 cursor-pointer select-none"
              @click="onFilialTabChange(item)"
            >
              <span
                class="text-base font-semibold"
                :class="item.active ? 'text-greyscale-900' : 'text-greyscale-400'"
              >
                {{ t(item.label) }}
              </span>

              <div
                v-if="item.count"
                class="flex justify-center items-center w-7 h-7 rounded-full text-sm font-semibold"
                :class="item.active ? 'bg-critic-30 text-critic-500' : 'bg-greyscale-50 text-greyscale-400'"
              >
                {{ item.count }}
              </div>
            </div>
          </div>

          <base-brick-radio
            v-model="selectedTab"
            :items="birthdayStore.tabItems"
            @emit:on-change="(tab) => onTabChange(tab)"
          />
        </div>

        <template v-if="!birthdayStore.birthdayList.length">
          <div class="flex flex-col gap-y-3 justify-center items-center w-full h-full min-h-[200px]">
            <div class="flex justify-center items-center w-16 h-16 rounded-[20px] bg-greyscale-50">
              <img src="/images/dashboard/gift-1.svg" alt="Gift" class="w-8 h-8">
            </div>
            <span class="text-greyscale-400 text-sm font-medium">{{ todayActive ? t('no-birthdays-today') : t('no-birthdays-tomorrow') }}</span>
          </div>
        </template>

        <template v-else>
          <div class="flex flex-col mt-2 max-h-[calc(100vh-500px)] overflow-y-auto">
            <div
              v-for="item in birthdayStore.birthdayList"
              :key="item.id"
              class="flex items-center justify-between border-b-[1.5px] border-greyscale-100 py-3"
            >
              <div class="flex items-center gap-x-3 w-[394px]">
                <base-avatar
                  v-if="item.avatar"
                  :label="item?.full_name"
                  :image="item.avatar?.url"
                  :color="item?.color"
                  avatarClasses="w-11 h-11"
                />
                <div v-else class="flex flex-col w-11 h-11 justify-center items-center text-base font-semibold text-white bg-primary-500 rounded-full">{{ returnFirstLetter(item.full_name) }}</div>

                <div class="flex flex-col gap-y-1 truncate">
                  <span class="text-sm text-greyscale-900 font-semibold">{{ item.full_name }}</span>
                  <span class="text-xs text-greyscale-400 font-medium">{{ item.position?.name }} &nbsp; - &nbsp; {{ item?.company?.name }}</span>
                </div>
              </div>

              <div class="flex flex-col gap-y-1 ml-6">
                <span class="text-xs font-semibold" :class="returnStatusColor(item?.status?.code)">{{ item.status?.name }}</span>
                <span class="text-xs font-medium text-greyscale-500">{{ item.cisco || '00-00' }}</span>
              </div>

              <div class="flex items-center flex-1 justify-end gap-x-4">
                <div
                  v-for="gift in item.gifts"
                  :key="gift.id"
                  class="flex flex-col items-center gap-y-1"
                >
                  <div
                    class="flex flex-col justify-center items-center w-11 h-11 bg-greyscale-50 rounded-xl"
                    :class="returnGiftClass(gift)"
                    @click="onGiftClick(gift)"
                  >
                    <img
                      :src="gift.image"
                      alt="Gift"
                      class="w-6 h-6"
                      :class="{ 'opacity-50' : gift.disable && !gift.selected }"
                    >
                  </div>

                  <span class="text-greyscale-400 text-xs font-medium">{{ gift.count }}</span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </template>
    </base-dialog>
    <!-- /All birthday users dialog -->
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
