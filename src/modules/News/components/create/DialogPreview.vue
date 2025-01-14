<script setup >
// core
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
// component 
import BaseDialog from '@/components/UI/BaseDialog.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import UserCard from '../../components/UserCard.vue';
import Tag from '../../components/Tag.vue';
import Swiper from '../../components/Swiper.vue';
import TitleComponent from '../Title.vue';
import MainFileShow from '../MainFileShow.vue';
import Queto from '../Queto.vue';
import ShortDescription from '../ShortDescription.vue';
import RejectNewsDialog from '../RejectNewsDialog.vue';
// stores
import { useNewsStore } from '../../stores';
import { useAuthStore } from '@/modules/Auth/stores';
// contants
import { CONTENT_TYPES } from '../../constants';
import { NEWS_STATUS } from '../../enums';
// services
import { fetchCreateNewsModerationHistory } from '../../services/news.service';
// props  
const props = defineProps({
    modelValue: {
        type: Boolean,
      },
    onSubmitForm: {
      type: Function,
      required: true
    }
    })

const route = useRoute()
const authStore = useAuthStore()
const newsStore = useNewsStore()
// internalitaion
const { t } = useI18n()
// reactive
const isRejectModalVisible = ref(false)
const isLoadingRejectModeration = ref(false)
const userProfile = computed(() => authStore.getCurrentUser)
// emits
const emit = defineEmits(['update:modelValue'])

// methods
const handlePublish = async () => {
  props.onSubmitForm()

  if(!newsStore.loadingSubmitButton){
      emit('update:modelValue', false)
  } 
}

const handleRejectDialog = () => {
  if(newsStore.model.status === NEWS_STATUS.DECLINED){
    isRejectModalVisible.value = true
  } else {
    handlePublish()
  }
}


const dynamicFieldsFilter = computed(() => 
  newsStore.model.dynamicFields.filter((item) => !!item.value)
);

const handleRejectModeration = async (reason)=> {
  isLoadingRejectModeration.value = true
  try {
    await fetchCreateNewsModerationHistory({ news: route.params.id, status: NEWS_STATUS.PANDING, description: reason })
    isRejectModalVisible.value = false
    await handlePublish()
  }
  finally {
    isLoadingRejectModeration.value = false
  }
}

</script>
<template>
    <base-dialog
    :label="t('preview-news')"
    maxWidth="!w-[904px]"
    :modelValue="modelValue" @update:modelValue="val => $emit('update:modelValue', val)" 
    >
    <template #content>
      <main-file-show :file="newsStore.model.image"/>
      <user-card :name="userProfile?.full_name" :info="userProfile.top_level_department?.name" class="mt-4"/>
      <title-component :title="newsStore.model.title" class="mt-4 mb-5"/>
      <short-description wrap-class="text-greyscale-800 text-xl !mt-0" :text="newsStore.model.description"/>
      <template v-for="(field, index) in dynamicFieldsFilter" :key="index">
        <div v-if="field.type === CONTENT_TYPES.TEXT" v-html="field.value" class="mt-4 text-greyscale-800"></div>
        <div v-if="field.type === CONTENT_TYPES.QUOTE">
          <queto :text="field.value" class="my-10"/>
        </div>
        <div v-if="field.type === CONTENT_TYPES.FILE">
          <main-file-show :file="field.value" class="mt-3"/>
        </div>
      </template>
      <Swiper v-if="newsStore.model.images_ids.length" :images="newsStore.model.images_ids" />
      <Tag v-if="newsStore.model.tags_ids.length" :tags="newsStore.model.tags_ids" class="pointer-events-none" />
    </template>
    <template #footer>
      <base-button
        label="cancel"
        :disabled="newsStore.loadingSubmitButton"
        rounded
        outlined
        shadow
        color="text-primary-900"
        border-color="border-transparent"
        @click="$emit('update:modelValue', val)"
      />
      <base-button
        :loading="newsStore.loadingSubmitButton"
        label="submit-for-moderation"
        rounded
        @click="handleRejectDialog"
      />
    </template>
    </base-dialog>
    <reject-news-dialog  
      header-lable="reply-to-moderator"
      v-model="isRejectModalVisible"
      :createButtonFn="handleRejectModeration"
      :loading="isLoadingRejectModeration"
      max-width="max-w-[700px]"
      type="answer"
      />
</template>
