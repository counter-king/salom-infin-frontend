<script setup>
// core
import { ref, useModel } from 'vue';
import { useI18n } from 'vue-i18n';
// components
import BaseDialog from '@/components/UI/BaseDialog.vue';
import ModalBodyHeader from './ModalBodyHeader.vue';
import InfoCardStatus from './InfoCardStatus.vue';
import AttendanceStatus2 from '../AttendanceStatus2.vue';
import UserCard from './UserCard.vue';

// composable
const { t } = useI18n()
// props
const props = defineProps({
  modelValue: {
      type: Boolean,
      default: false
  },
  label: {
      type: String,
      default: 'reason-process'
  }
})

// emits
const emit = defineEmits(['update:modelValue'])
const modelValue = useModel(props, 'modelValue')

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
			<div class="flex flex-col gap-4">
			<!-- body header -->
        <ModalBodyHeader />
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
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
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

