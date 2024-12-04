<script setup >
// core
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
// component 
import BaseDialog from '@/components/UI/BaseDialog.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import UserCard from '../../components/UserCard.vue';
import Tag from '../../show/components/Tag.vue';
import Swiper from '../../show/components/Swiper.vue';
import TitleComponent from './Title.vue';
import MainFileShow from './MainFileShow.vue';
import Queto from './Queto.vue';
// stores
import { useNewsStore } from '../../stores';
import { useAuthStore } from '@/modules/Auth/stores';

// contants
import { CONTENT_TYPES } from '../../constants';

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

const authStore = useAuthStore()
const newsStore = useNewsStore()
const userProfile = computed(() => authStore.getCurrentUser)

// internalitaion
const { t } = useI18n()

// emits
const emit = defineEmits(['update:modelValue'])


// methods
const handlePublish = async () => {
  props.onSubmitForm()

  if(!newsStore.loadingSubmitButton){
      emit('update:modelValue', false)
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
      <div v-html="newsStore.model.description" ></div>
      <template v-for="(field, index) in newsStore.model.dynamicFields" :key="index">
        <div v-if="field.type === CONTENT_TYPES.TEXT" v-html="field.value" class="mt-4"></div>
        <div v-if="field.type === CONTENT_TYPES.QUOTE">
          <queto :text="field.value" class="my-10"/>
        </div>
        <div v-if="field.type === CONTENT_TYPES.FILE">
          <main-file-show :file="field.value" class="mt-3"/>
        </div>
      </template>
      <Swiper v-if="newsStore.model.images_ids.length" :images="newsStore.model.images_ids" />
      <Tag v-if="newsStore.model.tags_ids.length" :tags="newsStore.model.tags_ids" />
    </template>
    <template #footer>
      <base-button
        label="cancel"
        rounded
        outlined
        shadow
        color="text-primary-900"
        border-color="border-transparent"
        @click="$emit('update:modelValue', val)"
      />
      <base-button
        :loading="newsStore.loadingSubmitButton"
        label="publish"
        rounded
        @click="handlePublish"
      />
    </template>
    </base-dialog>
</template>