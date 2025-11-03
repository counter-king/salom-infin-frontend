<script setup>
// core
import { computed, onMounted, nextTick, watch, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
// components
import { PaperclipLinearIcon, ClipboardCheckBoldIcon, AltArrowLeftIcon, AltArrowRightIcon, FileTextBoldIcon, CloseCircleBoldIcon, DocumentAddBoldIcon, CheckCircleBoldIcon, StopWatchBoldIcon } from '@/components/Icons';
import AttendanceProccessStatus from '../AttendanceProccessStatus.vue';
import AttachementFile from './AttachementFile.vue';
// constants
import { ROUTE_SD_CREATE } from '@/modules/Documents/modules/SendDocuments/constants';
// enums
import { COMPOSE_DOCUMENT_SUB_TYPES, COMPOSE_DOCUMENT_TYPES } from '@/enums';
import { REASON_PROCESS_STATUS, USER_TYPE } from '../../enums';
// utils
import { formatTimeDate } from '@/utils/formatDate';
// stores
import { useBlobFileStore } from '@/stores/file.store';
import { useAuthStore } from '@/modules/Auth/stores';
// composables
const { t } = useI18n()
const router = useRouter()
const blobFileStore = useBlobFileStore()
const authStore = useAuthStore()
// props
const props = defineProps({
  item: {
    type: Object,
    required: true
  },

})

const emit = defineEmits(['show-note'])

const showNote = () => {
  emit('show-note', props.item.note)
}

const userType = computed(() => {
 switch(props.item.type) {
  case USER_TYPE.EMPLOYEE:
    return t('employee')
  case USER_TYPE.MANAGER:
    return t('head-of-the-structural-unit')
  case USER_TYPE.HR:
    return t('hr')
 }
})

const getMatchStatusIcon = computed(() => {

  if(props.item.type === USER_TYPE.EMPLOYEE && props.item.reason_status === REASON_PROCESS_STATUS.WAITING){
    return DocumentAddBoldIcon
  }
  else if( props.item.reason_status === REASON_PROCESS_STATUS.WAITING){
    return CheckCircleBoldIcon
  }
  else if(props.item.reason_status === REASON_PROCESS_STATUS.CONFIRMED){
    return StopWatchBoldIcon
  }
  else if(props.item.reason_status === REASON_PROCESS_STATUS.LETTER_WRITTEN){
    return FileTextBoldIcon
  }
  else if(props.item.reason_status === REASON_PROCESS_STATUS.REASON_ENTERED){
    return ClipboardCheckBoldIcon
  }
  else if(props.item.reason_status === REASON_PROCESS_STATUS.ENTERED_TO_TIMESHEET){
    return CheckCircleBoldIcon
  }
  else if(props.item.reason_status === REASON_PROCESS_STATUS.REJECTED){
    return CloseCircleBoldIcon
  }
  
  // switch(props.item.reason_status) {
  //   case REASON_PROCESS_STATUS.REASON_ENTERED:
  //     return ClipboardCheckBoldIcon
  //   case REASON_PROCESS_STATUS.LETTER_WRITTEN:
  //   case REASON_PROCESS_STATUS.WAITING:
  //     return DocumentTextBoldIcon
  //   case REASON_PROCESS_STATUS.CONFIRMED:
  //     return StopWatchBoldIcon
  //   case REASON_PROCESS_STATUS.REJECTED:
  //     return CloseCircleBoldIcon
  //   case REASON_PROCESS_STATUS.WAITING:
  //     return CheckCircleBoldIcon
  //   default:
  //     return StopWatchBoldIcon
  // }
})

const getMatchStatusIconClass = computed(() => {
  switch(props.item.reason_status) {
    case REASON_PROCESS_STATUS.WAITING:
      return 'bg-greyscale-400 text-white'
    case REASON_PROCESS_STATUS.REASON_ENTERED:
    case REASON_PROCESS_STATUS.ENTERED_TO_TIMESHEET:
      return 'bg-success-500 text-white'
    case REASON_PROCESS_STATUS.REJECTED:
      return 'bg-critic-500 text-white'
    case REASON_PROCESS_STATUS.CONFIRMED:
      return 'bg-info-500 text-white'
    case REASON_PROCESS_STATUS.LETTER_WRITTEN:
      return 'bg-warning-500 text-white'
    default:
      return ''
  }
})

const onClickWriteExplanationLetter = () => {
  router.push({
    name: ROUTE_SD_CREATE,
    params: {
      document_type: COMPOSE_DOCUMENT_TYPES.APPLICATION,
      document_sub_type: COMPOSE_DOCUMENT_SUB_TYPES.EXPLANATION_LETTER
    },
    query: {
      attendanceId: props.item?.attendanceId,
      kind: props.item?.kind,
      date: props.item?.date,
      exceptionId: props.item?.exceptionId
    }
  })
}


// User type va status ga qarab qaysi UI elementni ko'rsatish
// const shouldShowEnterReason = computed(() => 
//   props.item.type === USER_TYPE.EMPLOYEE && 
//   props.item.reason_status === REASON_PROCESS_STATUS.WAITING &&
//   !props.item.reason
// )

const shouldShowReasonEnteredWithAttachments = computed(() => 
  props.item.type === USER_TYPE.EMPLOYEE && 
  props.item.reason_status === REASON_PROCESS_STATUS.REASON_ENTERED
)

const shouldShowWriteExplanationLetter = computed(() => 
  props.item.type === USER_TYPE.EMPLOYEE && 
  props.item.reason_status === REASON_PROCESS_STATUS.WAITING &&
  props.item.application_write === false
)

const shouldShowExplanationLetterWritten = computed(() => 
  props.item.type === USER_TYPE.EMPLOYEE && 
  props.item.reason_status === REASON_PROCESS_STATUS.LETTER_WRITTEN &&
  props.item.application_write === true
)

const shouldShowManagerRejected = computed(() => 
  props.item.type === USER_TYPE.MANAGER && 
  props.item.reason_status === REASON_PROCESS_STATUS.REJECTED
)

const shouldShowHRRejected = computed(() => 
  props.item.type === USER_TYPE.HR && 
  props.item.reason_status === REASON_PROCESS_STATUS.REJECTED
)

const shouldShowHREntered = computed(() => 
  props.item.type === USER_TYPE.HR && 
  props.item.reason_status === REASON_PROCESS_STATUS.ENTERED_TO_TIMESHEET
)



</script>
<template>
  <div  class="flex items-start gap-4">
    <!-- process time line  -->
    <div class="flex flex-col items-center self-stretch">
      <!-- icon wrapper -->
      <div 
        class="min-w-8 min-h-8 w-8 h-8 rounded-full flex items-center justify-center"
        :class="getMatchStatusIconClass"
        >
        <base-iconify :icon="getMatchStatusIcon" class="!w-5 !h-5 text-white" />
      </div>
      <div class="w-[2px] flex-1 bg-greyscale-200"></div>
      <!-- process line -->
    </div>
    <!-- user info card -->
    <div 
      class="shadow rounded-[12px] bg-white w-full"
      :class="{'border border-critic-100': item.user?.id == authStore.currentUser?.id && item.reason_status == REASON_PROCESS_STATUS.WAITING}"
    >
      <!-- header -->
      <div class="px-3 py-2 text-[11px] font-semibold text-info-500 border-b border-greyscale-70">
        <span>{{ userType || '' }}</span>
      </div>
      <!-- body -->
      <div class="px-3 py-2 flex gap-1 justify-between items-center border-b border-greyscale-70 border-dashed">
        <!-- left -->
        <div class="flex gap-3 items-center">
          <base-avatar
            :label="props.item?.user?.full_name?.charAt(0) || ''"
            :color="props.item?.user?.color || 'c'"
            shape="circle"
            avatar-classes="w-8 h-8"
            :image="props.item?.user?.avatar?.url"
          />
          <div class="flex flex-col gap-1">
            <span class="text-[13px] text-greyscale-900 font-semibold">{{ props.item?.user?.full_name || '' }}</span>
            <span class="text-xs text-greyscale-400 font-medium">{{ formatTimeDate(props.item?.action_time) }}</span>
          </div>
        </div>
        <!-- right -->
        <div>
          <AttendanceProccessStatus :status="props.item.reason_status" />
        </div>
      </div>
      <!-- process status -->
       <div class="px-3 py-2">
          <!-- employee enter reason  -->
          <!-- <div v-if="false" class="w-fit flex gap-1 cursor-pointer px-[6px] py-1 text-xs text-primary-500 font-medium rounded-[6px] bg-greyscale-50">
            <span>{{ t('enter-reason') }}</span>
            <base-iconify :icon="AltArrowRightIcon" class="!w-4 !h-4" />
          </div> -->
           <!-- employee endered reason and attached file -->
          <div v-if="shouldShowReasonEnteredWithAttachments" class="flex items-center gap-1">
            <!-- reason -->
            <div  class="w-fit px-[6px] py-1 text-xs text-greyscale-500 font-medium rounded-[6px] bg-greyscale-50">
              {{ props.item.reason.name }}
            </div>
            <!-- attached file -->
            <AttachementFile v-if="props.item?.attachments?.length > 0" :list="props.item.attachments" />
            <!-- note -->
            <div v-if="!!props.item?.note" @click="showNote" class="w-fit flex gap-1 items-center px-[6px] py-1 text-xs text-greyscale-900 font-medium rounded-[6px] bg-greyscale-50">
              <div  class="cursor-pointer text-primary-500 max-w-[100px] truncate">{{ props.item.note }}</div>
              <base-iconify :icon="AltArrowRightIcon" class="!w-4 !h-4 text-primary-500" />
            </div>
          </div>
          <!-- employee are wating and will write explanation letter -->
          <div v-if="shouldShowWriteExplanationLetter" @click="onClickWriteExplanationLetter" class="w-fit flex gap-1 cursor-pointer px-[6px] py-1 text-xs text-primary-500 font-medium rounded-[6px] bg-greyscale-50">
            <span>{{ t('write-explanation-letter') }}</span>
            <base-iconify :icon="AltArrowRightIcon" class="!w-4 !h-4" />
          </div>
          <!-- employee writed explanation letter -->
          <div v-if="shouldShowExplanationLetterWritten" class="w-fit flex gap-[6px] cursor-pointer px-[6px] py-1 text-xs text-primary-500 font-medium rounded-[6px] bg-greyscale-50">
            <base-iconify :icon="FileTextBoldIcon" class="!w-4 !h-4" />
            <span class="text-greyscale-800">{{ t('explanation-letter') }}</span>
            <base-iconify :icon="AltArrowRightIcon" class="!w-4 !h-4" />
          </div>
          <!-- director waiting   --> <!-- no ui -->
          <!-- director accepted   --> <!-- no ui --> 
          <!-- director declined   -->
          <div v-if="shouldShowManagerRejected"  class="w-fit px-[6px] py-1 text-xs text-greyscale-500 font-medium rounded-[6px] bg-greyscale-50">
            {{ props.item.decision_note }}
          </div>
          <!-- hr accepted   --> <!-- no ui --> 
          <!-- hr declined   --> <!-- no ui -->
          <div v-if="shouldShowHRRejected"  class="w-fit px-[6px] py-1 text-xs text-greyscale-500 font-medium rounded-[6px] bg-greyscale-50">
            {{ props.item.decision_note }}
          </div>
          <!-- hr entered to timesheet -->
           <div v-if="shouldShowHREntered"  class="w-fit px-[6px] py-1 text-xs text-greyscale-500 font-medium rounded-[6px] bg-greyscale-50">
            <span>{{ t('entered-time') }}: </span>
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