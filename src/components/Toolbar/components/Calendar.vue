<script setup>
// Core
import {useI18n} from "vue-i18n"
// Components
import {CalendarBoldDuotoneIcon, CalendarDateBoldDuotoneIcon, UserCheckBoldDuotoneIcon, ArrowRightUpIcon} from "@/components/Icons"

// Composable
const { t } = useI18n()

const items = [
  {
    id: 1,
    title: "my-tasks",
    description: "create-tasks",
    icon: UserCheckBoldDuotoneIcon
  },
  {
    id: 2,
    title: "events",
    description: "create-events",
    icon: CalendarBoldDuotoneIcon
  },
  {
    id: 3,
    title: "receipt",
    description: "create-receipt",
    icon: CalendarDateBoldDuotoneIcon
  }
]

const emit = defineEmits(['emit:select'])
</script>

<template>
  <div class="calendar-menu flex justify-between w-full">
    <div class="flex flex-col gap-y-1 w-[267px]">
      <div
        v-for="item in items"
        :key="item.id"
        class="flex flex-col flex-1 w-full group hover:bg-primary-10 rounded-lg border border-white hover:border hover:border-primary-30 cursor-pointer px-4 py-3"
      >
        <div class="flex justify-between">
          <base-iconify
            :icon="item.icon"
            class="text-greyscale-500 group-hover:text-primary-500"
          />

          <base-iconify
            :icon="ArrowRightUpIcon"
            class="text-greyscale-500 group-hover:text-primary-500"
          />
        </div>

        <div class="text-sm font-semibold text-greyscale-900 mt-2">{{ t(item.title) }}</div>
        <div class="text-xs text-greyscale-500 mt-1">{{ t(item.description) }}</div>
      </div>
    </div>

    <div class="h-full border"></div>

    <div class="flex flex-col gap-y-1 w-[267px]">

    </div>
  </div>
</template>

<style scoped>

</style>
