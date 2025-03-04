<script setup>
// core
import { onMounted, ref, useAttrs } from 'vue';
// components
import ClickedStiker from './ClickedStiker.vue';
// contants
import { formatHour } from '@/utils/formatDate';
// utils
import { dispatchNotify } from '@/utils/notify';
// enums
import { COLOR_TYPES } from '@/enums';
import { fetchBlobFile } from '@/services/file.service';
import Galleria from 'primevue/galleria';
// store
import { useChatStore } from '../../stores';
import { MESSAGE_TYPES } from '../../constatns';
// services

const chatStore = useChatStore();

const props = defineProps({
  message: {
    type: Object
  },
  handleClickEmoji: {
    type: Function
  },
  onShowEmojiContextMenu: {
    type: Function
  },
  onShowContextMenu: {
    type: Function
  },
  uploaded: {
    type: Boolean,
    default: false
  },
  index: {
    type : Number
  },
  classNames: {
    type: [String , Array, Object] 
  }
})
// reactives
const loading = ref(false);
const activeIndex = ref(0);
const isGalleriaVisible = ref(false);
const forwardedRef = ref(null);
const attrs = useAttrs();

onMounted(async() => {
  if(!props.message?.attachments?.file?.url){    
    try {
      loading.value = true;
      const { blobUrl } = await fetchBlobFile(props.message?.attachments?.file?.id);
      chatStore.messageListByChatId[props.index].attachments.file.url = blobUrl;  
    } catch (error) {
      dispatchNotify(null, error, COLOR_TYPES.ERROR)
    }
    finally {
      loading.value = false
    }
  }
})

defineExpose({
  forwardedRef
})

</script>
<template>
 <div 
  class="flex gap-2 justify-end"
  :class="classNames"
  v-bind="attrs"
  ref="forwardedRef"
  >
   <div class="flex gap-3">
     <p class="text-xs font-medium text-greyscale-500 self-end">{{ formatHour(props.message?.created_date) }}</p>
     <div class="flex flex-col gap-2">
      <!-- image -->
      <div
        @click="isGalleriaVisible = true"
        @contextmenu.prevent="(e)=>props.onShowContextMenu(e, props.message)"
        class="cursor-pointer rounded-xl max-w-[300px] min-w-[64px] gap-2 p-2 bg-white"
        >
        <BaseSpinner 
          v-if="loading"
          class="!w-4 !h-4 text-greyscale-500" 
        />
         <img
          v-else
           :src="props.message?.attachments?.file?.url"
           class="w-full h-full object-cover rounded-lg"
         />
      </div>
      <!-- reactions -->
      <div v-if="props.message?.reactions && Object.keys(props.message.reactions).length" class="flex gap-1">
        <template v-for="reaction in Object.keys(props.message.reactions)" :key="reaction">
          <ClickedStiker 
            @click="props.handleClickEmoji(reaction, message.message_id)"
            :onContextMenuClick="(e)=>props.onShowEmojiContextMenu(e, props.message.reactions[reaction])" 
            :emoji="reaction"
            :userReactionList="props.message.reactions[reaction]" 
           />
        </template>
      </div>
     </div>
   </div>
 </div>
  <Galleria 
    v-model:activeIndex="activeIndex"
    v-model:visible="isGalleriaVisible"
    :value="chatStore.messageListByChatId?.filter(item=>item?.message_type == MESSAGE_TYPES.IMAGE)?.map(item=>item?.attachments?.file?.url)"
    containerStyle="max-width: 850px"
    :circular="true" :fullScreen="true"
    :showItemNavigators="true"
    :showThumbnails="false"
    >
    <template #item="slotProps">
      <div class="h-[500px] rounded-xl overflow-hidden">
        <img
          :src="slotProps.item"
          :alt="slotProps.item?.alt"
          class="w-full h-full object-contain"
        />
      </div>
    </template>
  </Galleria>
</template>
<style scoped>
</style>