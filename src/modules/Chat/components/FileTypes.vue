<script setup>
// cores
import { ChevronUp20SolidIcon, ClapperboardPlayBoldIcon, DocumentsMinimalisticBoldIcon, FileTextBoldIcon, GalleryBoldIcon, GalleryIcon } from '@/components/Icons';
import { useI18n } from 'vue-i18n';
// components
import FileItem from './FileItem.vue';
import { COMPONENT_TYPES } from '../constatns';
// utils
const { t } = useI18n();
// props
const props = defineProps({
 onClickFun: {
  type: Function
 }
})

</script>
<template>
  <div class="flex flex-col gap-4 p-4">
   <!--title -->
   <div class="flex justify-between mb-1">
     <span class="text-sm font-medium text-greyscale-500">{{ t('file-types') }}</span>
     <base-iconify
       :icon="MenuDotsBoldIcon"
       class="text-greyscale-300 cursor-pointer transform rotate-90"
     />
   </div>
   <!-- data -->
   <div class="flex flex-col gap-1">
     <FileItem 
      @click="()=>props.onClickFun(COMPONENT_TYPES.DOCUMENTS)"
      :info="{
       title: 'documents',
       count: 4,
       size: '11'
      }"
      :left-icon="{ name: FileTextBoldIcon, class: 'text-warning-500' }"
      :right-icon="{ name: ChevronUp20SolidIcon, class: 'text-greyscale-500 transform rotate-90' }"
     />
     <FileItem 
      @click="()=>props.onClickFun(COMPONENT_TYPES.VIDEOS)"
      :info="{
        title: 'video',
        count: 4,
        size: '11'
       }"
       :left-icon="{ name: ClapperboardPlayBoldIcon, class: 'text-success-500' }"
       :right-icon="{ name: ChevronUp20SolidIcon, class: 'text-greyscale-500 transform rotate-90' }"
     />
     <FileItem 
      @click="()=>props.onClickFun(COMPONENT_TYPES.IMAGES)"
      :info="{
         title: 'images',
         count: 4,
         size: '11'
        }"
      :left-icon="{ name: GalleryBoldIcon, class: 'text-critic-500' }"
      :right-icon="{ name: ChevronUp20SolidIcon, class: 'text-greyscale-500 transform rotate-90' }"
     />
   </div>
  </div>
</template>