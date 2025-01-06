<script setup>
//core
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
// Components
import HeaderToolbar from '../components/create/HeaderToolbar.vue';
import CreateForm from '../components/create/Form/NewForm.vue';
import TheFooter from '@/components/TheFooter.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import DialogPreview from '../components/create/DialogPreview.vue';
import BaseDialog from '@/components/UI/BaseDialog.vue';

const { t } = useI18n()
const createFormRef = ref(null)

// reactive
const dialogisPreviewOpen = ref(false) 
const isDraftLoading = ref(false)
const isDraftDialogVisible = ref(false)
// methods
const onSubmitForm = () => {
  return createFormRef.value?.onSubmitForm()
}

const isValidFormValidation = () => {
  return createFormRef.value?.isValidFormValidation()
}

const handleOpenDialogPreview = async () => {
  // validation is fail, then if work
  if(await isValidFormValidation()){
    dialogisPreviewOpen.value = true
  }
}

const handleNewsDraft = async() => {
  isDraftLoading.value = true
  try{
    await createFormRef.value?.onSubmitForm(true)
  } finally{
    isDraftDialogVisible.value = false
    isDraftLoading.value = false
  }
}

</script>
<template>
  <div class="flex flex-col overflow-y-auto w-full items-center">
    <div class="py-5 w-full flex flex-col items-center gap-5" >
      <div class="w-[900px]">
        <header-toolbar/>
      </div>
      <div class="rounded-[20px] pr-1 overflow-y-auto">
        <div class="w-[900px] bg-white rounded-[20px] p-8">
          <create-form ref="createFormRef">
            <template #footer>
              <div class="flex gap-2 justify-end">
                <base-button @click="isDraftDialogVisible = true" color="text-primary" outlined shadow button-class="!px-4 !py-3 text-xs rounded-[120px]" :label="t('draft')"/>
                <base-button @click="handleOpenDialogPreview" button-class="!px-4 !py-3 text-xs rounded-[120px]" :label="t('preview-news')"/>
              </div>
            </template>
          </create-form>
        </div>
      </div>
    </div>
    <div class="w-[900px] pb-2">
      <the-footer/>
    </div>
    <dialog-preview v-model="dialogisPreviewOpen" :onSubmitForm="onSubmitForm"/>
    <base-dialog
      :label="t('draft')"
       maxWidth="!w-[450px]"
       v-model="isDraftDialogVisible"
      >
        <template #content>
          <div class="text-xl font-semibold text-primary-500">
            {{ t("save-news-as-draft") }}
          </div>
        </template>
        <template #footer>
          <base-button
            label="cancel"
            rounded
            color="text-primary-900"
            border-color="border-transparent"
            outlined
            @click="isDraftDialogVisible = false"
          />
          <base-button
            :loading="isDraftLoading"
            label="draft"
            rounded
            color="border-primary-500 bg-primary-500 text-white"
            @click="handleNewsDraft"
          />
        </template>
    </base-dialog>
  </div>
</template>

<style></style>
