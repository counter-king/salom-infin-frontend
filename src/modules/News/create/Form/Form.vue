<script setup>
// Core
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n'
import { useVuelidate } from "@vuelidate/core"
// Components
import BaseCol from '@/components/UI/BaseCol.vue';
import BaseRow from '@/components/UI/BaseRow.vue';
import BaseDropdown from '@/components/UI/BaseDropdown.vue';
import BaseInput from '@/components/UI/BaseInput.vue';
import BaseTextarea from '@/components/UI/BaseTextarea.vue'
import BaseMultiSelect from '@/components/UI/BaseMultiSelect.vue';
import AddCard from '../components/AddCard.vue';
import BaseFroalaEditor from '@/components/UI/BaseFroalaEditor.vue';
import FileUpload from '../components/FileUpload.vue';
import BaseIconify from '@/components/UI/BaseIconify.vue';
import {UserWithRadio} from "@/components/Users"
//icons
import { TrashBinBoldIcon } from '@/components/Icons';
//stores
import { useNewsStore } from '../../stores';
import { dispatchNotify } from '@/utils/notify';
import { COLOR_TYPES } from '@/enums';
// services
import { fetchCreateNews } from '../../services/news.service';
// constants
import {  allowedAudioTypes, allowedFileTypes, allowedImageTypes, allowedVideoTypes, CONTENT_TYPES } from '../../constants';
import { useRouter } from 'vue-router';

const newsStore = useNewsStore()
const router = useRouter()
// Macros
const props = defineProps({
  model: {
    type: Object,
    default: () => ({
        title: null,
        description: null,
        category: null,
        image: null,
        dynamicFields: [], 
        tags_ids:[],
        images_ids: [],
    })
  },
  imageFile: {
    type: Object,
    default: null
  },
  galleryFiles: { type: Array, default: () => [] }
})
const { t } = useI18n()


// form validation
const $v = useVuelidate(newsStore.rules, newsStore.model)


</script>
<template>
  <div class="">
    <base-row>
      <base-col col-class="w-full">
        <file-upload 
          :multiple="false" 
          :files="props.imageFile && [props.imageFile]" 
          :allowedFileTypes="allowedImageTypes"
          @emit:file-upload="(val) => newsStore.model.image = val[0]" 
          :error="$v.image"
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
      <base-col col-class="w-full flex flex-col gap-2">
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
            :allowedFileTypes="['image/png', 'image/jpeg', 'image/jpg']"
            @emit:file-upload="(val) => newsStore.model.images_ids = val"
            />
      </base-col>
      <!-- dynamic fields -->
      <base-col v-for="(field, index) in newsStore.model.dynamicFields" :key="index"
        class="w-full pt-6 flex gap-2 items-end">
        <div class="w-full">
          <label v-if="field.type === CONTENT_TYPES.TEXT" class="block text-sm font-medium text-greyscale-500 mb-2">{{ t('definition') }}</label>
          <base-froala-editor v-if="field.type === CONTENT_TYPES.TEXT" v-model="field.value" />

          <label v-if="field.type === CONTENT_TYPES.FILE" class="block text-sm font-medium text-greyscale-500 mb-2">{{ t('image') }}</label>
          <file-upload v-if="field.type === CONTENT_TYPES.FILE" :multiple="false" :files="field.value"
            :allowedFileTypes="allowedFileTypes"
            @emit:file-upload="(val) => field.value = val[0]" />
            
          <base-textarea v-if="field.type === CONTENT_TYPES.QUOTE" v-model="field.value" :label="t('quotes')"  :placeholder="t('enter-quotes')" />

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
        <add-card text="definition" @click="addDynamicField(CONTENT_TYPES.TEXT)" class="w-fit" icon-color="warning-500" />
        <add-card text="image" @click="addDynamicField(CONTENT_TYPES.FILE)" class="w-fit" icon-color="info-500" />
        <add-card text="quotes" @click="addDynamicField(CONTENT_TYPES.QUOTE)" class="w-fit" icon-color="critic-500" />
      </base-col>
    </base-row>
  </div>
</template>
