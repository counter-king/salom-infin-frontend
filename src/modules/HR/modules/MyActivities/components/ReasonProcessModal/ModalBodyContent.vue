<script setup>
// core
import { computed, useModel, toRef, ref } from 'vue';
import { useI18n } from 'vue-i18n';
// components
import InfoCardStatus from './InfoCardStatus.vue';
import ExplanationReasonStatus from '../ExplanationReasonStatus.vue';
import { UserCard } from '../UserCard';
import NoteModal from './NoteModal.vue';

// enums
import { USER_TYPE, REASON_PROCESS_STATUS } from '../../enums';
// composables
const { t } = useI18n()
// props
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
// reactives
const noteModalVisible = ref(false)
const note = ref('')

const data = toRef(props, 'data')

const proccessList = computed(() => {
    let list = []
    // approvals (manager, hr va boshqalar)
    const approvals = (data.value.approvals || [])
    const manager = (data.value.approvals || []).filter(item => item.type == USER_TYPE.MANAGER).map(item => ({
      id: item.id,
      type: item.type,
      user: item.user,
      // is_approved: item.is_approved,
      // reason_status:  item.is_approved == null ? REASON_PROCESS_STATUS.WAITING : item.is_approved ? REASON_PROCESS_STATUS.CONFIRMED : REASON_PROCESS_STATUS.REJECTED,
      reason_status: REASON_PROCESS_STATUS.REJECTED,
      is_approved: false,
      decision_note: item.decision_note,
      action_time: item.action_time,
    }));

    const hr = (data.value.approvals || []).filter(item => item.type == USER_TYPE.HR).map(item => ({
      id: item.id,
      type: item.type,
      user: item.user,
      is_approved: item.is_approved,
      reason_status:  item.is_approved == null ? REASON_PROCESS_STATUS.WAITING : item.is_approved ? REASON_PROCESS_STATUS.ENTERED_TO_TIMESHEET : REASON_PROCESS_STATUS.REJECTED,
      decision_note: item.decision_note,
      action_time: item.action_time,
    }));

    // employee (har doim bitta bo‘ladi)
    const employee = {
      id: props.data.employee?.id || null,
      type: USER_TYPE.EMPLOYEE,
      user: {
        id:props.data.employee?.id || null,
        full_name:props.data.employee?.full_name || "",
        position:props.data.employee?.position
      },
      status:props.data.status,
      reason_status: REASON_PROCESS_STATUS.REASON_ENTERED,
      note:props.data.note,
      action_time:props.data.created_date,
      reason:props.data.reason,
      attachments: props.data?.attachments || [],
      application:props.data?.application || [],
      application_write: null,
      attendanceId: props.data?.attendance?.id,
      kind: props.data?.kind,
      date: props.data?.attendance?.date,
      exceptionId: props.data?.id
    };

    list.push(employee)

    if(approvals.length > 0){
       // mageer is being waited to sing
      if(manager[0]?.is_approved == null){
        list.push(manager[0])
        // manager is approved
      } else if(manager[0]?.is_approved){
        list.push(manager[0])
        // rejected by manager and employee is being waited to write application
      } else if(manager[0]?.is_approved == false && !employee.application_write){
        const nextStepEmployee = { ...employee, reason_status: REASON_PROCESS_STATUS.WAITING, application_write: false}
        list.push(manager[0], nextStepEmployee)
        // application writeen by employee and manager is wating
      } else if(manager[1]?.is_approved == null && employee.application_write){
        const nextStepEmployee = {...employee, reason_status: REASON_PROCESS_STATUS.LETTER_WRITTEN}
        list.push(manager[0], nextStepEmployee, manager[1])
      } 
      // application writeen by employee and manager approved
      else if(manager[0]?.is_approved == null && employee?.application_write){
        proccessList.value.push(manager[0], employee, manager[1], hr[0])
      } 
    }
    return list
  }
)

const showNote = (value) => {
  note.value = value
  noteModalVisible.value = true
}

</script>
<template>
  <!-- reason for explanation -->
  <div class="mt-3">
    <div class="flex items-center gap-2">
      <span class="text-sm font-semibold text-greyscale-900">{{ t('reason-for-explanation') }}:</span>
      <ExplanationReasonStatus :status="props.data.kind"/>
    </div>
  </div>  
  <!-- reason process list -->
  <div class="mt-2 p-5 bg-greyscale-50 rounded-[16px] flex flex-col gap-4 overflow-y-auto">
    <template v-for="item in proccessList" :key="item.id">
      <UserCard :item="item" @show-note="showNote" />
    </template>
  </div>
  <NoteModal 
    v-model="noteModalVisible" 
    :note="note" 
  />
</template>