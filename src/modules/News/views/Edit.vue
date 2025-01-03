<script setup>
// Core
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
// Components
import HeaderToolbar from '../components/create/HeaderToolbar.vue';
import EditForm  from '../components/create/Form/NewForm.vue';
import BaseSpinner from '@/components/UI/BaseSpinner.vue';
import TheFooter from '@/components/TheFooter.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import DialogPreview from '../components/create/DialogPreview.vue';
import BaseDialog from '@/components/UI/BaseDialog.vue'
// services 
import { fetchGetMyNewsDelete, fetchGetMyNews } from '../services/news.service';
// stores
import { useNewsStore } from '../stores';
// constants
import { allowedAudioTypes, allowedImageTypes, allowedVideoTypes, CONTENT_TYPES } from '../constants';
import { dispatchNotify } from '@/utils/notify';
import { COLOR_TYPES } from '@/enums';

const { t } = useI18n()
const route = useRoute()
const newsStore = useNewsStore()
const router = useRouter()
// reactive
const loading = ref(false)
const dialogisPreviewOpen = ref(false) 
const dialogDeleteOpen = ref(false)
const isDeleteLoading = ref(false)

const createFormRef = ref(null)
// methods
const onSubmitForm = async() => {
  return createFormRef.value?.onSubmitForm()
}

const isValidFormValidation = async () => {
  return createFormRef.value?.isValidFormValidation()
}

// methods
const handleOpenDialogPreview = async () => {
  // validation is fail, then if work
  if(await isValidFormValidation()){
    dialogisPreviewOpen.value = true
  }
}

const handleDeleteDialog = () => {
  dialogDeleteOpen.value = true
}

const handleDeleteNews = async()=>{
  isDeleteLoading.value = true
  if(!!route.params.id){
   await fetchGetMyNewsDelete(route.params.id)
   isDeleteLoading.value = false
   dialogDeleteOpen.value = false
   router.push({name:'MyNewsList', query: {...router.currentRoute.value.query, activeMenu: 'my-posts'}})
   newsStore.restStore()
  }
}

// methods
const fetchOneNews = async() => {
   loading.value = true

  const getMatchFileUploadType = (content) => {
    if(allowedImageTypes.some(item => item.includes(content.type))){
      return {type: CONTENT_TYPES.FILE,  value: { ...content.file,type: content.type}, id: content.id}
    }
    else if(allowedVideoTypes.some(item => item.includes(content.type))){
      return {type: CONTENT_TYPES.FILE, value: {...content.file, type: content.type}, id: content.id}
    }
    else if(allowedAudioTypes.some(item => item.includes(content.type))){
      return {type: CONTENT_TYPES.FILE, value: {...content.file,type: content.type}, id: content.id}
    }
  }

   try {
      const { data }  = await fetchGetMyNews(route.params.id)   
      newsStore.model.title = data.title    
      newsStore.model.description = data.description
      newsStore.model.category = data.category?.id
      newsStore.model.tags_ids = data.tags
      newsStore.model.images_ids = data.galleries
      newsStore.model.image = data.image ? {...data.image, type:CONTENT_TYPES.IMAGE} : null 
      newsStore.model.dynamicFields = data.contents.map(content=> {
        if (content.type === CONTENT_TYPES.TEXT) {
          return { type: CONTENT_TYPES.TEXT, value: content.content,id: content.id }
        } else if (content.type === CONTENT_TYPES.QUOTE) {
          return { type: CONTENT_TYPES.QUOTE, value: content.content, id: content.id }
        } else if ([CONTENT_TYPES.IMAGE,CONTENT_TYPES.AUDIO, CONTENT_TYPES.VIDEO].includes(content.type)) {
          return getMatchFileUploadType(content)
        } 
      })

   } catch(e) {
      dispatchNotify(null, e?.message, COLOR_TYPES.ERROR)
   } finally {
    loading.value = false
   }
}


onMounted(() => {
    fetchOneNews()
})

</script>
<template>
  <div class="flex flex-col items-center overflow-y-auto w-full">
    <div class="w-full h-full">
      <template v-if="loading">
        <base-spinner/>
      </template>
      <div v-else class="py-5 w-full flex flex-col items-center gap-5 overflow-y-auto h-full" >
        <div class="w-[900px]">
          <header-toolbar />
        </div>
        <div class="rounded-[20px] pr-1 overflow-y-auto">
          <div class="w-[900px] bg-white rounded-[20px] p-8">
            <edit-form ref="createFormRef" :news-id="route.params.id" :imageFile="newsStore.model.image" :galleryFiles="newsStore.model.images_ids" >
              <template #footer>
                <div class="flex gap-2 justify-end">
                  <base-button 
                    v-if="!!route.params.id"
                    @click="handleDeleteDialog"
                    button-class="!px-4 !py-3 text-xs rounded-[120px] border-critic-500 bg-critic-500" :label="t('delete')"
                  />
                  <base-button @click="handleOpenDialogPreview" button-class="!px-4 !py-3 text-xs rounded-[120px]" :label="t('preview-news')"/>
                </div>
                </template>
              </edit-form>

          </div>
        </div>
      </div>
    </div>
    <div 
      v-if="!loading" class="w-[900px] pb-2">
      <the-footer/>
    </div>
    <dialog-preview v-model="dialogisPreviewOpen" :onSubmitForm="onSubmitForm"/>
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
  </div>
</template>

<style></style>
