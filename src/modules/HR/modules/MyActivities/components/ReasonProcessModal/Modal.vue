<script setup>
// core
import { ref, useModel, onMounted, computed  } from 'vue';
import { useI18n } from 'vue-i18n';
import dayjs from 'dayjs';
// components
import BaseDialog from '@/components/UI/BaseDialog.vue';
import ModalBodyHeader from './ModalBodyHeader.vue';
import InfoCardStatus from './InfoCardStatus.vue';
import AttendanceStatus2 from '../AttendanceStatus2.vue';
import UserCard from './UserCard.vue';
// store
import { useAttendanceExpectionsStore } from '../../store/attendanceExpections.store';
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

// emits
const emit = defineEmits(['update:modelValue'])
const modelValue = useModel(props, 'modelValue')

const label = computed(() => dayjs(props.data?.date).format(locale.value === 'ru' ? 'D-MMMM, YYYY [г.]' : 'D-MMMM, YYYY [y.]'))

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
          <InfoCardStatus  />
        </div>
        <!-- reason for explanation -->
        <div class="mt-3">
          <div class="flex items-center gap-2">
            <span class="text-sm font-semibold text-greyscale-900">{{ t('reason-for-explanation') }}:</span>
            <AttendanceStatus2/>
          </div>
        </div>  
        <div class="mt-2 p-5 bg-greyscale-50 rounded-[16px] flex flex-col gap-4 overflow-y-auto h-full">
          <UserCard :data="props.data" />
          <UserCard  :data="props.data" />
        </div>
      </template>
		</template>
	</base-dialog>
</div>
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

