<script setup>
// Core
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
// Components
import HeaderToolbar from '../components/create/HeaderToolbar.vue';
import EditForm  from '../components/create/Form/NewForm.vue';
import { fetchGetNews } from '../services/news.service';
import BaseSpinner from '@/components/UI/BaseSpinner.vue';
// stores
import { useNewsStore } from '../stores';
import { allowedAudioTypes, allowedImageTypes, allowedVideoTypes, CONTENT_TYPES } from '../constants';
import { dispatchNotify } from '@/utils/notify';
import { COLOR_TYPES } from '@/enums';

const route = useRoute()
const newsStore = useNewsStore()

// reactive
const loading = ref(false)

const createFormRef = ref(null)
// methods
const onSubmitForm = async() => {
  return createFormRef.value?.onSubmitForm()
}

const isValidFormValidation = async () => {
  return createFormRef.value?.isValidFormValidation()
}

// methods
const fetchOneNews = async() => {
   loading.value = true

   // methods
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
      const { data }  = await fetchGetNews(route.params.id)   
      newsStore.model.title = data.title    
      newsStore.model.description = data.description
      newsStore.model.category = data.category.id
      newsStore.model.tags_ids = data.tags
      newsStore.model.images_ids = data.galleries
      newsStore.model.image = {...data.image, type:CONTENT_TYPES.IMAGE} 
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
  <div class="w-full">
    <template v-if="loading">
      <base-spinner/>
    </template>
    <div v-else class="py-5 w-full flex flex-col items-center gap-5 overflow-y-auto h-full" >
      <div class="w-[900px]">
        <header-toolbar :onSubmitForm="onSubmitForm"  :isValidFormValidation="isValidFormValidation"/>
      </div>
      <div class="rounded-[20px] pr-1 overflow-y-auto">
        <div class="w-[900px] bg-white rounded-[20px] p-8">
          <edit-form ref="createFormRef" :news-id="route.params.id" :imageFile="newsStore.model.image" :galleryFiles="newsStore.model.images_ids" />
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
