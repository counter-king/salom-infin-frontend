<script setup>
// core
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';

const { t } = useI18n();

const props = defineProps({
  link: {
   type: String
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
      <h3 class="text-sm font-semibold text-greyscale-900 capitalize">{{t('title')}}</h3>
      <a :href="props.link" target="_blank" class="text-xs text-primary-500" >{{ props.link }}</a>
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