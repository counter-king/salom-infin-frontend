<script setup>
// core
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
// composables
const { t } = useI18n()
// props
const props = defineProps({
  hours: {
    type: Number,
    default: 0,
  },
	full: {
		type: Boolean,
		default: false
	}
})
</script>
<template>
	<div 
		class="flex justify-center items-center py-[6px] px-[6px] rounded-lg bg-success-100 text-xs font-semibold text-greyscale-900"
		:class="{'!bg-warning-100': props.hours < 8}"
	>
		{{ props.hours }} {{t('hour')}} 
	</div>
</template>