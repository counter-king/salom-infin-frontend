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
})

// emits
const emit = defineEmits(['update:modelValue'])
const modelValue = useModel(props, 'modelValue')

const onCancel = () => {
  modelValue.value = false
}

const onSubmit = () => {
  console.log('submit')
  modelValue.value = false
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
          rounded
          outlined
          shadow
          color="text-primary-900"
          border-color="border-transparent"
          @click="onCancel"
        />
        <base-button
          label="reject"
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


