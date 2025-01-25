<script setup>
// Core
import { onMounted } from "vue"
import { useI18n } from "vue-i18n"
// Store
import { useDashboardBirthdayStore } from "@/modules/Dashboard/stores/birthday.store"
import { returnFirstLetter, returnStatusColor } from "@/utils";
import { DialogBoldIcon } from "@/components/Icons";

// Composable
const { t } = useI18n()
const store = useDashboardBirthdayStore()

// Methods
const returnReaction = (reaction) => {
  switch (reaction) {
    case 'party_popper':
      return  `/images/dashboard/gift-1.svg`
    case 'cake':
      return `/images/dashboard/gift-2.svg`
    default:
      return `/images/dashboard/gift-3.svg`
  }
}

// Hooks
onMounted(async () => {
  await store.actionGetBirthdayCongratulations()
})
</script>

<template>
  <div class="flex flex-col max-h-[calc(100vh-500px)] min-h-[80px] overflow-y-auto">
    <template v-if="store.birthdayCongratulationLoading">
      <base-spinner />
    </template>

    <template v-else>
      <template v-if="!store.birthdayCongratulations.length">
        <div class="flex flex-col items-center gap-y-2">
          <img
            src="/images/dashboard/illustration.svg"
            alt="Gift"
            class="w-[104px] h-[104px]"
          >

          <span class="text-sm text-greyscale-900 font-semibold">{{ t('no-data') }}</span>
        </div>
      </template>

      <template v-else>
        <div
          v-for="item in store.birthdayCongratulations"
          :key="item.id"
          class="flex flex-col border-b-[1.5px] border-greyscale-100 py-3"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-x-3 w-[394px]">
              <base-avatar
                v-if="item.user"
                :label="item?.user?.full_name"
                :image="item?.user?.avatar?.url"
                :color="item?.user?.color"
                avatarClasses="w-11 h-11"
              />
              <div v-else class="flex flex-col w-11 h-11 justify-center items-center text-base font-semibold text-white bg-primary-500 rounded-full">{{ returnFirstLetter(item.full_name) }}</div>

              <div class="flex flex-col gap-y-1 truncate">
                <span class="text-sm text-greyscale-900 font-semibold">{{ item?.user?.full_name }}</span>
                <span class="text-xs text-greyscale-400 font-medium">{{ item?.user?.position?.name }} &nbsp; - &nbsp; {{ item?.user?.company?.name }}</span>
              </div>
            </div>

            <div class="flex flex-col gap-y-1 ml-6">
              <span class="text-xs font-semibold" :class="returnStatusColor(item?.user?.status?.code)">{{ item?.user?.status?.name }}</span>
              <span class="text-xs font-medium text-greyscale-500">{{ item.user?.cisco || '00-00' }}</span>
            </div>

            <div
              class="flex flex-col justify-center items-center w-12 h-12 bg-greyscale-50 rounded-2xl"
            >
              <img
                v-if="item.reaction"
                :src="returnReaction(item.reaction)"
                alt="Gift"
                class="w-7 h-7"
              >
            </div>
          </div>

          <div
            v-if="item.comment"
            class="flex bg-greyscale-50 items-center rounded-lg py-2 px-[10px] mt-2 gap-x-2"
          >
            <base-iconify
              :icon="DialogBoldIcon"
              class="text-greyscale-400"
            />

            <span class="flex-1 text-primary-500 text-xs font-medium">
              {{ item.comment }}
            </span>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<style scoped>

</style>
