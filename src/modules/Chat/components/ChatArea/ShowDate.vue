<script setup>
// cores
import { ref } from 'vue';
// utils
import { formatDate } from '@/utils/formatDate';
import BaseDialog from '@/components/UI/BaseDialog.vue';

// props
const props = defineProps({
 date: {
  type: String
 },
 classNames: {
  type: [String , Array, Object] 
}
})

// reactives
const showDialog = ref(false)
// methods
const handleDateClick = () => {
 showDialog.value = true
}

const handleClickCalendar = (date) => {
 console.log("date",date);
 showDialog.value = false
}

</script>

<template>
  <div class="flex gap-3 w-full justify-center items-center select-none" :class="classNames">
    <div class="w-[72px] bg-greyscale-200 h-[1px]"></div>
     <div 
      class="py-1 px-3 bg-white rounded-[90px] text-xs font-medium text-greyscale-500 cursor-pointer"
      @click="handleDateClick"
      >
       {{ formatDate(date) }}
     </div>
    <div class="w-[72px] bg-greyscale-200 h-[1px]"></div>
  </div>
  <base-dialog
   :dismissable-mask="true"
   v-model="showDialog"
   max-width="max-w-[354px]" 
   header-classes="hidden"
   footer-classes="hidden"
   content-classes="rounded-3xl p-3"
  >
    <template #header></template>
    <template #content>
     <BaseCalendar  
       inline
       view="date" 
       :max-date="new Date()"
       date-format="dd-mm-yyyy" 
       @update:modelValue="handleClickCalendar"
       />
    </template>
    <template #footer></template>
  </base-dialog>
</template>