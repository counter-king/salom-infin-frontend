<script setup>
// core
import { ref, useModel } from 'vue';
import { useI18n } from 'vue-i18n';
// components
import BaseDialog from '@/components/UI/BaseDialog.vue';
// store
import { useAttendanceExpectionsStore } from '@/modules/HR/modules/MyActivities/store/attendanceExceptions.store';
// composable
const { t, locale } = useI18n()
const attendanceExpectionsStore = useAttendanceExpectionsStore()
// props
const props = defineProps({
  modelValue: {
      type: Boolean,
      default: false
  },
  afterSubmitTriggerFun: {
    type: Function,
    required: true
  }
})

// reactive
const reason = ref('')
// emits
const emit = defineEmits(['update:modelValue'])
const modelValue = useModel(props, 'modelValue')

const onCancel = () => {
  modelValue.value = false
}

const onSubmit = () => {
  try {
    // attendanceExpectionsStore.createAttendanceExceptionsRejectById(props.data?.id, { note: reason.value })
    console.log(reason.value)
    props.afterSubmitTriggerFun()
    modelValue.value = false
  } catch (error) {
  }
}

</script>
<template>
  <div class="modal">
	<base-dialog
		v-model="modelValue"
		:label="t('reject-reason')"
		max-width="max-w-[583px]"
		contentClasses="py-5 px-6 pb-20"
	>
		<template #content>
      <base-textarea
        v-model="reason"
        :label="t('note')"
        :placeholder="t('enter-reason')"
        :max-length="250"
        rows="5"
      />
		</template>
    <template #footer>
      <div class="flex items-center justify-end gap-2"> 
        <base-button
          label="cancel"
          :disabled="attendanceExpectionsStore.attendanceExceptionsRejectLoading"
          rounded
          outlined
          shadow
          color="text-primary-900"
          border-color="border-transparent"
          @click="onCancel"
        />
        <base-button
          label="reject"
          :loading="attendanceExpectionsStore.attendanceExceptionsRejectLoading"
          rounded
          shadow
          type="button"
          @click="onSubmit"
        />
      </div>
    </template>
	</base-dialog>
</div>
</template>


