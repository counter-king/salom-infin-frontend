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

const newsStore = useNewsStore()
// Macros
const props = defineProps({})
const { t } = useI18n()

// reactive
const loading = ref(false)

// form validation
const $v = useVuelidate(newsStore.rules, newsStore.model)

// methods
const onSubmitForm = async () => {
  const valid = await $v.value.$validate()
  if (!valid) return true

  // at least one field must be added
  if (!newsStore.model.dynamicFields.length){
      dispatchNotify(null, t('error-desciption-field'), COLOR_TYPES.ERROR)
      return true
  }
  
  try {
    newsStore.loadingSubmitButton = true
    // api request
  }
  catch (error) { }
  finally {
    newsStore.loadingSubmitButton = false
  }
}

const addDynamicField = (type) => {
  newsStore.model.dynamicFields.push({ type, value: null });
};

const removeDynamicField = (index) => {
  newsStore.model.dynamicFields.splice(index, 1);
};

// watch
watch(() => newsStore.model.dynamicFields, (newValue) => {
  console.log(newValue);
},
{
    deep: true
});


onMounted(() => {
  newsStore.actionGetCategoryList()
  newsStore.actionGetTagList()
})

// expose
defineExpose({
  onSubmitForm
})
</script>
<template>
  <div class="">
    <base-row>
      <base-col col-class="w-full">
        <file-upload 
          :multiple="false" 
          :files="props.files" :allowedFileTypes="['image/png', 'image/jpeg', 'image/jpg']"
          @emit:file-upload="(val) => newsStore.model.image = val" 
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
          <file-upload :multiple="true" :files="props.files"
            :allowedFileTypes="['image/png', 'image/jpeg', 'image/jpg']"
            @emit:file-upload="(val) => newsStore.model.images_ids = val"
            />
      </base-col>
      <!-- dynamic fields -->
      <base-col v-for="(field, index) in newsStore.model.dynamicFields" :key="index"
        class="w-full pt-6 flex gap-2 items-end">
        <div class="w-full">
          <label v-if="field.type === 'description'" class="block text-sm font-medium text-greyscale-500 mb-2">{{ t('definition') }}</label>
          <base-froala-editor v-if="field.type === 'description'" v-model="field.value" />
          
          <label v-if="field.type === 'file-upload'" class="block text-sm font-medium text-greyscale-500 mb-2">{{ t('image') }}</label>
          <file-upload v-if="field.type === 'file-upload'" :multiple="false" :files="field.value"
            :allowedFileTypes="['image/png', 'image/jpeg', 'image/jpg']"
            @emit:file-upload="(val) => field.value = val" />
          
          <base-input v-if="field.type === 'quotes'" v-model="field.value" :label="t('quotes')"  :placeholder="t('enter-quotes')" />
             
          <label v-if="field.type === 'file-upload-multiple'" class="block text-sm font-medium text-greyscale-500 mb-2">{{ t('gallery') }}</label>
          <file-upload v-if="field.type === 'file-upload-multiple'" :multiple="true" :files="field.value"
            :allowedFileTypes="['image/png', 'image/jpeg', 'image/jpg']"
            @emit:file-upload="(val) => field.value = val" />

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
        <add-card text="definition" @click="addDynamicField('description')" class="w-fit" icon-color="warning-500" />
        <add-card text="image" @click="addDynamicField('file-upload')" class="w-fit" icon-color="info-500" />
        <add-card text="quotes" @click="addDynamicField('quotes')" class="w-fit" icon-color="critic-500" />
      </base-col>
    </base-row>
  </div>
</template>
