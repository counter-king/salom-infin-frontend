<script setup>
// cores
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
// componennts
import { CheckBigIcon, CheckReadIcon, DangerCircleIcon } from '@/components/Icons';
import BaseIconify from '@/components/UI/BaseIconify.vue';
import ClickedStiker from './ClickedStiker.vue';
// utils
import { formatHour } from '@/utils/formatDate';
import ContextMenu from './ContextMenu.vue';

const { t } = useI18n(); 
// props
const props = defineProps({
  text: {
    type: String
  },
  date: {
    type: String 
  },
  isReaded: {
    type: Boolean,
    default: false
  },
  reactions : {
    type: Array
  },
  onShowContextMenu: {
    type: Function
  },
  onShowEmojiContextMenu: {
    type: Function
  }
})
// reactives
const refContextMenu = ref(null);
// const emojiMenuItems = ref([
//    { 
//      label: 'select-image',
//      iconName: true,
//      command: () => {
//      } 
//    },
//    { 
//      label: 'delete',
//      iconName: true,
//      command: () => {
//      },
//    }
// ]);

const onContextMenuClick = (event) => {
  props.onShowContextMenu(event, { text: props.text})
};

const onEmojiContextMenuClick = (event) => {
  props.onShowEmojiContextMenu(event);
}

</script>
<template>
  <div class="flex flex-col gap-2 items-end">
    <div class="flex gap-3 justify-end items-end relative">
    <div v-if="true" class="flex items-center justify-end text-critic-500 gap-[6px]">
      <span class="text-xs font-medium">{{ t('error') }}</span>
      <base-iconify
        :icon="DangerCircleIcon"
        class="!w-5 !h-5"
      />
    </div>
    <div v-else class="flex gap-1 items-end">
      <span class="text-xs font-medium text-greyscale-500">{{ formatHour(props.date) }}</span>
      <base-iconify
        :icon="props.isReaded ? CheckReadIcon : CheckBigIcon"
        class="!w-5 !h-5 !text-success-500"
      />
    </div> 
      <p @contextmenu.prevent="onContextMenuClick" class="text-sm font-medium text-white bg-primary-400 rounded-xl rounded-br-[4px] px-4 py-2" >{{ props.text }}</p>
    </div>
    <div class="flex gap-1">
      <template v-for="reaction in props.reactions">
        <ClickedStiker :onContextMenuClick="onEmojiContextMenuClick" :reaction="reaction" />
      </template>
      <ClickedStiker :onContextMenuClick="onEmojiContextMenuClick" :reaction="reaction" />
      <ClickedStiker :onContextMenuClick="onEmojiContextMenuClick" :reaction="reaction" />
    </div>
  </div>
  <!-- reaction menu -->
  <!-- <ContextMenu ref="refContextMenu" :menu-items="emojiMenuItems" class-menu="w-[229px]">
   <template  #default="{ item }">
     <base-avatar
       label="Doclines Project"
       color="#E2E8F0"
       shape="circle"
       avatar-classes="w-6 h-6"
       label-classes="text-lg font-semibold text-greyscale-900"
     />
     <span class="text-xs font-medium">{{ item.label }}</span>
   </template>
  </ContextMenu> -->
</template>
<style scoped>
.dropdown-menu {
  box-shadow: 0px 2px 60px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.03);
}
</style>