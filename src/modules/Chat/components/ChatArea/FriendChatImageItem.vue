<script setup>
// core
import { onMounted, ref, useAttrs } from 'vue';
import { useI18n } from 'vue-i18n';
// components
import ClickedStiker from './ClickedStiker.vue';
// contants
import { formatHour } from '@/utils/formatDate';
// utils
import { dispatchNotify } from '@/utils/notify';
// enums
import { COLOR_TYPES } from '@/enums';
import { fetchBlobFile } from '@/services/file.service';
// store
import { useChatStore } from '../../stores';
import { MESSAGE_TYPES } from '../../constatns';
import { PenBoldIcon } from '@/components/Icons';
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
  handleClickImage : {
    type: Function
  },
  uploaded: {
    type: Boolean,
    default: false
  },
  index: {
    type : Number
  },
  avatarVisible: {
    type: Boolean,
    default: false
  },
  classNames: {
    type: [String , Array, Object] 
  }
})

const { t } = useI18n();
// reactives
const loading = ref(false);
const attrs = useAttrs();
const forwardedRef = ref(null);


defineExpose({
  forwardedRef
})

onMounted(async() => {
  if(props.message?.attachments?.file?.id){
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
</script>
<template>
 <div 
  v-bind="attrs"
  ref="forwardedRef"
  class="flex gap-2"
  :class="classNames"
  >
  <base-avatar 
    :image="props.message?.sender?.avatar?.url"
    :label="props.message?.sender?.first_name"
    :color="props.message?.sender?.color"
    avatar-classes="w-8 h-8"
    :class="{'!visible': props.avatarVisible, '!invisible': !props.avatarVisible}"
   />
   <div class="flex flex-col gap-2">
    <div class="flex gap-3">
      <!-- images -->
      <div 
        @contextmenu.prevent="(e)=>props.onShowContextMenu(e, props.message)"
        class="flex flex-col gap-2 p-2 cursor-pointer rounded-xl max-w-[300px] min-w-[200px] bg-white"
        >
         <!-- replay to message -->
         <div 
            v-if="!!props.message.replied_to"
            class="flex flex-col gap-1 pl-2 border-l-[2px] border-warning-500"
            >
            <span class="text-xs font-semibold text-warning-500 truncate">{{ props.message.replied_to?.sender?.first_name }} {{ props.message.replied_to?.sender?.last_name }}</span>
            <span class="text-xs font-medium text-greyscale-500 truncate">{{ props.message.replied_to?.text }} </span>
        </div>
        <!-- image -->
        <div
          @click="props.handleClickImage(props.message)"
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
        <!-- edit -->
        <div v-if="props.message?.edited" class="flex gap-1 items-center text-[10px] font-medium text-greyscale-300 self-end">
          <base-iconify
            :icon="PenBoldIcon"
            class="!w-3 !h-3"
          />
          <span>{{ t('edited') }}</span>
        </div>   
      </div>
      <p  class="text-xs font-medium text-greyscale-500 self-end">{{ formatHour(props.message?.created_date) }}</p>
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
</template>
<style scoped>
</style>