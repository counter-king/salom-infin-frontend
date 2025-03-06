<script setup>
// core
import { useI18n } from 'vue-i18n';
import { onMounted, ref, useAttrs } from 'vue';
// components
import ClickedStiker from './ClickedStiker.vue';
import { CheckBigIcon, CheckReadIcon, DangerCircleIcon, PenBoldIcon, CheckIcon } from '@/components/Icons';
// contants
import { formatHour } from '@/utils/formatDate';
// utils
import { dispatchNotify } from '@/utils/notify';
// enums
import { COLOR_TYPES } from '@/enums';
// store
import { useChatStore } from '../../stores';
// services
import { fetchBlobFile } from '@/services/file.service';

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
  classNames: {
    type: [String , Array, Object] 
  }
})
const { t } = useI18n();
// reactives
const loading = ref(false);
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
  class="flex flex-col gap-2 items-end"
  :class="classNames"
  v-bind="attrs"
  ref="forwardedRef"
  >
   <div class="flex gap-3 justify-end items-end relative">
      <!-- error text -->
      <div v-if="false" class="flex items-center justify-end text-critic-500 gap-[6px]">
        <span class="text-xs font-medium">{{ t('error') }}</span>
        <base-iconify
          :icon="DangerCircleIcon"
          class="!w-5 !h-5"
        />
      </div>
      <!-- time and check icon -->
      <div v-else class="flex gap-1 items-end select-none">
        <span class="text-xs font-medium text-greyscale-500">{{ formatHour(props.message?.created_date) }}</span>
        <base-iconify
          :icon="props.message?.is_read ? CheckReadIcon : CheckBigIcon"
          class="!w-5 !h-5 !text-success-500"
        />
      </div>
      <!-- image -->
      <div
        @click="props.handleClickImage(props.message)"
        @contextmenu.prevent="(e)=>props.onShowContextMenu(e, props.message)"
        class="flex flex-col gap-2 p-2 cursor-pointer rounded-xl max-w-[300px] min-w-[64px] bg-white"
        >
        <!-- reply to message -->
        <div 
          v-if="!!props.message.replied_to"
          class="flex flex-col gap-1 pl-2 border-l-[2px] border-warning-500"
          >
          <span class="text-xs font-semibold text-warning-500 truncate">{{ props.message.replied_to?.sender?.first_name }} {{ props.message.replied_to?.sender?.last_name }}</span>
          <span class="text-xs font-medium text-greyscale-500 truncate">{{ props.message.replied_to?.text }} </span>
        </div>
        <!-- image loading -->
        <BaseSpinner 
          v-if="loading"
          class="!w-4 !h-4 text-greyscale-500" 
        />
        <!-- image -->
        <img
          v-else
          :src="props.message?.attachments?.file?.url"
          class="w-full h-full object-cover rounded-lg"
        />
          <!-- edit -->
        <div v-if="props.message?.edited" class="flex gap-1 items-center text-[10px] font-medium text-greyscale-300 self-end">
          <base-iconify
            :icon="PenBoldIcon"
            class="!w-3 !h-3"
          />
          <span>{{ t('edited') }}</span>
        </div>   
      </div>
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
</template>
<style scoped>
</style>