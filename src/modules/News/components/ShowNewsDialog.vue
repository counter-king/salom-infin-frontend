<script setup >
// core
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
// component 
import BaseDialog from '@/components/UI/BaseDialog.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import UserCard from './UserCard.vue';
import Tag from './Tag.vue';
import Swiper from './Swiper.vue';
import TitleComponent from './Title.vue';
import MainFileShow from './MainFileShow.vue';
import Queto from './Queto.vue';
import ShortDescription from './ShortDescription.vue';
// contants
import { CONTENT_TYPES } from '../constants';
// composibles
import { useGetOneNewsModal } from '../composibles/useGetOneNewsModal';
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
      type: Boolean
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


const { newsOne, getNewsOne } = useGetOneNewsModal(props.data)
const footerClasses = computed(() => props.type === 'moderation' ? '!py-4': 'hidden' )
// internalitaion
const { t } = useI18n()
// emits
const emit = defineEmits(['update:modelValue'])
// methods
const handleModeration = async () => {
  props.onModeration && props.onModeration()
  emit('update:modelValue', false)
}
const handleRejectModeration = async () => {
  props.onRejectModeration && props.onRejectModeration()
}

const dynamicFieldsFilter = computed(() => 
  newsOne.dynamicFields.filter((item) => !!item.value)
);

onMounted(() => {
  getNewsOne(props.id)
})

</script>
<template>
    <base-dialog
    :label="t('preview-news')"
    :dismissableMask="true"
    maxWidth="!w-[904px]"
    :modelValue="modelValue" @update:modelValue="val => $emit('update:modelValue', val)" 
    header-classes="h-[68px]"
    :footer-classes="footerClasses"
    :content-classes="`pt-0 ${props.type === 'show' && '!rounded-b-[15px]'}`"
    >
     <template #content>
        <main-file-show :file="newsOne.image"/>
        <user-card :name="newsOne.created_by?.full_name" :created-date="newsOne.created_date" :category="newsOne.category" class="mt-4"/>
        <title-component :title="newsOne.title" class="mt-4 mb-5"/>
        <short-description wrap-class="text-greyscale-900 text-xl !mt-0" :text="newsOne.description"/>
        <template v-for="(field, index) in dynamicFieldsFilter" :key="index">
          <div v-if="field.type === CONTENT_TYPES.TEXT" v-html="field.value" class="mt-4"></div>
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
      <template #footer>
        <template v-if="type === 'moderation'">
          <base-button
            :loading="props.isLoadingReject"
            label="cancel"
            rounded
            outlined
            shadow
            color="!text-critic-500"
            border-color="border-transparent"
            @click="handleRejectModeration(props.id)"
          />
          <base-button
            :loading="props.isLoadingModeration"
            label="publish"
            rounded
            shadow
            @click="handleModeration(props.id)"
          />
        </template>
      </template>
    </base-dialog>
</template>
