<script setup>
// cores
import { computed, h} from 'vue';
import { useI18n } from 'vue-i18n';
// components
import LedgerIcon from '../Icons/LedgerIcon.vue';
import CheckMarkIcon from '../Icons/CheckMarkIcon.vue';
// enums
import { USER_TYPE, KIND } from '../../enums';
// composables
const { t } = useI18n()
// props
const props = defineProps({
	data: {
		type: Object,
	}
})

const manger = computed(() => props.data?.approvals?.findLast(item => item.type == USER_TYPE.MANAGER))
const hr = computed(() => props.data?.approvals?.findLast(item => item.type == USER_TYPE.HR))

const getMathText = computed(() => {
  if(manger.value && manger.value?.is_approved === false) {
    return t('entered-reason-rejected-by-director')
  }
  else if(manger.value && manger.value?.is_approved === true && ! hr.value) {
    return t('entered-reason-accepted-by-director')
  }
  else if(hr.value && hr.value?.is_approved === true) {
    return t('entered-reason-accepted-by-hr-director')
  }
  else {
    return ''
  }
})

const wrapperClass = computed(() => {
	if(!props.data) {
		return 'bg-success-30 border-success-100 text-greyscale-900'
	}
  else if(manger.value && manger.value?.is_approved === null || hr.value && hr.value?.is_approved === null) {
    return "hidden"
  }
	else {
		return 'bg-warning-30 border-warning-100 text-greyscale-900'
	}
})

const renderIcon = computed(() => {
  if(!props.data){
    return h(CheckMarkIcon, { width: 30, height: 24 })
  } else {
    return h(LedgerIcon, { width: 30, height: 24 })
  }
})

</script>
<template>
	<div 
		class="flex items-center gap-2 py-3 px-4 border rounded-[12px]"
		:class="wrapperClass"
	>
		<component :is="renderIcon" />
		<div v-if="props.data" 
		class="text-sm font-medium"
		>
			{{ getMathText }}
		</div>
		<div v-else class="flex flex-col">
			<span 
				class="text-sm font-medium text-greyscale-900"
				>
				{{ t('no-attendance-issues') }}
			</span>
			<span class="text-[13px] font-medium text-greyscale-500">
				{{ t('no-attendance-records-on-time') }}
			</span>
		</div>
	</div>
</template>