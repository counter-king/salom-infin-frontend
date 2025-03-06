<script setup>
// cores
import { useI18n } from 'vue-i18n';
import { ref, useAttrs } from 'vue';
// componennts
import { CheckBigIcon, CheckReadIcon, DangerCircleIcon, Pen2Icon, PenBoldIcon, PenIcon, CheckIcon} from '@/components/Icons';
import BaseIconify from '@/components/UI/BaseIconify.vue';
import LinkMessage from './LinkMessage.vue';
import ClickedStiker from './ClickedStiker.vue';
// utils
import { formatHour } from '@/utils/formatDate';
// constatns
import { MESSAGE_TYPES } from '../../constatns';
// composables
import { useTextSelection } from '../../composables/useTextSelection';

const { t } = useI18n(); 
// props
const props = defineProps({
  message: {
    type: Object
  },
  onShowContextMenu: {
    type: Function
  },
  onShowEmojiContextMenu: {
    type: Function
  },
  handleClickEmoji: {
    type: Function
  },
  index: {
    type: Number
  },
  classNames: {
    type: [String , Array, Object] 
  }
})

const { handleSelectStart, handleClick } = useTextSelection();
// reactives
const attrs = useAttrs();
const forwardedRef = ref  (null);

defineExpose({
  forwardedRef
})
</script>
<template>
  <div 
    v-bind="attrs"
    ref="forwardedRef"  
     class="flex flex-col gap-2 items-end"
     :class="classNames">
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
          :icon="props.message?.is_read ? CheckReadIcon : CheckIcon"
          class="!w-5 !h-5 !text-success-500"
        />
      </div>
      <!-- message -->
      <div 
        @contextmenu.prevent="onShowContextMenu($event, props.message, props.index)"
        @selectstart="handleSelectStart"
        @click="handleClick"  
         class="flex flex-col gap-1 bg-primary-400 rounded-2xl rounded-br-[4px] px-4 py-3 cursor-pointer  max-w-[400px]"
         :class="[{'!rounded-xl !rounded-br-[4px]': false }]"
        >
        <!-- reply to message -->
        <div 
          v-if="!!props.message.replied_to"
          class="flex flex-col gap-1 pl-2 pr-2 border-l-[2px] rounded-r-[8px] bg-white/[12%]"
          >
          <span class="text-xs font-semibold text-white truncate">{{ props.message.replied_to?.sender?.first_name }} {{ props.message.replied_to?.sender?.last_name }}</span>
          <span class="text-xs font-medium text-white/[65%] truncate">{{ props.message.replied_to?.text }}</span>
        </div>
        <!-- text -->
        <p class="text-sm font-medium text-white bg-primary-400 whitespace-pre-line break-all" >
          <LinkMessage v-if="props.message?.message_type == MESSAGE_TYPES.LINK" :message="props.message" />
          <span v-else>{{ props.message?.text }}</span>
        </p> 
        <!-- edit -->
        <div v-if="props.message?.edited" class="flex gap-1 items-center text-[10px] font-medium text-white/[70%] self-end">
          <base-iconify
            :icon="PenBoldIcon"
            class="!w-3 !h-3"
          />
          <span>{{ t('edited') }}</span>
        </div>   
      </div>
    </div>
    <!-- reactions -->
    <div v-if="props.message.reactions && Object.keys(props.message.reactions).length" class="flex gap-1">
      <template v-for="reaction in Object.keys(props.message.reactions)" :key="reaction">
        <ClickedStiker 
          @click="props.handleClickEmoji(reaction, message.message_id)"
          :onContextMenuClick="(e)=>props.onShowEmojiContextMenu(e, props.message.reactions[reaction])" 
          :emoji="reaction"
          :userReactionList="props.message.reactions[reaction]" />
      </template>
    </div>
  </div>
</template>
<style scoped>
.dropdown-menu {
  box-shadow: 0px 2px 60px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.03);
}
</style>