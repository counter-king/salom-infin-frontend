<script setup>
//core
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
//components
import { CalendarBoldIcon } from '@/components/Icons'

const { t } = useI18n()
const route = useRoute()
// reactives
const selectedTabView = ref(route.name == 'MyCalendar' ? 1 : 2)
// emits
const emit = defineEmits(['emit:onChange'])
// methods
const onChangeTabView = (view) => {
  selectedTabView.value = view
  emit('emit:onChange', view)
}


</script>
<template>
    <div class="flex items-cente border border-greyscale-200 rounded-full p-[2px]">
      <div
        @click="onChangeTabView(1)"
        class="flex items-center cursor-pointer gap-2 px-4 py-3 text-greyscale-500 font-medium text-xs rounded-full transition"
        :class="{'bg-white shadow text-greyscale-900': selectedTabView === 1}"
      >
        <base-iconify :icon="CalendarBoldIcon" class="!w-4 !h-4" :class="selectedTabView === 1? 'text-primary-500' : 'text-greyscale-500'"/>
        <span>{{ t('calendar') }}</span>
      </div>
      <div
        @click="onChangeTabView(2)"
        class="flex items-center cursor-pointer gap-2 px-4 py-3 rounded-full transition"
        :class="{'bg-white shadow': selectedTabView === 2 }"
      >
        <!-- <base-iconify :icon="CalendarBoldIcon" class="!w-4 !h-4" :class="selectedTabView === 'table' ? 'text-primary-500' : 'text-greyscale-500'" /> -->
        <div 
          class="text-greyscale-900"
          :class="{'text-primary-500': selectedTabView === 2}"
          >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 5C2 4.25231 2 3.87846 2.14186 3.6C2.23479 3.41758 2.36845 3.26609 2.52941 3.16077C2.77511 3 3.10498 3 3.76471 3H12.2353C12.895 3 13.2249 3 13.4706 3.16077C13.6315 3.26609 13.7652 3.41758 13.8581 3.6C14 3.87846 14 4.25231 14 5C14 5.74769 14 6.12154 13.8581 6.4C13.7652 6.58242 13.6315 6.73391 13.4706 6.83923C13.2249 7 12.895 7 12.2353 7H3.76471C3.10498 7 2.77511 7 2.52941 6.83923C2.36845 6.73391 2.23479 6.58242 2.14186 6.4C2 6.12154 2 5.74769 2 5Z" fill="currentColor"/>
          <path d="M2 11C2 10.2523 2 9.87846 2.14186 9.6C2.23479 9.41758 2.36845 9.26609 2.52941 9.16077C2.77511 9 3.10498 9 3.76471 9H12.2353C12.895 9 13.2249 9 13.4706 9.16077C13.6315 9.26609 13.7652 9.41758 13.8581 9.6C14 9.87846 14 10.2523 14 11C14 11.7477 14 12.1215 13.8581 12.4C13.7652 12.5824 13.6315 12.7339 13.4706 12.8392C13.2249 13 12.895 13 12.2353 13H3.76471C3.10498 13 2.77511 13 2.52941 12.8392C2.36845 12.7339 2.23479 12.5824 2.14186 12.4C2 12.1215 2 11.7477 2 11Z" fill="currentColor"/>
        </svg>
        </div>

        <span 
          class="text-greyscale-500 font-medium text-xs"
          :class="{'text-greyscale-900': selectedTabView === 2 }"
          >{{ t('table') }}</span>
      </div>
    </div>
  </template>
  <style scoped>
    .shadow {
      box-shadow: 0px 2px 4px 0px rgba(47, 61, 87, 0.03), 0px 1px 1px 0px rgba(95, 110, 169, 0.03);
    }
  </style>
  