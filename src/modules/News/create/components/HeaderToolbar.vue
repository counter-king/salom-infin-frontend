<script setup>
// Core
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
// Components
import BaseButton from '@/components/UI/BaseButton.vue'
import { ActionToolbar } from '@/components/Actions'
import BaseInput from '@/components/UI/BaseInput.vue'
import BackButton from '@/components/Actions/BackButton.vue'
import DialogPreview from './DialogPreview.vue'
//Icons

// reactive
const dialogisOpen = ref(false) 
const { t } = useI18n()

// props
const props = defineProps({
  onSubmitForm: {
    type: Function,
    required: true
  }
})

</script>
<template>
    <div class="flex justify-between">
      <div class="flex gap-3 items-center">
        <back-button />
        <h2 class="text-xl font-semibold text-greyscale-900">{{ t('createNews') }}</h2>
      </div>
      <div class="">
        <base-button @click="()=> dialogisOpen=true" button-class="!px-4 !py-3 text-xs rounded-[120px]" :label="t('publish')"/>
      </div>
    </div>
    <dialog-preview v-model="dialogisOpen" :onSubmitForm="props.onSubmitForm"/>
    
</template>
