<script setup>
// Core
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
// Components
import BaseButton from '@/components/UI/BaseButton.vue'
import BackButton from '@/components/Actions/BackButton.vue'
import DialogPreview from './DialogPreview.vue'
import BaseDialog from '@/components/UI/BaseDialog.vue'
import { fetchDeleteNews } from '../../services/news.service'
// stores
import { useNewsStore } from '../../stores'

const router = useRouter()
const route = useRoute()
const newsStore = useNewsStore()

// reactive
const dialogisPreviewOpen = ref(false) 
const dialogDeleteOpen = ref(false)
const isDeleteLoading = ref(false)
const { t } = useI18n()

// props
const props = defineProps({
  onSubmitForm: {
    type: Function,
    required: true
  },
  isValidFormValidation: {
    type: Function,
    required: true
  }
})

// methods
const handleOpenDialogPreview = async () => {
  // validation is fail, then if work
  if(await props.isValidFormValidation()){
    dialogisPreviewOpen.value = true
  }
}

const handleDeleteDialog = () => {
  dialogDeleteOpen.value = true
}

const handleDeleteNews = async()=>{
  isDeleteLoading.value = true
  if(!!route.params.id){
   await fetchDeleteNews(route.params.id)
   isDeleteLoading.value = false
   dialogDeleteOpen.value = false
   router.push({name:'NewsIndex'})
   newsStore.restStore()
  }
}

</script>
<template>
    <div class="flex justify-between">
      <div class="flex gap-3 items-center">
        <back-button 
          :self="true" 
          @click="newsStore.restStore(); router.push({name:'NewsIndex'})"
        />
        <h2 class="text-xl font-semibold text-greyscale-900">{{t(!!route.params.id ? 'edit-news' : 'createNews') }}</h2>
      </div>
      <div class="flex gap-2">
        <base-button @click="handleOpenDialogPreview" button-class="!px-4 !py-3 text-xs rounded-[120px]" :label="t('preview-news')"/>
        <base-button 
          v-if="!!route.params.id"
          @click="handleDeleteDialog"
          button-class="!px-4 !py-3 text-xs rounded-[120px] border-critic-500 bg-critic-500" :label="t('delete')"/>
      </div>
    </div>
    <dialog-preview v-model="dialogisPreviewOpen" :onSubmitForm="props.onSubmitForm"/>
    <base-dialog
      :label="t('delete')"
       maxWidth="!w-[450px]"
       v-model="dialogDeleteOpen"
      >
        <template #content>
          <div class="text-xl font-semibold text-critic-500">
            {{ t("delete-news-dialog-content") }}
          </div>
        </template>
        <template #footer>
          <base-button
            label="cancel"
            rounded
            color="text-primary-900"
            border-color="border-transparent"
            outlined
            @click="dialogDeleteOpen = false"
          />
          <base-button
            :loading="isDeleteLoading"
            label="delete"
            rounded
            color="border-critic-500 bg-critic-500 text-white"
            @click="handleDeleteNews"
      />
    </template>
    </base-dialog>
    
</template>
