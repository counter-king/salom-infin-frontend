<script setup>
// core
import { ref, useAttrs } from 'vue';
import { useI18n } from 'vue-i18n';
// components
import ClickedStiker from './ClickedStiker.vue';
import { DownloadMinimalisticIcon , CheckIcon, CheckReadIcon, PenBoldIcon, DangerCircleIcon} from '@/components/Icons';
// contants
import { fileTypes } from '../../constatns';
// utils
import { formatHour } from '@/utils/formatDate';
// services
import { downloadFile } from '../../services/file.service';
// composables
import { useTextSelection } from '../../composables/useTextSelection';

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
  handleClickReplayMessage: {
    type: Function
  },
  classNames: {
    type: [String, Array, Object] 
  }
})

const { t } = useI18n();
const { handleMessageClick } = useTextSelection();
// reactives
const attrs = useAttrs();
const forwardedRef = ref(null);

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
        <span class="text-xs font-medium text-greyscale-500">{{ props.message?.created_date && formatHour(props.message?.created_date) }}</span>
        <base-iconify
          :icon="props.message?.is_read ? CheckReadIcon : CheckIcon"
          class="!w-5 !h-5 !text-success-500"
        />
      </div>
      <!-- files -->
      <div
         @click="handleMessageClick"
         @contextmenu.prevent="(e)=>props.onShowContextMenu(e, props.message)"
         class="flex flex-col gap-1 bg-primary-400 rounded-2xl rounded-br-[4px] px-4 py-3 cursor-pointer  max-w-[400px]  min-w-[243px]"
         :class="[
          {
            '!rounded-2xl' : !!props.message.replied_to,
            '!py-2': props.message.edited
          }
        ]"
        >
        <!-- reply to message -->
        <div 
          v-if="!!props.message.replied_to"
          @click="props.handleClickReplayMessage(props.message)"
          class="flex flex-col gap-1 pl-2 pr-2 border-l-[2px] rounded-r-[8px] bg-white/[12%]"
          >
          <span class="text-xs font-semibold text-white truncate">{{ props.message.replied_to?.sender?.first_name }} {{ props.message.replied_to?.sender?.last_name }}</span>
          <span class="text-xs font-medium text-white/[65%] truncate">{{ props.message.replied_to?.text }}</span>
        </div>
        <!-- file -->
        <div          
          class="flex gap-4 items-center w-full bg-primary-400"
          >
            <div 
              @click="downloadFile(props.message)" 
              class="p-[10px] rounded-lg !bg-primary-300">
              <base-iconify 
              :icon="fileTypes[props.message?.message_type]?.icon"
              class="!h-5 !w-5" 
              :class="fileTypes[props.message?.message_type]?.class2"
              />
            </div>
            <div class="grow flex flex-col gap-1">
              <h3   
                class="text-sm font-semibold capitalize text-white"
                >{{ props.message?.text }}</h3>
              <p 
                class="text-xs text-primary-100"
              >{{ props.message?.size }}</p>
            </div>
            <base-iconify 
              @click="downloadFile(props.message)" 
              v-if="props.message?.uploaded"
              :icon="DownloadMinimalisticIcon"
              class="!h-5 !w-5 !text-greyscale-90" 
            />
            <BaseSpinner 
              v-else
              class="!w-4 !h-4 text-greyscale-500 animate-spin" 
              :style="{'--spinner-stroke-color': 'white'}" 
            />
        </div>
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
    <div v-if="Object.keys(props.message.reactions).length" class="flex gap-1">
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
.p-button:focus{
  box-shadow: none !important;
}

::v-deep(.p-progress-spinner-circle) {
  stroke: var(--spinner-stroke-color, white) !important;
  animation: p-progress-spinner-color 6s linear infinite !important;
}

@keyframes p-progress-spinner-color {
  0%, 100% {
    stroke: var(--spinner-stroke-color, white) !important;
  }
  25% {
    stroke: var(--spinner-stroke-color, white) !important;
  }
  50% {
    stroke: var(--spinner-stroke-color, white) !important;
  }
  75% {
    stroke: var(--spinner-stroke-color, white) !important;
  }
}
</style>