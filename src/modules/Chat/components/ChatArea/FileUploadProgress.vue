<script setup>
// components
import { XMarkSolidIcon } from '@/components/Icons';
// stores
import { useChatStore } from '../../stores';

// props
const props = defineProps({
  file: {
    type: Object,
    default: null
  },
  progress: {
    type: Number,
    default: 0
  },
  index: {
    type: Number,
  }
})

const chatStore = useChatStore();

const onCancelUploadFileRequest = (index) => {  
  props.file.abortController.abort();
  chatStore.uploadingFiles.splice(index, 1);
}

</script>
<template>
 <div
   class="shodow flex gap-4 items-center py-2 px-4 bg-white rounded-xl"
   v-if="props.progress + 1 != 100"
   >
   <span class="text-sm font-medium text-greyscale-500">{{props.progress}}%</span>
   <div class="w-full h-1 min-h-1 max-h-1 bg-greyscale-100 rounded-lg">
    <div 
      class="h-1 min-h-1 max-h-1 bg-success-500 rounded-lg"
      :style="`width: ${props?.progress == 0 ? 0 : props.progress + 1}%`"
     ></div>
   </div>
   <div @click="onCancelUploadFileRequest(props.index)" class="p-2 rounded-full bg-critic-50 cursor-pointer">
    <base-iconify :icon="XMarkSolidIcon" class="!w-3 !h-3 text-critic-300" />
   </div>
 </div>
</template>
<style scoped>
.shodow {
  box-shadow: 0px 2px 4px 0px rgba(47, 61, 87, 0.03), 0px 1px 1px 0px rgba(95, 110, 169, 0.03);
}
</style>