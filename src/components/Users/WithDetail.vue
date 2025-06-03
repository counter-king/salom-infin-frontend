<script setup>
import { vMaska } from 'maska'
import {
  BuildingsBoldIcon,
  CallMedicineRoundedBoldIcon,
  CityBoldIcon,
  GarageBoldIcon,
  HashtagCircleBoldIcon,
  LetterBoldIcon,
  MapPointBoldIcon,
  UsersGroupTwoRoundedBoldIcon
} from '@/components/Icons'
import { StatusChip } from '@/components/Chips'

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  color: {
    type: String
  },
  image: {
    type: String
  },
  meta: {
    type: Object,
    default: () => {}
  },
})
</script>

<template>
  <div class="bg-white !shadow-overlay overflow-hidden !rounded-[20px] w-[477px] mx-2">
    <div class="rounded-[20px] overflow-hidden pb-8">
      <div class="h-[70px] relative rounded-tl-2xl rounded-tr-2xl">
        <div class="absolute top-1 left-1 w-[calc(100%-8px)] h-[calc(100%-4px)] bg-primary-30 rounded-tl-2xl rounded-tr-2xl"></div>
      </div>

      <div class="relative -mt-10 px-6">
        <div class="flex justify-center items-center w-[72px] h-[72px] rounded-full bg-white">
          <base-avatar
            :image="props.image"
            :color="props.color"
            :label="props.label[0]"
            avatarClasses="w-16 h-16"
          >
            <span class="text-3xl font-semibold text-white">{{ props.label[0] }}</span>
          </base-avatar>
        </div>

        <div class="flex items-center mt-1">
          <div class="flex-1">
            <h1 class="text-greyscale-900 font-bold text-base">{{ props.label }}</h1>
            <span class="block text-sm font-medium text-greyscale-500">{{ props.meta?.position?.name ?? '-' }}</span>
          </div>

          <status-chip
            type="handbook"
            border
            circle
            :status="{ code: props.meta?.status?.code }"
          >
            {{ props.meta?.status?.name }}
          </status-chip>
        </div>

        <div class="space-y-3 mt-4">
          <div class="flex items-center gap-[10px]">
            <base-iconify :icon="BuildingsBoldIcon" class="text-greyscale-400" />

            <span class="text-sm font-medium text-greyscale-900">{{ props.meta?.company?.name ?? '-' }}</span>
          </div>

          <div class="flex items-center gap-[10px]">
            <base-iconify :icon="CityBoldIcon" class="text-greyscale-400" />

            <span class="text-sm font-medium text-greyscale-900">{{ props.meta?.top_level_department?.name ?? '-' }}</span>
          </div>

          <div class="flex items-center gap-[10px]">
            <base-iconify :icon="UsersGroupTwoRoundedBoldIcon" class="text-greyscale-400" />

            <span class="text-sm font-medium text-greyscale-900">{{ props.meta?.department?.name ?? '-' }}</span>
          </div>

          <div class="flex items-center gap-[10px]">
            <base-iconify :icon="MapPointBoldIcon" class="text-greyscale-400" />

            <span class="text-sm font-medium text-greyscale-900">{{ props.meta?.work_address ?? '-' }}</span>
          </div>

          <div class="flex items-center gap-[10px]">
            <base-iconify :icon="GarageBoldIcon" class="text-greyscale-400" />

            <span class="text-sm font-medium text-greyscale-900">{{ props.meta?.floor ?? '-' }}</span>
          </div>

          <div class="flex items-center gap-[10px]">
            <base-iconify :icon="HashtagCircleBoldIcon" class="text-greyscale-400" />

            <span class="text-sm font-medium text-greyscale-900">{{ props.meta?.room_number ?? '-' }}</span>
          </div>

          <div class="flex items-center gap-[10px]">
            <base-iconify :icon="CallMedicineRoundedBoldIcon" class="text-greyscale-400" />

            <span class="text-sm font-medium text-greyscale-900">{{ props.meta?.cisco ?? '-' }}</span>
          </div>

          <div class="flex items-center gap-[10px]">
            <base-iconify :icon="CallMedicineRoundedBoldIcon" class="text-greyscale-400" />

            <template v-if="props.meta?.mobile_number">
              <input
                :value="props.meta?.mobile_number ?? '-'"
                v-maska
                data-maska="+### ## ### ## ##"
                type="text"
                readonly
                class="w-full border-transparent bg-transparent outline-none cursor-pointer text-sm font-medium text-greyscale-900"
              />
            </template>

            <template v-else>
              <span class="text-sm font-medium text-greyscale-900">Скрыт пользователем</span>
            </template>
          </div>

          <div class="flex items-center gap-[10px]">
            <base-iconify :icon="CallMedicineRoundedBoldIcon" class="text-greyscale-400" />

            <span class="text-sm font-medium text-greyscale-900">{{ props.meta?.phone_2 ?? '-' }}</span>
          </div>

          <div class="flex items-center gap-[10px]">
            <base-iconify :icon="LetterBoldIcon" class="text-greyscale-400" />

            <span class="text-sm font-medium text-greyscale-900">{{ props.meta?.email ?? '-' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
