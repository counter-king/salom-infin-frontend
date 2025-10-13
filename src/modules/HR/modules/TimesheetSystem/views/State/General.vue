<script setup>
// core
import { ref, inject, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDebounce } from '@vueuse/core';
// components
import BaseInput from '@/components/UI/BaseInput.vue';
import { MagniferIcon } from '@/components/Icons';
// components
import DataTable from '../../components/state/DataTable.vue';
// stores
import { useStateStore } from '@/modules/HR/modules/TimesheetSystem/stores/state.store';

// composibles
const { t } = useI18n()
const stateStore = useStateStore()
// reactives
const search = ref('')
// inject
const calendarDays = inject('calendarDays')
// composibles
const useDebounceSearch = useDebounce(search, 300)
const useDebounceCalendarDays = useDebounce(calendarDays, 300)

// methods
const getMatchDayStatusText = (day) => {
   console.log(day)
   switch (day) {
      case 8:
         return '8'
      case 'rest':
         return 'OT'
      case 'holiday':
         return 'H'
      case 'absent':
         return 'A'
      case 'late':
         return 'L'
      case 'leave':
         return 'L'
      case 'vacation':
         return 'V'
   }
}

// watch
watch(useDebounceSearch, (val) => {
   if(val){
      stateStore.actionGeneralList({ search: val })
   } else {
      stateStore.actionGeneralList()
   }
})

watch(useDebounceCalendarDays, () => {
   stateStore.resetGeneralHeaders()
   stateStore.generalHeaders = stateStore.generalHeaders.map((item) => {
    const day = calendarDays.value.find(day => day.day == item.field)
      if(day){
         item.value.top = day.dayName
      }
      return item
   })
   
   const findIndex = stateStore.generalHeaders.findIndex(item => item.field == calendarDays.value.at(-1).day)
   if(findIndex != -1){
      stateStore.generalHeaders.splice(findIndex + 1)
   }
   stateStore.actionGeneralList()
}, {
  immediate: true
})

</script>
<template>
    <div class="bg-white rounded-xl h-[calc(100vh-300px)]">
      <!-- top bar -->
      <div class="flex items-center justify-end p-3">
        <base-input
          v-model="search"
          :icon-left="MagniferIcon"
          :placeholder="t('search')"
          class="flex p-input-icon-left items-center w-[205px]"
          input-class="!pl-10 p-3 bg-white text-xs !rounded-[90px] placeholder:text-xs"
          icon-left-class="!w-4 !h-4"
        />
      </div>
      <!-- table -->
      <div>
        <DataTable 
          :value="stateStore.generalList"
          :headers="stateStore.generalHeaders"
          :actionList="stateStore.actionGeneralList"
          :loading="stateStore.generalLoading"
          :total-count="stateStore.generalTotalCount"
          scroll-height="calc(100vh - 300px)"
        >
         <template #header1="{data}">
            <div class="flex flex-col gap-[6px] items-center">
              <span>{{ data.value?.top }}</span>
              <span>{{ data.value?.bottom }}</span>
            </div>
         </template>
         <template #header2="{data}">
            <div class="flex flex-col gap-[6px] items-center">
              <span>{{ data.value?.top }}</span>
              <span>{{ data.value?.bottom }}</span>
            </div>
         </template>
         <template #header3="{data}">
            <div class="flex flex-col gap-[6px] items-center">
              <span>{{ data.value?.top }}</span>
              <span>{{ data.value?.bottom }}</span>
            </div>
         </template>
         <template #header4="{data}">
            <div class="flex flex-col gap-[6px] items-center">
              <span>{{ data.value?.top }}</span>
              <span>{{ data.value?.bottom }}</span>
            </div>
         </template>
         <template #header5="{data}">
            <div class="flex flex-col gap-[6px] items-center">
              <span>{{ data.value?.top }}</span>
              <span>{{ data.value?.bottom }}</span>
            </div>
         </template>
         <template #header6="{data}">
            <div class="flex flex-col gap-[6px] items-center">
              <span>{{ data.value?.top }}</span>
              <span>{{ data.value?.bottom }}</span>
            </div>
         </template>
         <template #header7="{data}">
            <div class="flex flex-col gap-[6px] items-center">
              <span>{{ data.value?.top }}</span>
              <span>{{ data.value?.bottom }}</span>
            </div>
         </template>
         <template #header8="{data}">
            <div class="flex flex-col gap-[6px] items-center">
              <span>{{ data.value?.top }}</span>
              <span>{{ data.value?.bottom }}</span>
            </div>
         </template>
         <template #header9="{data}">
            <div class="flex flex-col gap-[6px] items-center">
              <span>{{ data.value?.top }}</span>
              <span>{{ data.value?.bottom }}</span>
            </div>
         </template>
         <template #header10="{data}">
            <div class="flex flex-col gap-[6px] items-center">
              <span>{{ data.value?.top }}</span>
              <span>{{ data.value?.bottom }}</span>
            </div>
         </template>
         <template #header11="{data}">
            <div class="flex flex-col gap-[6px] items-center">
              <span>{{ data.value?.top }}</span>
              <span>{{ data.value?.bottom }}</span>
            </div>
         </template>
         <template #header12="{data}">
            <div class="flex flex-col gap-[6px] items-center">
              <span>{{ data.value?.top }}</span>
              <span>{{ data.value?.bottom }}</span>
            </div>
         </template>
         <template #header13="{data}">
            <div class="flex flex-col gap-[6px] items-center">
              <span>{{ data.value?.top }}</span>
              <span>{{ data.value?.bottom }}</span>
            </div>
         </template>
         <template #header14="{data}">
            <div class="flex flex-col gap-[6px] items-center">
              <span>{{ data.value?.top }}</span>
              <span>{{ data.value?.bottom }}</span>
            </div>
         </template>
         <template #header15="{data}">
            <div class="flex flex-col gap-[6px] items-center">
              <span>{{ data.value?.top }}</span>
              <span>{{ data.value?.bottom }}</span>
            </div>
         </template>
         <template #header16="{data}">
            <div class="flex flex-col gap-[6px] items-center">
              <span>{{ data.value?.top }}</span>
              <span>{{ data.value?.bottom }}</span>
            </div>
         </template>
         <template #header17="{data}">
            <div class="flex flex-col gap-[6px] items-center">
              <span>{{ data.value?.top }}</span>
              <span>{{ data.value?.bottom }}</span>
            </div>
         </template>
         <template #header18="{data}">
            <div class="flex flex-col gap-[6px] items-center">
              <span>{{ data.value?.top }}</span>
              <span>{{ data.value?.bottom }}</span>
            </div>
         </template>
         <template #header19="{data}">
            <div class="flex flex-col gap-[6px] items-center">
              <span>{{ data.value?.top }}</span>
              <span>{{ data.value?.bottom }}</span>
            </div>
         </template>
         <template #header20 ="{data}">
            <div class="flex flex-col gap-[6px] items-center">
              <span>{{ data.value?.top }}</span>
              <span>{{ data.value?.bottom }}</span>
            </div>
         </template>
         <template #header21="{data}">
            <div class="flex flex-col gap-[6px] items-center">
              <span>{{ data.value?.top }}</span>
              <span>{{ data.value?.bottom }}</span>
            </div>
         </template>
         <template #header22="{data}">
            <div class="flex flex-col gap-[6px] items-center">
              <span>{{ data.value?.top }}</span>
              <span>{{ data.value?.bottom }}</span>
            </div>
         </template>
         <template #header23="{data}">
            <div class="flex flex-col gap-[6px] items-center">
              <span>{{ data.value?.top }}</span>
              <span>{{ data.value?.bottom }}</span>
            </div>
         </template>
         <template #header24="{data}">
            <div class="flex flex-col gap-[6px] items-center">
              <span>{{ data.value?.top }}</span>
              <span>{{ data.value?.bottom }}</span>
            </div>
         </template>
         <template #header25="{data}">
            <div class="flex flex-col gap-[6px] items-center">
              <span>{{ data.value?.top }}</span>
              <span>{{ data.value?.bottom }}</span>
            </div>
         </template>
         <template #header26="{data}">
            <div class="flex flex-col gap-[6px] items-center">
              <span>{{ data.value?.top }}</span>
              <span>{{ data.value?.bottom }}</span>
            </div>
         </template>
         <template #header27="{data}">
            <div class="flex flex-col gap-[6px] items-center">
              <span>{{ data.value?.top }}</span>
              <span>{{ data.value?.bottom }}</span>
            </div>
         </template>
         <template #header28="{data}">
            <div class="flex flex-col gap-[6px] items-center">
              <span>{{ data.value?.top }}</span>
              <span>{{ data.value?.bottom }}</span>
            </div>
         </template>
         <template #header29="{data}">
            <div class="flex flex-col gap-[6px] items-center">
              <span>{{ data.value?.top }}</span>
              <span>{{ data.value?.bottom }}</span>
            </div>
         </template>
         <template #header30="{data}">
            <div class="flex flex-col gap-[6px] items-center">
              <span>{{ data.value?.top }}</span>
              <span>{{ data.value?.bottom }}</span>
            </div>
         </template>
         <template #header31="{data}">
            <div class="flex flex-col gap-[6px] items-center">
              <span>{{ data.value?.top }}</span>
              <span>{{ data.value?.bottom }}</span>
            </div>
         </template>
         <!--  body -->
         <template #1="{data, field}">
              <span class="flex justify-center items-center">{{ getMatchDayStatusText(data[field]) }}</span>
         </template>
         <template #2="{data, field}">
              <span class="flex justify-center items-center">{{ getMatchDayStatusText(data[field]) }}</span>
         </template>
         <template #3="{data, field}">
              <span class="flex justify-center items-center">{{ getMatchDayStatusText(data[field]) }}</span>
         </template>
         <template #4="{data, field}">
              <span class="flex justify-center items-center">{{ getMatchDayStatusText(data[field]) }}</span>
         </template>
         <template #5="{data, field}">
              <span class="flex justify-center items-center">{{ getMatchDayStatusText(data[field]) }}</span>
         </template>
         <template #6="{data, field}">
              <span class="flex justify-center items-center">{{ getMatchDayStatusText(data[field]) }}</span>
         </template>
         <template #7="{data, field}">
              <span class="flex justify-center items-center">{{ getMatchDayStatusText(data[field]) }}</span>
         </template>
         <template #8="{data, field}">
              <span class="flex justify-center items-center">{{ getMatchDayStatusText(data[field]) }}</span>
         </template>
         <template #9="{data, field}">
              <span class="flex justify-center items-center">{{ getMatchDayStatusText(data[field]) }}</span>
         </template>
         <template #10="{data, field}">
              <span class="flex justify-center items-center">{{ getMatchDayStatusText(data[field]) }}</span>
         </template>
         <template #11="{data, field}">
              <span class="flex justify-center items-center">{{ getMatchDayStatusText(data[field]) }}</span>
         </template>
         <template #12="{data, field}">
              <span class="flex justify-center items-center">{{ getMatchDayStatusText(data[field]) }}</span>
         </template>
         <template #13="{data, field}">
              <span class="flex justify-center items-center">{{ getMatchDayStatusText(data[field]) }}</span>
         </template>
         <template #14="{data, field}">
              <span class="flex justify-center items-center">{{ getMatchDayStatusText(data[field]) }}</span>
         </template>
         <template #15="{data, field}">
              <span class="flex justify-center items-center">{{ getMatchDayStatusText(data[field]) }}</span>
         </template>
         <template #16="{data, field}">
              <span class="flex justify-center items-center">{{ getMatchDayStatusText(data[field]) }}</span>
         </template>
         <template #17="{data, field}">
              <span class="flex justify-center items-center">{{ getMatchDayStatusText(data[field]) }}</span>
         </template>
         <template #18="{data, field}">
              <span class="flex justify-center items-center">{{ getMatchDayStatusText(data[field]) }}</span>
         </template>
         <template #19="{data, field}">
              <span class="flex justify-center items-center">{{ getMatchDayStatusText(data[field]) }}</span>
         </template>
         <template #20="{data, field}">
              <span class="flex justify-center items-center">{{ getMatchDayStatusText(data[field]) }}</span>
         </template>
         <template #21="{data, field}">
              <span class="flex justify-center items-center">{{ getMatchDayStatusText(data[field]) }}</span>
         </template>
         <template #22="{data, field}">
              <span class="flex justify-center items-center">{{ getMatchDayStatusText(data[field]) }}</span>
         </template>
         <template #23="{data, field}">
              <span class="flex justify-center items-center">{{ getMatchDayStatusText(data[field]) }}</span>
         </template>
         <template #24="{data, field}">
              <span class="flex justify-center items-center">{{ getMatchDayStatusText(data[field]) }}</span>
         </template>
         <template #25="{data, field}">
              <span class="flex justify-center items-center">{{ getMatchDayStatusText(data[field]) }}</span>
         </template>
         <template #26="{data, field}">
              <span class="flex justify-center items-center">{{ getMatchDayStatusText(data[field]) }}</span>
         </template>
         <template #27="{data, field}">
              <span class="flex justify-center items-center">{{ getMatchDayStatusText(data[field]) }}</span>
         </template>
         <template #28="{data, field}">
              <span class="flex justify-center items-center">{{ getMatchDayStatusText(data[field]) }}</span>
         </template>
         <template #29="{data, field}">
              <span class="flex justify-center items-center">{{ getMatchDayStatusText(data[field]) }}</span>
         </template>
         <template #30="{data, field}">
              <span class="flex justify-center items-center">{{ getMatchDayStatusText(data[field]) }}</span>
         </template>
         <template #31="{data, field}">
              <span class="flex justify-center items-center">{{ getMatchDayStatusText(data[field]) }}</span>
         </template>
        </DataTable>  
      </div>
    </div>
</template>
