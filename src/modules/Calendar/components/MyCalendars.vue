<script setup>
// Core
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
// Stores
import { useCalendarStore } from '../stores/calendar.store'
// Enums
import { EVENT_TYPES } from '../enums'
// Composable
const { t } = useI18n()
const calendarStore = useCalendarStore()
// Reactive
const eventMenus = ref([EVENT_TYPES.EVENT, EVENT_TYPES.TASK])
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
      >
        <Checkbox
          v-model="eventMenus"
          :value="EVENT_TYPES.EVENT"
          input-id="checkbox-event"
          :pt="{
            root: {
              class: 'flex items-center'
            },
            input:{
              class: 'checkbox-event w-[18px] h-[18px] rounded'
            }
          }"
          @change="calendarStore.filterEvent(eventMenus)"
        />
        <label for="checkbox-event" class="text-sm font-medium text-primary-900 cursor-pointer">{{ t('events') }}</label>
      </li>

      <li
        class="flex items-center gap-2 hover:bg-greyscale-50 cursor-pointer rounded-lg py-[10px] px-3"
      >
        <Checkbox
          v-model="eventMenus"
          :value="EVENT_TYPES.TASK"
          input-id="checkbox-task"
          :pt="{
            root: {
              class: 'flex items-center'
            },
            input:{
              class: 'checkbox-task w-[18px] h-[18px] rounded'
            }
          }"
          @change="calendarStore.filterEvent(eventMenus)"
        />
        <label for="checkbox-task" class="text-sm font-medium text-primary-900 cursor-pointer">{{ t('tasks') }}</label>
      </li>
    </ul>
  </div>
</template>

<style scoped>
::v-deep(.p-checkbox .checkbox-event.p-highlight) {
  @apply !bg-info-500;
  @apply !border-info-500
}

::v-deep(.p-checkbox:not(.p-checkbox-disabled) .checkbox-event.p-focus) {
  @apply !border-info-500
}

::v-deep(.p-checkbox .checkbox-task.p-highlight) {
  @apply !bg-success-500;
  @apply !border-success-500
}

::v-deep(.p-checkbox:not(.p-checkbox-disabled) .checkbox-task.p-focus) {
  @apply !border-success-500
}
</style>
