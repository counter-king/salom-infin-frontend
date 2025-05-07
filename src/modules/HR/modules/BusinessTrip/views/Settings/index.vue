import { useI18n } from 'vue-i18n';
<script setup>
// core
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
// components
import { ActionToolbar } from '@/components/Actions';
import { CheckCircleIcon, History2Icon, MapIcon } from '@/components/Icons';


const { t } = useI18n()
// reactives
const activeTab = ref(1)
const tabs = [
  {
    title: 'geographical-handbook',
    icon: MapIcon,
    link: 'GeographicalHandbook',
    value: 1
  },
  {
    title: 'business-trip-purpose',
    icon: CheckCircleIcon,
    link: 'TripPurpose',
    value: 2

  },
  {
    title: 'trip-history',
    icon: History2Icon,
    link: 'TripHistory',
  },
]

</script>

<template>
  <div class="settings-view">
    <action-toolbar
      title="settings"
    >
      <template #title-after>
      </template>
      <template #filters>
        <div></div>
      </template>
      <template #end>
      </template>
    </action-toolbar>
    <div class="flex w-full rounded-2xl shadow-button bg-white overflow-hidden mb-2">
      <div class="flex flex-col w-full">
          <!-- tabs-view -->
          <div class="flex gap-8 px-6 pt-5 border-b-2 border-greyscale-200 w-full">
            <div v-for="tab in tabs" :key="tab.link">
              <RouterLink :to="{name: tab.link}">
                <div 
                 class="flex flex-col gap-2 text-sm group text-greyscale-500 font-medium"
                 :class="{ 'text-greyscale-900': activeTab == tab.value }"
                 @click="activeTab = tab.value"
                 >
                  <div class="flex gap-2 items-center">
                    <base-iconify :icon="tab.icon" class="!w-5 !h-5"/>
                    <p>{{t(tab.title) }}</p>
                  </div>
                  <div 
                    class="h-[2px] w-full bg-primary-500 rounded-[8px] opacity-0 group-hover:opacity-100 relative bottom-[-2px]"
                    :class="{ 'opacity-100': activeTab == tab.value }"
                    >
                  </div>
                </div>
              </RouterLink>
            </div>

          </div>
          <div class="px-6">
            <router-view />
          </div>
      </div>
    </div>
  </div>
</template>