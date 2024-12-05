<script setup>
// Core
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n'
import { useVuelidate } from "@vuelidate/core"
// Components
import BaseCol from '@/components/UI/BaseCol.vue';
import BaseRow from '@/components/UI/BaseRow.vue';
import BaseDropdown from '@/components/UI/BaseDropdown.vue';
import BaseInput from '@/components/UI/BaseInput.vue';
import BaseTextarea from '@/components/UI/BaseTextarea.vue'
import BaseMultiSelect from '@/components/UI/BaseMultiSelect.vue';
import AddCard from '../AddCard.vue';
import BaseFroalaEditor from '../../BaseFroalaEditor.vue';
import FileUpload from '../FileUpload.vue';
import {UserWithRadio} from "@/components/Users"
//icons
import BaseIconify from '@/components/UI/BaseIconify.vue';
import { TrashBinBoldIcon } from '@/components/Icons';
//stores  
import { useNewsStore } from '../../../stores';
// utils
import { dispatchNotify } from '@/utils/notify';
// services
import { fetchCreateNews, fetchUpdateNews } from '../../../services/news.service';
// constants
import { COLOR_TYPES } from '@/enums';
import {  allowedAudioTypes, allowedFileTypes, allowedImageTypes, allowedVideoTypes, CONTENT_TYPES } from '../../../constants';

const newsStore = useNewsStore()
const router = useRouter()
// Macros
const props = defineProps({
  imageFile: {
    type: Object,
    default: null
  },
  galleryFiles: { type: Array, default: () => [] },
  newsId: {
    type: [Number,String],
    default: null
  }
})
const { t } = useI18n()


// form validation
const $v = useVuelidate(newsStore.rules, newsStore.model)


// methods
const getMatchFileUploadType = (file) => {
  if(allowedImageTypes.some(item => item.includes(file.type))){
    return CONTENT_TYPES.IMAGE
  }
  else if(allowedVideoTypes.some(item => item.includes(file.type))){
    return CONTENT_TYPES.VIDEO
  }
  else if(allowedAudioTypes.some(item => item.includes(file.type))){
    return CONTENT_TYPES.AUDIO
  }
}

const onSubmitForm = async () => {
  newsStore.loadingSubmitButton = true
    // empty data clearing not to send backend
    newsStore.model.dynamicFields = newsStore.model.dynamicFields.filter((item)=> !!item.value)
    const contents = [];
    for (let index = 0; index < newsStore.model.dynamicFields.length; index++) {
      const content = newsStore.model.dynamicFields[index];
      if (content.type === CONTENT_TYPES.FILE) {
        if(!!content.id){
          contents.push({ type: getMatchFileUploadType(content.value), file: content.value.id, id: content.id})
        }else{
          contents.push({ type: getMatchFileUploadType(content.value), file: content.value.id})
        }
      } else if (content.type === CONTENT_TYPES.TEXT) {
        if(!!content.id){
          contents.push({ type: CONTENT_TYPES.TEXT, content: content.value.trim(), id: content.id})
        } else{
          contents.push({ type: CONTENT_TYPES.TEXT, content: content.value.trim()})
        }
      } else if (content.type === CONTENT_TYPES.QUOTE) {
        if(!!content.id){
          contents.push({ type: CONTENT_TYPES.QUOTE, content: content.value.trim(), id: content.id})
        }else{
          contents.push({ type: CONTENT_TYPES.QUOTE, content: content.value.trim()})
        }
      } 
    }

    newsStore.model.contents = contents;
    const formData = {
      title: newsStore.model.title,
      description: newsStore.model.description,
      image: newsStore.model.image.id,
      category: newsStore.model.category,
      tags_ids: newsStore.model.tags_ids.map(tag => tag.id),
      images_ids: newsStore.model.images_ids.map(image => image.id),
      contents: contents
    };

    try {
     if (props.newsId) {
      await fetchUpdateNews(props.newsId, formData);
    } else {
      await fetchCreateNews(formData);
    }

    newsStore.loadingSubmitButton = false
    newsStore.restStore()
    router.push({ name: 'NewsIndex' })
  } 
  catch (error) { 
    dispatchNotify(null, error.message, COLOR_TYPES.ERROR)
  }
}

const isValidFormValidation = async () => {
  const valid = await $v.value.$validate()
  if (!valid) return false
  // at least one field must be added
  const filterDynamicFields = newsStore.model.dynamicFields.filter((item)=> !!item.value)
  if (!filterDynamicFields.length){
      dispatchNotify(null, t('error-desciption-field'), COLOR_TYPES.ERROR)
      return false
  }
  return true
}

const addDynamicField = (type) => {
  if(type === CONTENT_TYPES.TEXT){
    newsStore.model.dynamicFields.push({ type, value: "" });
  } else {
    newsStore.model.dynamicFields.push({ type, value: null });
  }
};

const removeDynamicField = (index) => {
  newsStore.model.dynamicFields.splice(index, 1);
};

onMounted(() => {
  newsStore.actionGetCategoryList()
  newsStore.actionGetTagList()
})

// expose
defineExpose({
  onSubmitForm,
  isValidFormValidation
})


</script>
<template>
  <div class="form">
    <base-row>
      <base-col col-class="w-full">
        <file-upload 
          :multiple="false" 
          :files="props.imageFile && [props.imageFile]" 
          :allowedFileTypes="allowedImageTypes"
          @emit:file-upload="(val) => { newsStore.model.image = val[0]; $v.image.$model = val[0] || null }"
          @emit:on-file-delete="() => { newsStore.model.image = null; $v.image.$model = null }" 
          :error="$v.image"
          :allowed-file-info="t('allowed-file-info',{ formats: allowedImageTypes.map(item => item.split('/')[1]).join(', '), size: '10M' })"
          />
      </base-col>
      <base-col col-class="w-full pt-6">
        <base-dropdown v-model.number="$v.category.$model" 
            :error="$v.category"
            :options="newsStore.categoryList"
            option-value="id"
            required
            option-label="name"
            label="category2"
            placeholder="enterCategory" />
      </base-col>
      <base-col col-class="w-full pt-6">
        <base-input 
          v-model="$v.title.$model" 
          :error="$v.title" 
          required 
          label="name" 
          placeholder="enterName" />
      </base-col>
      <base-col col-class="w-full flex flex-col gap-2 overflow-hidden">
        <label class="block text-sm font-medium text-greyscale-500">{{ t('definition') }}<span class="text-red-500"> *</span></label>
        <base-froala-editor 
          v-model="$v.description.$model" 
          :error="$v.description" />
        
      </base-col>
      <base-col col-class="w-full pt-6">
          <base-multi-select
            v-model="$v.tags_ids.$model" 
            api-url="news-tags"
            :token-class="['chip-hover shadow-button bg-white cursor-pointer']"
            display="chip"
            selectable
            label="tag"
            type="department"
            placeholder="selectTag"
          >
            <template #chip="{ value }">
              {{ value.name }}
            </template>

            <template #option="{ value }">
              <user-with-radio
                :title="value.name"
                :text-truncate="false"
              >
              </user-with-radio>
            </template>
          </base-multi-select>
      </base-col>
      <base-col col-class="w-full pt-6">
          <label class="block text-sm font-medium text-greyscale-500 mb-2">{{ t('gallery') }}</label>
          <file-upload :multiple="true" 
            :files="props.galleryFiles"
            :allowedFileTypes="allowedImageTypes"
            @emit:file-upload="(val) => newsStore.model.images_ids = val"
            :allowed-file-info="t('allowed-file-info',{ formats: allowedImageTypes.map(item => item.split('/')[1]).join(', '), size: '10M' })"
            />
      </base-col>
      <!-- dynamic fields -->
      <base-col v-for="(field, index) in newsStore.model.dynamicFields" :key="index"
        class="w-full pt-6 flex gap-2 items-end overflow-hidden">
        <div class="w-full">
          <label v-if="field.type === CONTENT_TYPES.TEXT" class="block text-sm font-medium text-greyscale-500 mb-2">{{ t('definition') }}</label>
          <base-froala-editor 
            v-if="field.type === CONTENT_TYPES.TEXT" 
            v-model="field.value" />
          <label 
            v-if="field.type === CONTENT_TYPES.FILE"
            class="block text-sm font-medium text-greyscale-500 mb-2">
            {{ t('image') }}
          </label>
          <file-upload 
            v-if="field.type === CONTENT_TYPES.FILE"
            :multiple="false" 
            :files="field.value && [field.value]"
            :allowedFileTypes="allowedFileTypes"
            @emit:file-upload="(val) => field.value = val[0]"
            @emit:on-file-delete="() => field.value = null" 
            :allowed-file-info="t('allowed-file-info',{ formats: allowedFileTypes.map(item => item.split('/')[1]).join(', '), size: '10M' })"
            />
            
          <base-textarea 
            v-if="field.type === CONTENT_TYPES.QUOTE"
            v-model="field.value"
            :label="t('quotes')"
            :placeholder="t('enter-quotes')"
          />
          </div>
        <div @click="removeDynamicField(index)"
          class="text-red-500 bg-greyscale-50 rounded-xl w-11 h-11 min-w-[44px] flex justify-center items-center cursor-pointer">
          <base-iconify :icon="TrashBinBoldIcon" class="!w-5 !h-5" />
        </div>
      </base-col>
      <!-- adding new fields -->
      <base-col col-class="w-full pt-6">
        <h2 class="text-sm font-medium text-greyscale-500">{{ t('add-more') }}</h2>
      </base-col>
      <base-col col-class="w-full flex gap-2">
        <add-card 
          text="definition"
          @click="addDynamicField(CONTENT_TYPES.TEXT)" 
          class="w-fit" icon-color="warning-500"
        />
        <add-card text="image"
         @click="addDynamicField(CONTENT_TYPES.FILE)"
         class="w-fit" icon-color="info-500" 
         />
        <add-card text="quotes"
          @click="addDynamicField(CONTENT_TYPES.QUOTE)"
          class="w-fit" icon-color="critic-500" 
        />
      </base-col>
    </base-row>
  </div>
</template>
