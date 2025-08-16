<script setup>
// core
import { ref, useAttrs } from 'vue';
import { useI18n } from 'vue-i18n';
// components
import ClickedStiker from './ClickedStiker.vue';
import { DownloadMinimalisticIcon, PenBoldIcon } from '@/components/Icons';
// utils
import { formatHour } from '@/utils/formatDate';
// contants
import { downloadFile } from '../../services/file.service';
import { fileTypes } from '../../constatns';
// stores
import { useChatStore } from '../../stores';
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
  avatarVisible: {
    type: Boolean,
    default: false
  },
  classNames: {
    type: [String , Array, Object]
  }
})

const chatStore = useChatStore()
const { handleMessageClick } = useTextSelection();
const { t } = useI18n();
// reactives
const attrs = useAttrs();
const forwardedRef = ref(null);

defineExpose({
  forwardedRef
})

</script>
<template>
 <div
    v-bind="attrs"
    ref="forwardedRef"
    class="flex gap-2"
    :class="classNames"
    >
    <!-- avatat -->
    <base-avatar
      :image="props.message?.sender?.avatar?.url"
      :label="props.message?.sender?.full_name"
      :color="props.message?.sender?.color"
      avatar-classes="w-8 h-8"
      :meta="props.message?.sender"
      detail-dialog
      :class="{'!visible': props.avatarVisible, '!invisible': !props.avatarVisible}"
    />
    <div class="flex flex-col gap-2">
      <!-- file -->
      <div class="flex gap-3">
        <div
          @contextmenu.prevent="(e)=>props.onShowContextMenu(e, props.message)"
          @click="handleMessageClick"
          class="flex flex-col gap-2 !p-2 !pr-4 min-w-[243px] max-w-[400px] bg-white rounded-xl"
          :class="[{'!p-0': !props.message.replied_to }]"
        >
          <!-- reply to message -->
          <div
            v-if="!!props.message.replied_to"
            @click="props.handleClickReplayMessage(props.message)"
            class="flex flex-col gap-1 pl-2 border-l-[2px] border-warning-500"
            >
            <span class="text-xs font-semibold text-warning-500 truncate">{{ props.message.replied_to?.sender?.first_name }} {{ props.message.replied_to?.sender?.last_name }}</span>
            <span class="text-xs font-medium text-greyscale-500 truncate">{{ props.message.replied_to?.text }}</span>
          </div>
          <!-- file info -->
          <p v-if="props.avatarVisible" class="text-sm font-bold text-blue-700" >{{ props.message.sender.first_name }} {{ props.message.sender.last_name }}</p>
          <div
            class="flex gap-4 rounded-xl items-center w-full bg-white-400/[40%]"
            >
              <div
                 @click="downloadFile(props.message)"
                 class="p-[10px] bg-greyscale-50 rounded-lg group cursor-pointer">
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
                @click="downloadFile(props.message)"
                v-if="props.message?.uploaded"
                :icon="DownloadMinimalisticIcon"
                class="!h-5 !w-5 text-greyscale-500 cursor-pointer"
              />
              <BaseSpinner
                v-else
                class="!w-4 !h-4 text-greyscale-500 animate-spin"
                :style="{'--spinner-stroke-color': 'var(--success-500)'}"
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
        <!-- time -->
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
