<script setup>
// cores
import { useI18n } from 'vue-i18n';
// componennts
import { CheckBigIcon, CheckReadIcon, DangerCircleIcon } from '@/components/Icons';
import BaseIconify from '@/components/UI/BaseIconify.vue';
import ClickedStiker from './ClickedStiker.vue';
// utils
import { formatHour } from '@/utils/formatDate';
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
  index: {
    type: Number
  }
})

const onEmojiContextMenuClick = (event) => {
  props.onShowEmojiContextMenu(event);
}

</script>
<template>
  <div class="flex flex-col gap-2 items-end">
    <div class="flex gap-3 justify-end items-end relative">
      <!-- error text -->
      <div v-if="false" class="flex items-center justify-end text-critic-500 gap-[6px]">
        <span class="text-xs font-medium">{{ t('error') }}</span>
        <base-iconify
          :icon="DangerCircleIcon"
          class="!w-5 !h-5"
        />
      </div>
      <div v-else class="flex gap-1 items-end">
        <span class="text-xs font-medium text-greyscale-500">{{ formatHour(props.message?.created_date) }}</span>
        <base-iconify
          :icon="props.message?.is_read ? CheckReadIcon : CheckBigIcon"
          class="!w-5 !h-5 !text-success-500"
        />
      </div>
      <!-- replay message -->
      <div 
        @contextmenu.prevent="onShowContextMenu($event, props.message, props.index)"
         class="flex flex-col gap-1 bg-primary-400 rounded-2xl rounded-br-[4px] px-4 py-3 cursor-pointer max-w-[400px]"
         :class="[{'!rounded-xl !rounded-br-[4px]': false}]"
        >
        <div 
          v-if="!!props.message.replied_to"
          class="flex flex-col gap-1 pl-2 pr-2 border-l-[2px] rounded-r-[8px] bg-white/[12%]"
          >
          <span class="text-xs font-semibold text-white truncate">{{ props.message.replied_to?.user?.first_name }} {{ props.message.replied_to?.user?.last_name }}</span>
          <span class="text-xs font-medium text-white/[65%] truncate">{{ props.message.replied_to?.text }}</span>
        </div>
        <p class="text-sm font-medium text-white bg-primary-400" >{{ props.message?.text }}</p> 
      </div>
      <!-- <p @contextmenu.prevent="onContextMenuClick" class="text-sm font-medium text-white bg-primary-400 rounded-xl rounded-br-[4px] px-4 py-2" >{{ props.text }}</p> -->
    </div>
    <!-- reactions -->
    <div v-if="!!props.message.reactions?.length" class="flex gap-1">
      <template v-for="reaction in props.message.reactions">
        <ClickedStiker :onContextMenuClick="onEmojiContextMenuClick" :reaction="reaction" />
      </template>
    </div>
  </div>
</template>
<style scoped>
.dropdown-menu {
  box-shadow: 0px 2px 60px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.03);
}
</style>