<script setup>
// core
import { ref, useAttrs } from 'vue';
// components
import ClickedStiker from './ClickedStiker.vue';
import { DownloadMinimalisticIcon } from '@/components/Icons';
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
  classNames: {
    type: [String, Array, Object] 
  }
})
const { handleSelectStart, handleClick } = useTextSelection();
// reactives
const attrs = useAttrs();
const forwardedRef = ref(null);

defineExpose({
  forwardedRef
})

</script>
<template>
 <div 
  class="flex gap-2 justify-end"
  :class="classNames"
  @selectstart="handleSelectStart"
  @click="handleClick"
  v-bind="attrs"
  ref="forwardedRef"
  >
    <div class="flex flex-col gap-2">
      <div class="flex gap-3">
        <p class="text-xs font-medium text-greyscale-500 self-end">{{ props.message?.created_date && formatHour(props.message?.created_date) }}</p>
        <div class="flex flex-col gap-2">
          <div 
            @contextmenu.prevent="(e)=>props.onShowContextMenu(e, props.message)"
            @click=""
            class="flex gap-4 items-center p-2 pr-4 min-w-[243px] max-w-[400px] w-full group bg-primary-400 cursor-pointer rounded-xl"
            >
              <div 
                @click="downloadFile(props.message?.attachments?.file)" 
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
                @click="downloadFile(props.message?.attachments?.file)" 
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