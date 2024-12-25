<script setup >
// core
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
// component 
import BaseDialog from '@/components/UI/BaseDialog.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import BaseSpinner from '@/components/UI/BaseSpinner.vue';
import UserCard from './UserCard.vue';
import Tag from './Tag.vue';
import Swiper from './Swiper.vue';
import TitleComponent from './Title.vue';
import MainFileShow from './MainFileShow.vue';
import Queto from './Queto.vue';
import ShortDescription from './ShortDescription.vue';
import RejectNewsDialog from './RejectNewsDialog.vue';
// contants
import { CONTENT_TYPES } from '../constants';
// composibles
import { useGetOneNewsModal } from '../composibles/useGetOneNewsModal';
// services
import { fetchGetMyNews, fetchGetPendingNews } from '../services/news.service';

// props  
const props = defineProps({
    data: { 
      type: Object, required: true 
    },
    id: {
      type: [String, Number],
      required: true
    },
    modelValue: {
      type: Boolean,
    },
    onModeration: {
      type: Function,
    },
    onRejectModeration: {
      type: Function,
    },
    isLoadingReject: {
      type: Boolean,
      default: false
    },
    isLoadingModeration: {
      type: Boolean
    },
    type: {
      type: String,
      default:"show",
      validator(value) {
        return ['show', 'moderation'].includes(value)
      } 
    }
  })

const { newsOne, getNewsOne, loading} = useGetOneNewsModal()
const footerClasses = computed(() => props.type === 'moderation' ? '!py-4': 'hidden' )
// internalitaion
const { t } = useI18n()
// reactive
const isRejectModalVisible = ref(false)
// emits
const emit = defineEmits(['update:modelValue'])
// methods
const handleModeration = async () => {
  props.onModeration && props.onModeration()
  emit('update:modelValue', false)
}
const handleRejectModeration = async () => {
  isRejectModalVisible.value = true
}

const dynamicFieldsFilter = computed(() => 
  newsOne.dynamicFields.filter((item) => !!item.value)
);

onMounted(() => {
  if(!!props.id){
    getNewsOne(props.type === 'moderation' ? fetchGetPendingNews : fetchGetMyNews, props.id)
  }
})

</script>
<template>
    <base-dialog
    :label="t('preview-news')"
    maxWidth="!w-[904px]"
    :modelValue="modelValue" @update:modelValue="val => $emit('update:modelValue', val)" 
    header-classes="h-[68px]"
    :footer-classes="footerClasses"
    :content-classes="`pt-0 ${props.type === 'show' && '!rounded-b-[15px]'}`"
    >

      <template #content>
        <template v-if="loading">
            <div class="h-[200px]">
              <base-spinner />  
            </div>
        </template>
        <template v-else>
          <main-file-show :file="newsOne.image"/>
          <user-card :name="newsOne.created_by?.full_name" :created-date="newsOne.created_date" :category="newsOne.category" class="mt-4"/>
          <title-component :title="newsOne.title" class="mt-4 mb-5"/>
          <short-description wrap-class="text-greyscale-800 text-xl !mt-0" :text="newsOne.description"/>
          <template v-for="(field, index) in dynamicFieldsFilter" :key="index">
            <div v-if="field.type === CONTENT_TYPES.TEXT" v-html="field.value" class="mt-4 text-greyscale-800"></div>
            <div v-if="field.type === CONTENT_TYPES.QUOTE">
              <queto :text="field.value" class="my-10"/>
            </div>
            <div v-if="field.type === CONTENT_TYPES.FILE">
              <main-file-show :file="field.value" class="mt-3"/>
            </div>
          </template>
          <Swiper v-if="newsOne.images_ids.length" :images="newsOne.images_ids" />
          <Tag v-if="newsOne.tags_ids.length" :tags="newsOne.tags_ids" class="pointer-events-none" />
        </template>
      </template>
      <template #footer>
        <template v-if="type === 'moderation'">
          <base-button
            :disabled="props.isLoadingModeration"
            label="refuse"
            rounded
            outlined
            shadow
            color="!text-critic-500"
            border-color="border-transparent"
            @click="handleRejectModeration"
          />
          <base-button
            :loading="props.isLoadingModeration"
            label="publish"
            rounded
            shadow
            @click="handleModeration"
          />
        </template>
      </template>
    </base-dialog>
    <reject-news-dialog  
      header-lable="reject-news-reason"
      v-model="isRejectModalVisible"
      :createButtonFn="props.onRejectModeration"
      :loading="props.isLoadingReject"
      max-width="max-w-[700px]"
      />
</template>
