<script setup>
// cores
import { useModel } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
// props
const props = defineProps({
 modelValue: {
  type: Boolean,
  default: false
 },
 onClose: {
  type: Function,
 },
 onDelete: {
  type: Function
 },
 isDeleteLoading: {
  type: Boolean,
  default: false
 },
 maxWidth: {
  type: String,
  default: '!w-[450px]'
 },
 conetentText: {
  type: String,
  default: 'delete-chat-dialog-content'
 }
})

// composable
const modelValue = useModel(props, 'modelValue')
</script>
<template>
 <base-dialog
  :label="t('delete')"
  :maxWidth="props.maxWidth"
  v-model="modelValue"
 >
 <template #content>
   <div class="text-xl font-semibold text-critic-500">
     {{ t(props.conetentText) }}
   </div>
 </template>
 <template #footer>
   <base-button
     label="cancel"
     rounded
     color="text-primary-900"
     border-color="border-transparent"
     outlined
     @click="onClose()"
   />
   <base-button
     :loading="isDeleteLoading"
     label="delete"
     rounded
     color="border-critic-500 bg-critic-500 text-white"
     @click="onDelete"
   />
   </template>
 </base-dialog>
</template>
