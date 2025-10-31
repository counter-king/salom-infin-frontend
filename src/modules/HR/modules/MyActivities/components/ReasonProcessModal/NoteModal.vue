<script setup>
// core
import { ref, useModel, onMounted, computed  } from 'vue';
import { useI18n } from 'vue-i18n';
// components
import BaseDialog from '@/components/UI/BaseDialog.vue';
// store
// composable
const { t, locale } = useI18n()
// props
const props = defineProps({
  modelValue: {
      type: Boolean,
      default: false
  },
  note: {
    type: String,
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
		:label="t('note')"
		max-width="max-w-[583px]"
		contentClasses="py-5 px-6 pb-20"
	>
		<template #content>
     <div class="w-full h-[129px] bg-greyscale-50 rounded-[12px] px-4 py-3">
      {{ props.note }}
     </div>
		</template>
	</base-dialog>
</div>
</template>


