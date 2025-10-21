<script setup>
// cores
import { computed, h} from 'vue';
import { useI18n } from 'vue-i18n';
import { InfoCircleBoldIcon } from '@/components/Icons';
import LedgerIcon from '../Icons/LedgerIcon.vue';
import CheckMarkIcon from '../Icons/CheckMarkIcon.vue';

// components
// composables
const { t } = useI18n()
// props
const props = defineProps({
	data: {
		type: Object,
	}
})

const statusIcon = computed(() => {
	switch(props.data?.status) {
		case 'success':
			return InfoCircleBoldIcon
		case 'warning':
			return InfoCircleBoldIcon
	}
})

const getMathText = () => {
	switch('late-reason-rejected-and-hours-written-by-hr') {
		case 'success':
			return t('')
		case 'warning':
			return t('late-reason-accepted-hours-written', { hours: props.data?.hours || 0 })
		case 'declined':
			return t('late-reason-rejected-by-director')
		case 'late-reason-rejected-and-hours-written-by-hr':
			return t('late-reason-rejected-and-hours-written-by-hr', { hours: props.data?.hours || 0 })
	}
}
const statusClass = () => {
	switch('declined') {
		case 'success':
			return 'bg-success-50 border-success-100 text-greyscale-900'
		case 'warning':
			return 'bg-success-50 border-success-100 text-greyscale-900'
		case 'declined':
			return 'bg-warning-30 border-warning-100 text-greyscale-900'
	}
}

const renderIcon = () => {
  switch ('declined') {
    case 'success': return h(CheckMarkIcon, { width: 26, height: 24 })
    case 'warning': return h(CheckMarkIcon, { width: 26, height: 24 })
    case 'declined': return h(LedgerIcon, { width: 30, height: 24 })
    default: return null
  }
}

</script>
<template>
	<div 
		class="flex items-center gap-2 py-3 px-4 border rounded-[12px]"
		:class="statusClass()"
	>
		<component :is="renderIcon()" />
		<slot name="text">
			<p v-if="true" 
			class="text-sm font-medium"
			>
				{{ getMathText() }}
			</p>
			<div v-else class="flex flex-col">
				<span 
					class="text-sm font-medium text-greyscale-900"
					:class="statusClass()"
					>
					{{ t('no-attendance-issues') }}
				</span>
				<span class="text-[13px] font-medium text-greyscale-500">
							{{ t('no-attendance-records-on-time') }}
				</span>
			</div>
		</slot>
	</div>
</template>