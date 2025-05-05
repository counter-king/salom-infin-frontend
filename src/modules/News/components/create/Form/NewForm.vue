<script setup>
// Core
import { useRouter } from 'vue-router';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n'
import { useVuelidate } from "@vuelidate/core"
// Components
import BaseCol from '@/components/UI/BaseCol.vue';
import BaseRow from '@/components/UI/BaseRow.vue';
import BaseDropdown from '@/components/UI/BaseDropdown.vue';
import BaseInput from '@/components/UI/BaseInput.vue';
import BaseTextarea from '@/components/UI/BaseTextarea.vue'
import BaseMultiSelect from '../../BaseMultiSelect.vue';
import AddCard from '../AddCard.vue';
import BaseFroalaEditor from '../../BaseFroalaEditor.vue';
// import BaseTinyEditor from "@/components/UI/BaseTinyEditor.vue";
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
import { fetchCreateMyNews, fetchUpdateMyNews } from '../../../services/news.service';
import { useCountStore } from '@/stores/count.store'
// constants
import { COLOR_TYPES } from '@/enums';
import {  allowedAudioTypes, allowedFileTypes, allowedImageTypes, allowedVideoTypes, CONTENT_TYPES } from '../../../constants';
import { NEWS_STATUS } from '@/modules/News/enums';

const newsStore = useNewsStore();
const countStore = useCountStore()
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
const { t, locale} = useI18n()

// reactive
const countChar = ref(0)
const countCharNewsHeadline = ref(0)
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

const onSubmitForm = async (isDraft = false) => {

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
        } else {
          contents.push({ type: CONTENT_TYPES.TEXT, content: content.value.trim()})
        }
      } else if (content.type === CONTENT_TYPES.QUOTE) {
        if(!!content.id){
          contents.push({ type: CONTENT_TYPES.QUOTE, content: content.value.trim(), id: content.id})
        }else {
          contents.push({ type: CONTENT_TYPES.QUOTE, content: content.value.trim()})
        }
      }
    }

    newsStore.model.contents = contents;

    const formData = {
      title: newsStore.model.title,
      description: newsStore.model.description,
      image: newsStore.model.image?.id,
      category: newsStore.model.category,
      tags_ids: newsStore.model.tags_ids?.map(tag => tag?.id),
      images_ids: newsStore.model.images_ids?.map(image => image?.id),
      contents: contents,
      status: isDraft ? NEWS_STATUS.DRAFT : NEWS_STATUS.PANDING
    };

    try {
     if (props.newsId) {
      await fetchUpdateMyNews(props.newsId, formData);
      countStore.actionCountList()
    } else {
      await fetchCreateMyNews(formData);
      countStore.actionCountList()
    }

    newsStore.loadingSubmitButton = false
    newsStore.restStore()
    router.push({ name: 'MyNewsList', query: {...router.currentRoute.value.query, activeMenu: 'my-posts'}})
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
   if(filterDynamicFields.filter((item) => item.type === CONTENT_TYPES.TEXT).length < 1){
    dispatchNotify(null, t('error-main-text'), COLOR_TYPES.ERROR)
    return false
  }

  return true
}

const addDynamicField = (type) => {
    newsStore.model.dynamicFields.push({ type, value: type === CONTENT_TYPES.TEXT ? '' : null });
};

const removeDynamicField = (index) => {
  newsStore.model.dynamicFields.splice(index, 1);
};

watch(locale, () => {
  newsStore.actionGetCategoryList()
})

watch(()=>newsStore.model.category, async (val) => {
    await newsStore.actionGetTagList({categories: val})
})

// counter of short description
watch(()=>newsStore.model.description, (val) => {
  countChar.value = val?.length
})

watch(()=>newsStore.model.title, (val) => {
  countCharNewsHeadline.value = val?.length
})

// expose
defineExpose({
  onSubmitForm,
  isValidFormValidation
})

onMounted(() => {
  newsStore.actionGetCategoryList()
  newsStore.actionGetTagList()
})

onUnmounted(() => {
  newsStore.restStore()
})

</script>
<template>
  <div class="form overflow-hidden">
    <base-row>
      <base-col col-class="w-full ">
       <!-- upload image how looks -->
        <div
          class="grid grid-cols-3 gap-4 justify-between mt-2 w-full relative"
          v-if="!!newsStore.model.image?.url || !!newsStore.model.image?.blobUrl"
        >
          <div
            class="aspect-ratio-box rounded-lg overflow-hidden relative h-full w-full"
            :style="{ '--dynamic-src': `url(${newsStore.model.image?.url ? newsStore.model.image?.url : newsStore.model.image?.blobUrl})` }"
          >
            <img :src="newsStore.model.image?.url ? newsStore.model.image?.url : newsStore.model.image?.blobUrl" alt="rasm" class="w-full h-full object-contain absolute z-2" />
          </div>
        </div>
        <label class="block text-sm font-medium text-greyscale-500 my-1">{{ t('main-image') }} <span class="text-red-500"> *</span></label>
        <file-upload
          :multiple="false"
          :files="props.imageFile && [props.imageFile]"
          :allowedFileTypes="allowedImageTypes"
          @emit:file-upload="(val) => { newsStore.model.image = val[0]; $v.image.$model = val[0] || null }"
          @emit:on-file-delete="() => { newsStore.model.image = null; $v.image.$model = null }"
          :error="$v.image"
          :allowed-upload-size="10"
          :allowed-file-info="t('allowed-file-info',{ formats: allowedImageTypes.map(item => item.split('/')[1]).join(', '), size: '10' })"
          />
      </base-col>
      <base-col col-class="w-full pt-6 flex flex-col gap-2">
        <label class="block text-sm font-medium text-greyscale-500" :class="countCharNewsHeadline >= 257 ? 'text-red-500' : ''">{{ t('news-headline',{ count: 256 }) }} <span class="text-red-500"> *</span> {{ !!countCharNewsHeadline ? countCharNewsHeadline : ""  }}</label>
        <base-input
          v-model="$v.title.$model"
          :error="$v.title"
          required
          placeholder="enter-news-headline"
          :maxlength="256"
          />
      </base-col>
      <base-col col-class="w-full flex flex-col gap-2 overflow-hidden">
        <label class="block text-sm font-medium text-greyscale-500" :class="countChar >= 257 ? 'text-red-500' : ''">{{ t('new-short-description',{ count: 256 }) }} <span class="text-red-500"> *</span> {{ !!countChar ? countChar : ""  }}</label>
        <base-textarea
          v-model="$v.description.$model"
          :error="$v.description"
          :required="true" :max-length="256"
          />
      </base-col>
      <!-- dynamic fields -->
      <base-col v-for="(field, index) in newsStore.model.dynamicFields" :key="index"
        class="w-full pt-6 flex gap-2 items-end">
        <div class="w-full relative">
          <label v-if="field.type === CONTENT_TYPES.TEXT" class="block text-sm font-medium text-greyscale-500 mb-2">{{ t('main-text') }}</label>
            <!-- <base-tiny-editor
            :height="500"
            v-if="field.type === CONTENT_TYPES.TEXT"
              v-model="field.value"
              :default-font-size="20"
            /> -->
            <base-froala-editor
              v-if="field.type === CONTENT_TYPES.TEXT"
              v-model="field.value"
            />
            <!-- upload image how looks -->
           <div
            class="grid grid-cols-3 gap-4 justify-between my-2 w-full relative"
             v-if="field.type === CONTENT_TYPES.FILE && allowedImageTypes.some(item => item.includes(field.value?.type))"
            >
              <div
                class="aspect-ratio-box rounded-lg overflow-hidden relative h-full w-full"
                :style="{ '--dynamic-src': `url(${field.value?.url ? field.value?.url : field.value?.blobUrl})` }"
              >
                <img :src="field.value?.url ? field.value?.url : field.value?.blobUrl" alt="rasm" class="w-full h-full object-contain absolute z-2" />
              </div>
            </div>
            <label
              v-if="field.type === CONTENT_TYPES.FILE"
              class="block text-sm font-medium text-greyscale-500 mb-2">
              {{ t('additional-images-videos') }}
          </label>
          <file-upload
            v-if="field.type === CONTENT_TYPES.FILE"
            :multiple="false"
            :files="field.value && [field.value]"
            :allowedFileTypes="allowedFileTypes"
            @emit:file-upload="(val) => field.value = val[0]"
            @emit:on-file-delete="() => field.value = null"
            :allowed-file-info="t('allowed-file-info',{ formats: allowedFileTypes.map(item => item.split('/')[1]).join(', '), size: '200' })"
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
          text="main-text"
          @click="addDynamicField(CONTENT_TYPES.TEXT)"
          class="w-fit" icon-color="warning-500"
        />
        <add-card text="additional-images-videos"
         @click="addDynamicField(CONTENT_TYPES.FILE)"
         class="w-fit" icon-color="success-500"
         />
        <add-card text="quotes"
          @click="addDynamicField(CONTENT_TYPES.QUOTE)"
          class="w-fit" icon-color="critic-500"
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
        <base-multi-select
          v-model="$v.tags_ids.$model"
          wrapper-class="relative"
          api-url="news-tags"
          :error="$v.tags_ids"
          :api-params="{ categories: newsStore.model.category, page_size: 100 }"
          :token-class="['chip-hover shadow-button bg-white cursor-pointer']"
          display="chip"
          selectable
          label="tag"
          type="department"
          placeholder="selectTag"
          list-class="py-3 flex flex-wrap gap-2  w-[836px]"
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
      <!-- upload gallery images how looks -->
      <div
        class="grid grid-cols-3 gap-4 justify-between mt-2 w-full relative"
        :class="newsStore.model.images_ids?.length && 'justify-start'"
        >
      <template v-if="!!newsStore.model.images_ids?.length">
        <template v-for="(item, index) in newsStore.model.images_ids" :key="index">
            <div
                class="aspect-ratio-box rounded-lg overflow-hidden relative h-full w-full"
                :style="{ '--dynamic-src': `url(${item.url ? item.url : item.blobUrl})` }"
              >
              <img :src="item.url ? item?.url : item?.blobUrl" alt="rasm" class="w-full h-full object-contain absolute z-2" />
            </div>
          </template>
        </template>
      </div>
      <base-col col-class="w-full pt-6">
        <label class="block text-sm font-medium text-greyscale-500 mb-2">{{ t('gallery') }}</label>
        <file-upload :multiple="true"
          :files="props.galleryFiles"
          :allowed-upload-size="10"
          :allowedFileTypes="allowedImageTypes"
          @emit:file-upload="(val) => newsStore.model.images_ids = val"
          :allowed-file-info="t('allowed-file-info',{ formats: allowedImageTypes.map(item => item.split('/')[1]).join(', '), size: '10' })"
          />
      </base-col>
      <base-col col-class="w-full pt-6">
        <slot name="footer"></slot>
       </base-col>
    </base-row>
  </div>
</template>
<style scoped>
.aspect-ratio-box {
    aspect-ratio: 3 / 2
}

.aspect-ratio-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: var(--dynamic-src);
  background-size: cover;
  filter: blur(10px);
  background-position: center;
  z-index: 0;
}
</style>
