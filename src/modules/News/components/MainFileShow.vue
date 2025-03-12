<script setup>

import { allowedImageTypes, allowedVideoTypes, allowedAudioTypes } from '../constants';

//props
const props = defineProps({
    file: {
        type: Object,
        default: () => ({})
    },
    class: {
        type: String,
        default: ''
    }
})  

</script>
<template>
    <div class="rounded-2xl overflow-hidden mt-3 relative" :class="{'h-fit': allowedAudioTypes.some(item => item.includes(props.file?.type))}, props.class"  >
        <div 
        v-if="allowedImageTypes.some(item => item.includes(props.file?.type))"
         class="rounded-lg overflow-hidden aspect-ratio-box relative" 
         :style="{ '--dynamic-src': `url(${props.file?.url ? props.file?.url : props.file?.blobUrl})` }"
        >
            <img :src="props.file?.url ? props.file?.url : props.file?.blobUrl" alt="rasm" class="w-full h-full object-contain absolute z-2" />
        </div>        
        <div v-if="allowedAudioTypes.some(item => item.includes(props.file?.type))" class="text-sm text-greyscale-500 mt-2">
            <audio :src="props.file.url ? props.file.url : props.file.blobUrl" controls>{{ props.file?.name }}</audio>
            <span class="pl-3">{{ props.file?.name }}</span>
        </div>
        <video v-if="allowedVideoTypes.some(item => item.includes(props.file?.type))" :src="props.file.url ? props.file.url : props.file.blobUrl" controls class="w-full h-full object-cover"></video>
    </div>
    <!-- <div v-if="allowedVideoTypes.some(item => item.includes(props.file?.type))" class="text-sm text-greyscale-500 mt-2 pl-3" >{{ props.file?.name }}</div> -->
</template>

<style scoped>
.aspect-ratio-box {
    aspect-ratio: 3 / 2
}

.aspect-ratio-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;  
  width: 100%;
  height: 100%;
  background-image: var(--dynamic-src);
  background-size: cover;
  filter: blur(10px);
  background-position: center; 
  z-index: 0;
}
</style>