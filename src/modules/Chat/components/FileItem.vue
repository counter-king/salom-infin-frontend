<script setup>
// core
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  info: {
   type: Object,
   default: () => ({
    title: '',
    count: 0,
    size: 0 
   })
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
   >
    <div class="p-[10px] group-hover:bg-white bg-greyscale-50 rounded-lg">
      <base-iconify 
       :icon="props.leftIcon.name"
       class="!h-5 !w-5" 
       :class="props.leftIcon.class"
       />
    </div>
    <div class="grow flex flex-col gap-1 select-none">
      <h3 class="text-sm font-semibold text-greyscale-900 capitalize">{{t(props.info.title) }}</h3>
      <p class="text-xs text-greyscale-500">{{ t('chat-info-file',{count: props.info.count, size: props.info.size}) }}</p>
    </div>
    <slot name="right-icon">
     <base-iconify 
       v-if="!!props.rightIcon"
       :icon="props.rightIcon.name"
        class="!h-5 !w-5" 
       :class="props.rightIcon.class"
       />
    </slot>
 </div>
</template>