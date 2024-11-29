<script setup >
// core
import { useI18n } from 'vue-i18n';
// component 
import BaseDialog from '@/components/UI/BaseDialog.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
// stores
import { useNewsStore } from '../../stores';
// props  
const props = defineProps({
    modelValue: {
        type: Boolean,
    },
    onSubmitForm: {
        type: Function,
        required: true
  }
})

// internalitaion
const { t } = useI18n()
// emits
const emit = defineEmits(['update:modelValue'])

const newsStore = useNewsStore()

// methods
const handlePublish = async () => {
  if(await props.onSubmitForm()){
    emit('update:modelValue', false)
  }
  
  if(!newsStore.loadingSubmitButton){
      emit('update:modelValue', false)
  }
  
}

</script>
<template>
    <base-dialog
    :label="t('preview-news')"
    maxWidth="!w-[904px]"
    :modelValue="modelValue" @update:modelValue="val => $emit('update:modelValue', val)" 
    >
    <template #footer>
      <base-button
        label="cancel"
        rounded
        outlined
        shadow
        color="text-primary-900"
        border-color="border-transparent"
        @click="$emit('update:modelValue', val)"
      />

      <base-button
        :loading="newsStore.loadingSubmitButton"
        label="publish"
        rounded
        @click="handlePublish"
      />
    </template>
    </base-dialog>
</template>