<script setup>
// core
import { ref, useModel, onMounted, computed  } from 'vue';
import { useI18n } from 'vue-i18n';
import dayjs from 'dayjs';
// components
import BaseDialog from '@/components/UI/BaseDialog.vue';
import ModalBodyHeader from './ModalBodyHeader.vue';
import InfoCardStatus from './InfoCardStatus.vue';
import UserCard from './UserCard.vue';
import ExplanationReasonStatus from '../ExplanationReasonStatus.vue';
// store
import { useAttendanceExpectionsStore } from '../../store/attendanceExceptions.store';
import NoteModal from './noteModal.vue';
// composable
const { t, locale } = useI18n()
const attendanceExpectionsStore = useAttendanceExpectionsStore()
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

// reactive
const noteModalVisible = ref(false)
const note = ref('')
// emits
const emit = defineEmits(['update:modelValue'])
const modelValue = useModel(props, 'modelValue')

const label = computed(() => dayjs(props.data?.date).format(locale.value === 'ru' ? 'D-MMMM, YYYY [г.]' : 'D-MMMM, YYYY [y.]'))

const showNote = (value) => {
  note.value = value
  noteModalVisible.value = true
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
            <ModalBodyHeader :data="props.data" />
          </div>
          <!-- body content -->
          <div class="flex flex-col gap-5 mt-4">
            <InfoCardStatus :data="!!attendanceExpectionsStore.attendanceExpectionsList.length && attendanceExpectionsStore.attendanceExpectionsList[0]" />
          </div>
          <template v-if="true">
            <!-- reason for explanation -->
            <div class="mt-3">
              <div class="flex items-center gap-2">
                <span class="text-sm font-semibold text-greyscale-900">{{ t('reason-for-explanation') }}:</span>
                <ExplanationReasonStatus :status="props.data.kind"/>
              </div>
            </div>  
            <!-- reason process list -->
            <div class="mt-2 p-5 bg-greyscale-50 rounded-[16px] flex flex-col gap-4 overflow-y-auto h-full">
              <UserCard :data="props.data" @show-note="showNote" />
              <UserCard  :data="props.data" @show-note="showNote" />
            </div>
          </template>
        </template>
      </template>
    </base-dialog>
  </div>
  <NoteModal 
    v-model="noteModalVisible" 
    :note="note" 
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

