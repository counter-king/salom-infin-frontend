<script setup>
// core
// components
import ClickedStiker from './ClickedStiker.vue';
// contants
import { formatHour } from '@/utils/formatDate';
import { DownloadMinimalisticIcon } from '@/components/Icons';
import { downloadFile } from '../../services/file.service';
import { fileTypes } from '../../constatns';
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
  avatarVisible: {
    type: Boolean,
    default: false
  },
  classNames: {
    type: [String , Array, Object] 
  }
})
const { handleSelectStart, handleClick } = useTextSelection();

</script>
<template>
 <div class="flex gap-2" :class="classNames" @selectstart="handleSelectStart" @click="handleClick">
    <base-avatar 
      :image="props.message?.sender?.avatar?.url"
      :label="props.message?.sender?.first_name"
      :color="props.message?.sender?.color"
      avatar-classes="w-8 h-8"
      :class="{'!visible': props.avatarVisible, '!invisible': !props.avatarVisible}"
    />
    <div class="flex flex-col gap-2">
      <div class="flex gap-3">
        <div 
          @contextmenu.prevent="(e)=>props.onShowContextMenu(e, props.message)"
          class="flex gap-4 items-center p-2 pr-4 min-w-[243px] max-w-[400px] w-full group bg-white cursor-pointer rounded-xl"
          >
            <div class="p-[10px] bg-greyscale-50 rounded-lg">
              <base-iconify 
                :icon="fileTypes[props.message?.message_type]?.icon"
                class="!h-5 !w-5" 
                :class="fileTypes[props.message?.message_type]?.class"
              />
            </div>
            <div class="grow flex flex-col gap-1">
              <h3   
                class="text-sm font-semibold text-greyscale-900 capitalize"
                >{{ props.message?.text }}
              </h3>
              <p 
                class="text-xs text-greyscale-500"
              >{{ props.message?.size }}
              </p>
            </div>
            <base-iconify 
             @click="downloadFile(props.message?.attachments?.file)" 
              v-if="props.message?.uploaded"
              :icon="DownloadMinimalisticIcon"
              class="!h-5 !w-5 text-greyscale-500" 
            />
            <BaseSpinner 
              v-else
              class="!w-4 !h-4 text-greyscale-500 animate-spin" 
              :style="{'--spinner-stroke-color': 'var(--success-500)'}" 
            />
        </div>
        <p  class="text-xs font-medium text-greyscale-500 self-end">{{ formatHour(props.message?.created_date) }}</p>
      </div>
      <!-- reactions -->
      <div v-if="props.message?.reactions && Object.keys(props.message?.reactions).length" class="flex gap-1">
        <template v-for="reaction in Object.keys(props.message?.reactions)" :key="reaction">
          <ClickedStiker 
            @click="props.handleClickEmoji(reaction, message.message_id)"
            :onContextMenuClick="(e)=>props.onShowEmojiContextMenu(e, props.message.reactions[reaction])" 
            :emoji="reaction"
            :userReactionList="props.message.reactions[reaction]" />
        </template>
      </div>
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