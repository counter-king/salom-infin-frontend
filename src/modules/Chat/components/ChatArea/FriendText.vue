<script setup>
// cores
import { useI18n } from 'vue-i18n';
import { ref, useAttrs } from 'vue';
// componennts
import { PenBoldIcon } from '@/components/Icons';
import ClickedStiker from './ClickedStiker.vue';
import LinkMessage from './LinkMessage.vue';
// utils
import { formatHour } from '@/utils/formatDate';
// contants
import { MESSAGE_TYPES } from '../../constatns';
// stores
import { useChatStore } from '../../stores';
// composables
import { useTextSelection } from '../../composables/useTextSelection';

// props
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
  handleClickReplayMessage: {
    type: Function
  },
  avatarVisible: {
    type: Boolean,
    default: false
  },
  onShowContextMenu: {
    type: Function
  },
  classNames: {
    type: [String , Array, Object]
  }
})

const chatStore = useChatStore()
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
     v-bind="attrs"
     ref="forwardedRef"
     >
    <div class="flex gap-2" :class="classNames">
      <base-avatar
        :image="props.message?.sender?.avatar?.url"
        :label="props.message?.sender?.full_name"
        :color="props.message?.sender?.color"
        shape="circle"
        :meta="props.message?.sender"
        detail-dialog
        avatar-classes="w-8 h-8"
        :class="{'!visible': props.avatarVisible, '!invisible': !props.avatarVisible}"
      />
      <div class="flex flex-col gap-2">
        <!-- message -->
        <div class="flex gap-3">
          <div
            @click="handleMessageClick"
            @contextmenu.prevent="onShowContextMenu($event, props.message, props.index)"
            class="friend-text flex flex-col gap-1 bg-white rounded-xl px-4 py-2 cursor-pointer w-fit  max-w-[400px]"
            :class="[
              {
                '!rounded-xl !rounded-bl-[4px]': props.avatarVisible,
                '!rounded-tl-[4px]': !props.avatarVisible,
                '!rounde-2xl' : !!props.message.replied_to
              }
            ]"
            >
            <!-- replay to message -->
            <div
              v-if="!!props.message.replied_to"
              @click="props.handleClickReplayMessage(props.message)"
              class="flex flex-col gap-1 pl-2 border-l-[2px] border-warning-500"
              >
              <span class="text-xs font-semibold text-warning-500 truncate">{{ props.message.replied_to?.sender?.first_name }} {{ props.message.replied_to?.sender?.last_name }}</span>
              <span class="text-xs font-medium text-greyscale-500 truncate">{{ props.message.replied_to?.text }}</span>
            </div>
            <!-- text -->
            <p v-if="props.avatarVisible" class="text-sm font-bold text-blue-900" >{{ props.message?.sender?.first_name }} {{ props.message?.sender?.last_name }}</p>
            <p class="text-sm font-medium text-greyscale-900 whitespace-pre-line break-all">
              <LinkMessage v-if="props.message?.message_type == MESSAGE_TYPES.LINK" type="friend" :message="props.message" />
              <span v-else>{{ props.message?.text }}</span>
            </p>
             <!-- edit -->
            <div v-if="props.message?.edited" class="flex gap-1 items-center text-[10px] font-medium text-greyscale-300 self-end">
              <base-iconify
                :icon="PenBoldIcon"
                class="!w-3 !h-3"
              />
              <span>{{ t('edited') }}</span>
            </div>
          </div>
          <p class="text-xs font-medium text-greyscale-500 self-end">{{ formatHour(props.message?.created_date) }}</p>
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
      <!-- <p class="text-xs font-medium text-greyscale-500 self-end">{{ formatHour(props.message.created_date) }}</p> -->
    </div>
  </div>
</template>
<style scoped>
.friend-text {
 box-shadow: 0px 2px 4px 0px rgba(47, 61, 87, 0.03), 0px 1px 1px 0px rgba(95, 110, 169, 0.03);
}
</style>
