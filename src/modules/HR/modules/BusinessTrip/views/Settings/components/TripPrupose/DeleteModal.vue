<script setup>
// core
import { useModel } from 'vue';
import { useI18n } from 'vue-i18n';
// components
import { TrashBinBoldIcon } from '@/components/Icons';
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
  content: {
    type: Object,
    default: () => ({
      title: '',  
    })
  },
  loading: {
    type: Boolean,
    default: () => false
  }
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
    content-classes="py-12 px-14"
  >
    <template #content>
      <div class="flex flex-col gap-6 items-center">
        <div class="flex justify-center items-center p-6 bg-critic-50 rounded-full">
          <base-iconify :icon="TrashBinBoldIcon" class="!w-12 !h-12 text-critic-500" />
        </div>
        <div class="flex flex-col">       
          <p class="text-center text-2xl font-semibold text-greyscale-900">
            {{ t(props.content.title) }}
          </p>
      </div>
      </div>
    </template>
    <template #footer>
      <div>
        <base-button
          :disabled="props.loading"
          @click="onCloseModal"
          label="cancel"
          button-class="!py-[14px] !px-8 !rounded-[120px]"
          border-color="border-transparent"
          shadow
          outlined
        />
        <base-button
          :loading="props.loading"
          label="delete"
          button-class="!py-[14px] !px-8 !rounded-[120px]"
          @click="handleClickDelete"
        />
      </div>
    </template>
  </BaseDialog>
</template>