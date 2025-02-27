<script setup>
// cores
// componennts
import { PenBoldIcon } from '@/components/Icons';
import ClickedStiker from './ClickedStiker.vue';
// utils
import { formatHour } from '@/utils/formatDate';
import { useI18n } from 'vue-i18n';
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

const { t } = useI18n();

</script>
<template>
  <div class="">
    <div class="flex gap-2 select-none" :class="classNames">
      <base-avatar 
        :image="props.message?.sender?.avatar?.url"
        :label="props.message?.sender?.first_name"
        :color="props.message?.sender?.color"
        shape="circle"
        avatar-classes="w-8 h-8"
        :class="{'!visible': props.avatarVisible, '!invisible': !props.avatarVisible}"
      />
      <div class="flex flex-col gap-2">
        <!-- message -->
        <div class="flex gap-3">
          <div 
            @contextmenu.prevent="onShowContextMenu($event, props.message, props.index)"
            class="friend-text flex flex-col gap-1 bg-white rounded-2xl rounded-bl-[4px] px-4 py-2 cursor-pointer w-fit  max-w-[400px]"
            :class="[{'!rounded-2xl !rounded-tl-[4px]': props.avatarVisible}]"
            >
            <div 
              v-if="!!props.message.replied_to"
              class="flex flex-col gap-1 pl-2 border-l-[2px] border-warning-500"
              >
              <span class="text-xs font-semibold text-warning-500 truncate">{{ props.message.replied_to?.sender?.first_name }} {{ props.message.replied_to?.sender?.last_name }}</span>
              <span class="text-xs font-medium text-greyscale-500 truncate">{{ props.message.replied_to?.text }}</span>
            </div>
            <!-- text -->
            <p class="text-sm font-medium text-greyscale-900 whitespace-pre-line break-all">
              {{ props.message?.text }}
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
      <!-- <p class="text-xs font-medium text-greyscale-500 self-end">{{ formatHour(props.message.created_date) }}</p> -->
    </div>
  </div>
</template>
<style scoped>
.friend-text {
 box-shadow: 0px 2px 4px 0px rgba(47, 61, 87, 0.03), 0px 1px 1px 0px rgba(95, 110, 169, 0.03); 
}
</style>