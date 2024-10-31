<script setup>
// Core
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
// Components
import { CheckCircleBoldIcon } from '@/components/Icons'
// Stores
import { useCalendarStore } from '../stores/calendar.store'
// Enums
import { EVENT_TYPES } from '../enums'
// Composable
const { t } = useI18n()
const calendarStore = useCalendarStore()
// Reactive
const test = ref([EVENT_TYPES.EVENT, EVENT_TYPES.TASK])
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-1">
      <h1 class="text-lg font-semibold text-primary-900">{{ t('my-calendars') }}</h1>

      <span></span>
    </div>

    <ul>
      <li
        class="flex items-center gap-2 hover:bg-greyscale-50 cursor-pointer rounded-lg py-[10px] px-3"
        @click="calendarStore.filterEvent(EVENT_TYPES.EVENT)"
      >
        <!-- <Checkbox
          v-model="test"
          :value="EVENT_TYPES.EVENT"
          :pt="{
            root: {
              class: 'flex items-center'
            },
            input:{
              class: 'w-[18px] h-[18px] rounded'
            }
          }"
        /> -->
        <base-iconify :icon="CheckCircleBoldIcon" class="text-primary-500" />
        <span class="text-sm font-medium text-primary-900">{{ t('events') }}</span>
      </li>

      <li
        class="flex items-center gap-2 hover:bg-greyscale-50 cursor-pointer rounded-lg py-[10px] px-3"
        @click="calendarStore.filterEvent(EVENT_TYPES.TASK)"
      >
        <!-- <Checkbox
          v-model="test"
          :value="EVENT_TYPES.TASK"
          :pt="{
            root: {
              class: 'flex items-center'
            },
            input:{
              class: 'w-[18px] h-[18px] rounded'
            }
          }"
        /> -->
        <base-iconify :icon="CheckCircleBoldIcon" class="text-primary-500" />
        <span class="text-sm font-medium text-primary-900">{{ t('tasks') }}</span>
      </li>
    </ul>
  </div>
</template>
