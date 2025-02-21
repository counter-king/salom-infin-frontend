<script setup>
// Core
import { ClapperboardPlayBoldIcon, FileTextBoldIcon, GalleryBoldIcon } from '@/components/Icons';
import BaseIconify from '@/components/UI/BaseIconify.vue';
// Macros
const props = defineProps({
  type: {
    type: String,
    default: 'file',
    validator: (value) => {
      return ['file', 'image', 'audio', 'video'].includes(value)
    }
  }
})
const iconList = {
 file: {class: 'text-warning-500', name:FileTextBoldIcon},
 image: {class: 'text-critic-500', name:GalleryBoldIcon},
 audio: {class: 'text-greyscale-500', name:FileTextBoldIcon},
 video: {class: 'text-success-500', name:ClapperboardPlayBoldIcon},
}
</script>
<template>
 <template v-if="iconList[props.type]">
  <BaseIconify 
  :icon="iconList[props.type].name"
  class="!w-4 !h-4"
  :class="iconList[props.type].class"
  />
 </template>
</template>