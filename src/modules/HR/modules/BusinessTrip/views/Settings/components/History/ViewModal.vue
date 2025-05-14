<script setup>
// core
import { useModel } from 'vue';
import { useI18n } from 'vue-i18n';
// components
import { CheckCircleBoldIcon } from '@/components/Icons';
import BaseDialog from '@/components/UI/BaseDialog.vue';
// props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: () => false
  },
  label: {
    type: String,
    default: 'country'
  },
  maxWidth : {
    type: String,
    default: 'max-w-[544px]'
  },
})
const modelValue = useModel(props, 'modelValue')
const emit = defineEmits(['update:modelValue','click:delete'])
const { t } = useI18n()
// emit
const onCloseModal = () => {
  modelValue.value = false
}
const handleClickDelete = () => {
  emit('click:delete')
}
</script>
<template>
  <BaseDialog
    v-model="modelValue"
    :label="t(props.label)"
    :max-width="props.maxWidth"
    content-classes="py-6 px-6 pb-[150px]"
  >
    <template #content>
      <div class="flex justify-between gap-3 bg-greyscale-50 rounded-[16px] px-4 py-5">   
        <!-- old data -->
        <div class="flex flex-col">
          <div class="p-[6px] bg-white w-fit rounded-full">
            <base-iconify :icon="CheckCircleBoldIcon" class="!w-5 !h-5 text-success-500" />
          </div>
          <p class="mt-4 text-sm font-semibold text-greyscale-500">{{ t('old-value') }}</p>
          <p class="mt-1 text-base font-semibold text-primary-900"> value </p>
        </div>
        <!-- new daata -->
        <div class="flex flex-col">
          <div class="p-[6px] bg-white w-fit rounded-full">
            <base-iconify :icon="CheckCircleBoldIcon" class="!w-5 !h-5 text-success-500" />
          </div>
          <p class="mt-4 text-sm font-semibold text-greyscale-500">{{ t('new-value') }}</p>
          <p class="mt-1 text-base font-semibold text-primary-900">value</p>
        </div>
      </div>
    </template>
  </BaseDialog>
</template>