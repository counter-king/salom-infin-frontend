<script setup>

import { allowedImageTypes, allowedVideoTypes, allowedAudioTypes } from '../../constants';

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
    <div class="w-[840px] min-w-[840px] h-[382px] rounded-2xl overflow-hidden mt-3" :class="{'h-fit': allowedAudioTypes.some(item => item.includes(props.file?.type))}, props.class"  >
        <img v-if="allowedImageTypes.some(item => item.includes(props.file?.type))" :src="props.file.url" alt="rasm" class="w-full h-full object-cover" >  
        <div v-if="allowedAudioTypes.some(item => item.includes(props.file?.type))" class="text-sm text-greyscale-500 mt-2">
            <audio :src="props.file.url" controls>{{ props.file?.name }}</audio>
            <span class="pl-3">{{ props.file?.name }}</span>
        </div>
        <video v-if="allowedVideoTypes.some(item => item.includes(props.file?.type))" :src="props.file.url" controls class="w-full h-full object-cover"></video>
    </div>
    <div v-if="allowedVideoTypes.some(item => item.includes(props.file?.type))" class="text-sm text-greyscale-500 mt-2 pl-3" >{{ props.file?.name }}</div>
</template>