<script setup>
// core
import { useI18n } from 'vue-i18n';
import { downloadFile } from '../services/file.service';

const { t } = useI18n();

const props = defineProps({
  message: {
   type: Object,
  },
  rightIcon: {
   name: {
    type: String,
   },
   class: {
    type: String,
   }
  },
  leftIcon: {
   name: {
    type: String,
   },
   class: {
    type: String,
   }
  },
})
</script>
<template>
 <div 
   class="flex gap-4 items-center p-2 pr-1 group hover:bg-greyscale-50 cursor-pointer rounded-xl"
   @click.stop
   >
    <div  @click="downloadFile(props.message?.attachments[0]?.file)"  class="p-[10px] group-hover:bg-white bg-greyscale-50 rounded-lg">
      <base-iconify 
       :icon="props.leftIcon.name"
       class="!h-5 !w-5" 
       :class="props.leftIcon.class"
       />
    </div>
    <div class="grow flex flex-col gap-1 select-none">
      <h3 class="text-sm font-semibold text-greyscale-900 capitalize line-clamp-1 max-w-[188px]">{{t(props.message?.text) }}</h3>
      <!-- <p class="text-xs text-greyscale-500">{{ t('chat-info-file',{count: props.file.count}) }}</p> -->
    </div>
    <div class="p-2" @click="downloadFile(props.message?.attachments[0]?.file)" >
      <slot name="right-icon">
        <base-iconify 
        v-if="!!props.rightIcon"
        :icon="props.rightIcon.name"
        class="!h-5 !w-5" 
        :class="props.rightIcon.class"
        />
      </slot>
    </div>
 </div>
</template>