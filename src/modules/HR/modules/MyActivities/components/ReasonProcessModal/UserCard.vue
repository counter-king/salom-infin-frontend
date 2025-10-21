<script setup>
// core
import { useI18n } from 'vue-i18n';
import { PaperclipLinearIcon, ClipboardCheckBoldIcon, AltArrowLeftIcon, AltArrowRightIcon, FileTextBoldIcon, CloseCircleBoldIcon, DocumentTextBoldIcon, CheckCircleBoldIcon, StopWatchBoldIcon } from '@/components/Icons';
import AttendanceProccessStatus from '../AttendanceProccessStatus.vue';
// components
const { t } = useI18n()
// props
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const getMatchStatusIcon = () => {
  switch('success') {
    case 'no-enter-reason':
      return ClipboardCheckBoldIcon
    case 'success':
    return ClipboardCheckBoldIcon
    case 'warning':
      return CloseCircleBoldIcon
    case 'document':
      return DocumentTextBoldIcon
    case 'check':
      return CheckCircleBoldIcon
    case 'stopwatch':
      return StopWatchBoldIcon
    default:
      return null
  }
}

const getMatchStatusIconClass = () => {
  switch('success') {
    case 'no-enter-reason' :
    case 'director-waiting' :
    case 'employee-waiting' :
    case 'hr-waiting' :
      return 'bg-greyscale-400 text-white'
    case 'hr-waiting' :
    return 'bg-greyscale-400 text-white'
    case 'success':
      return 'bg-success-500 text-white'
    case 'warning':
      return 'bg-critic-500 text-white'
    case 'document':
      return 'bg-greyscale-400 text-white'
    case 'check':
      return 'bg-greyscale-400 text-white'
    default:
      return null
  }
}

const getMatchCardClass = () => {
  switch('success') {
    case 'no-enter-reason':
      return 'bg-greyscale-400 text-white'
    case 'warning':
      return 'bg-critic-500 text-white'
    default:
      return null
  }
}
</script>
<template>
  <div class="flex items-start gap-4">
    <!-- process time line  -->
    <div class="flex flex-col items-center self-stretch">
      <!-- icon wrapper -->
      <div 
        class="min-w-8 min-h-8 w-8 h-8 rounded-full flex items-center justify-center  bg-success-500"
        :class="getMatchStatusIconClass()"
        >
        <base-iconify :icon="getMatchStatusIcon()" class="!w-5 !h-5 text-white" />
      </div>
      <div class="w-[2px] flex-1 bg-greyscale-200"></div>
      <!-- process line -->
    </div>
    <!-- user info card -->
    <div 
      class="shadow rounded-[12px] bg-white w-full"
      :class="{'border border-critic-100': true}"
    >
      <!-- header -->
      <div class="px-3 py-2 text-[11px] font-semibold text-info-500 border-b border-greyscale-70">
        <span>{{ t('employee') }}</span>
      </div>
      <!-- body -->
      <div class="px-3 py-2 flex gap-1 justify-between items-center border-b border-greyscale-70 border-dashed">
        <!-- left -->
        <div class="flex gap-3 items-center">
          <base-avatar
            :label="'a'"
            :color="'c'"
            shape="circle"
            avatar-classes="w-8 h-8"
          />
          <div class="flex flex-col gap-1">
            <span class="text-[13px] text-greyscale-900 font-semibold">Maxmudov Botir Orifjon o’g’li</span>
            <span class="text-xs text-greyscale-400 font-medium">12:34, 23.09.25</span>
          </div>
        </div>
        <!-- right -->
        <div>
          <AttendanceProccessStatus/>
        </div>
      </div>
      <!-- footer -->
       <div class="px-3 py-2">
          <!-- employee ender reason  -->
          <div v-if="true" class="w-fit flex gap-1 cursor-pointer px-[6px] py-1 text-xs text-primary-500 font-medium rounded-[6px] bg-greyscale-50">
            <span>Sabab kiritish</span>
            <base-iconify :icon="AltArrowRightIcon" class="!w-4 !h-4" />
          </div>
           <!-- employee endered reason and attached file -->
          <div v-if="false" class="flex items-center gap-1">
            <div  class="w-fit px-[6px] py-1 text-xs text-greyscale-500 font-medium rounded-[6px] bg-greyscale-50">
              Oilaviy sabablar tufayli
            </div>
            <div class="w-fit flex gap-1 items-center px-[6px] py-1 text-xs text-greyscale-500 font-medium rounded-[6px] bg-greyscale-50">
              <base-iconify :icon="PaperclipLinearIcon" class="!w-4 !h-4 text-primary-500" />
              <span class="cursor-pointer text-primary-500">Kasallik varaqasi.pdf</span>
            </div>
          </div>
          <!-- employee are wating and will write explanation letter -->
          <div v-if="false" class="w-fit flex gap-1 cursor-pointer px-[6px] py-1 text-xs text-primary-500 font-medium rounded-[6px] bg-greyscale-50">
            <span>Tushuntirish xati yozish</span>
            <base-iconify :icon="AltArrowRightIcon" class="!w-4 !h-4" />
          </div>
          <!-- employee writed explanation letter -->
          <div v-if="false" class="w-fit flex gap-[6px] cursor-pointer px-[6px] py-1 text-xs text-primary-500 font-medium rounded-[6px] bg-greyscale-50">
            <base-iconify :icon="FileTextBoldIcon" class="!w-4 !h-4" />
            <span class="text-greyscale-800">Tushuntirish xati</span>
            <base-iconify :icon="AltArrowRightIcon" class="!w-4 !h-4" />
          </div>
          <!-- director waiting   --> <!-- no ui -->
          <!-- director accepted   --> <!-- no ui --> 
          <!-- director declined   -->
          <div v-if="false"  class="w-fit px-[6px] py-1 text-xs text-greyscale-500 font-medium rounded-[6px] bg-greyscale-50">
            Rahbardan ruxsat olinmagan
          </div>
           <!-- hr waiting   --> <!-- no ui -->
           <!-- hr accepted  -->
           <div v-if="false"  class="w-fit px-[6px] py-1 text-xs text-greyscale-500 font-medium rounded-[6px] bg-greyscale-50">
            <span>Kiritilgan vaqt: </span>
            <span class="text-greyscale-800">6 soat</span>
           </div>
       </div>
    </div>
  </div>
</template>
<style scoped>
.shadow {
  box-shadow: 0 2px 4px 0 rgba(47, 61, 87, 0.03), 0 1px 1px 0 rgba(95, 110, 169, 0.03)
}
</style>