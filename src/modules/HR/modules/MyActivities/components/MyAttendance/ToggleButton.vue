<script setup>
//core
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
//components
import { CalendarBoldIcon } from '@/components/Icons'

const { t } = useI18n()
// reactives
const selectedTabView = ref('calendar')
// emits
const emit = defineEmits(['update:selectedTabView'])
// methods
const onChangeTabView = (view) => {
  selectedTabView.value = view
  emit('update:selectedTabView', view)
}

</script>
<template>
    <div class="flex items-cente border border-greyscale-200 rounded-full p-[2px]">
      <div
        @click="onChangeTabView('calendar')"
        class="flex items-center cursor-pointer gap-2 px-4 py-3 text-greyscale-500 font-medium text-xs rounded-full transition"
        :class="{'bg-white shadow text-greyscale-900': selectedTabView === 'calendar'}"
      >
        <base-iconify :icon="CalendarBoldIcon" class="!w-4 !h-4" :class="selectedTabView === 'calendar' ? 'text-primary-500' : 'text-greyscale-500'"/>
        <span>{{ t('calendar') }}</span>
      </div>
      <div
        @click="onChangeTabView('table')"
        class="flex items-center cursor-pointer gap-2 px-4 py-3 text-greyscale-500 font-medium text-xs rounded-full transition"
        :class="{'bg-white shadow text-greyscale-900': selectedTabView === 'table'}"
      >
        <base-iconify :icon="CalendarBoldIcon" class="!w-4 !h-4" :class="selectedTabView === 'table' ? 'text-primary-500' : 'text-greyscale-500'" />
        <span>{{ t('table') }}</span>
      </div>
    </div>
  </template>
  <style scoped>
    .shadow {
      box-shadow: 0px 2px 4px 0px rgba(47, 61, 87, 0.03), 0px 1px 1px 0px rgba(95, 110, 169, 0.03);
    }
  </style>
  