<script setup>
// core
import { ref, useModel, onMounted, computed  } from 'vue';
import { useI18n } from 'vue-i18n';
import dayjs from 'dayjs';
// components
import BaseDialog from '@/components/UI/BaseDialog.vue';
import RejectReasonModal from './RejectReasonModal.vue';
import ModalBodyContent from "@/modules/HR/modules/MyActivities/components/ReasonProcessModal/ModalBodyContent.vue";
import NoteModal from "@/modules/HR/modules/MyActivities/components/ReasonProcessModal/NoteModal.vue";
import ModalBodyHeader from "@/modules/HR/modules/MyActivities/components/ReasonProcessModal/ModalBodyHeader.vue";

// store
import { useAttendanceExpectionsStore } from '@/modules/HR/modules/MyActivities/store/attendanceExceptions.store';
import { useAttendanceWithReasonStore } from '../../stores/attendanceWithReason.store';
// utils
import { dispatchNotify } from '@/utils/notify';

// composable
const { t, locale } = useI18n()
const attendanceExpectionsStore = useAttendanceExpectionsStore()
const attendanceWithReasonStore = useAttendanceWithReasonStore()

// props  
const props = defineProps({
  modelValue: {
      type: Boolean,
      default: false
  },
  data: {
    type: Object,
  }
})

// reactives
const noteModalVisible = ref(false)
const note = ref('')
const rejectReasonModalVisible = ref(false)

// emits
const emit = defineEmits(['update:modelValue'])
const modelValue = useModel(props, 'modelValue')

const label = computed(() => dayjs(props.data?.date).format(locale.value === 'ru' ? 'D-MMMM, YYYY [г.]' : 'D-MMMM, YYYY [y.]'))

const onClickReject = () => {
  rejectReasonModalVisible.value = true

}

const afterSubmitTriggerFun = () => {
  modelValue.value = false
  attendanceWithReasonStore.getAttendanceExceptionsWithReasonList()

}

const onClickApprove = () => {
  try {
    attendanceExpectionsStore.createAttendanceExceptionsApproveById(props.data?.attendance?.id)
    dispatchNotify(null, t('successfully-send'), COLOR_TYPES.SUCCESS)
  } catch (error) {
  }
}

onMounted(() => {
  if(props.data?.attendance?.id){
    attendanceExpectionsStore.getAttendanceExceptionsList({
      attendance: props.data?.attendance?.id,
    })
  }
})

</script>
<template>
  <div class="modal">
    <base-dialog
      v-model="modelValue"
      :label="label"
      max-width="reason-process-modal max-w-[648px] h-full"
      contentClasses="py-5 px-6 pb-10 flex flex-col !rounded-none"
      header-classes="!rounded-none"
      position="topright"
    >
      <template #content>
        <template v-if="attendanceExpectionsStore.attendanceExpectionsListLoading">
          <div class="flex items-center justify-center h-full">
            <base-spinner />
          </div>
        </template>
        <template v-else>
          <div class="flex flex-col gap-4">
          <!-- body header -->  
            <ModalBodyHeader :attendance="props.data?.attendance" />
          </div>
          <!-- body content -->
          <template v-if="!!attendanceExpectionsStore.attendanceExpectionsList.length">
              <ModalBodyContent :data="attendanceExpectionsStore.attendanceExpectionsList[0]" />
          </template>
        </template>
      </template>
      <template #footer>
        <div class="flex items-center justify-end gap-2">
          <base-button
            label="reject"
            rounded
            outlined
            shadow
            color="!text-critic-500"
            border-color="border-transparent"
            class="!px-8 !py-[14px] !text-sm"
            @click="onClickReject"
          />
          <base-button
            label="approve"
            rounded
            shadow
            type="button"
            @click="onClickApprove"
            class="!px-8 !py-[14px] !text-sm"
          />
        </div>
      </template>
    </base-dialog>
  </div>
  <NoteModal 
    v-model="noteModalVisible" 
    :note="note" 
  />
  <RejectReasonModal 
    v-model="rejectReasonModalVisible"
    :afterSubmitTriggerFun="afterSubmitTriggerFun"
  />
</template>
<style scoped>
 
:global(.reason-process-modal.p-dialog){
  margin:0;
  min-height: 100%;
}

:global(.reason-process-modal .p-dialog-content){
  height: 100%;
}

:global(.reason-process-modal .dialog-content){
  display: flex;
  flex-direction: column;
  height: 100%;
}

</style>

