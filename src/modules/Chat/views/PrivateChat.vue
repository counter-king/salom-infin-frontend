<script setup>
// cores
import { ref } from 'vue';
// componennts
import BaseCalendar from '@/components/UI/BaseCalendar.vue';
import BaseCalendarButton from '@/components/UI/BaseCalendarButton.vue';
import OwnerText from '../components/ChatArea/OwnerText.vue';
import FriendText from '../components/ChatArea/FriendText.vue';
import { EmojiStikers, ShowDate } from '../components/ChatArea';
import SendMessage from '../components/ChatArea/SendMessage.vue';
import ScrollDownButton from '../components/ChatArea/ScrollDownButton.vue';
// services 
import axiosConfig from '@/services/axios.config';
import FileUploadProgress from '../components/ChatArea/FileUploadProgress.vue';
import ContextMenu from '../components/ChatArea/ContextMenu.vue';
import { useContextMenu } from '../composables/useContextMenu';
import { useFileUploadDrop } from '../composables/useFileUploadDrop';  
// composables
const { menuItems, refContextMenu } = useContextMenu();
const { onDragOver, onDragLeave, onDrop, uploadingFiles } = useFileUploadDrop();
// reactives
const showScrollDownButton = ref(false);
const refChatArea = ref(null);

// methods
// when scroll down, scrollDwonButton will be visible
const handleScroll = (event) => {
  if(event.target.scrollTop + event.target.clientHeight + 300 < event.target.scrollHeight ) {
    showScrollDownButton.value = true
  } else{
    showScrollDownButton.value = false
  }
}

const handleClickScrollDown = () => {
  refChatArea.value.scrollTop = refChatArea.value.scrollHeight
  refChatArea.value.behavior = 'smooth'
}

const onShowContextMenu = (event) => {
  if (refContextMenu.value && refContextMenu.value.menu) {    
    refContextMenu.value.menu.show(event);
  } else {
    console.error("ContextMenu yoki menu topilmadi.");
  }
}

</script>
<template>
 <div class="h-full relative">
  <div
    ref="refChatArea" class="px-6 py-4 overflow-y-auto relative"
    @scroll="handleScroll"
    style="height: calc(100% - 135px)"
    @dragover.prevent="onDragOver"
    @dragleave.prevent="onDragLeave"
    @drop.prevent="onDrop"
    >
      <ShowDate :date="'2024-10-20T10:20:30'" />
      <OwnerText :onShowContextMenu="onShowContextMenu"  isReaded :text="'Привет, хорошо, спасибо!'" :date="'2024-10-20T10:20:30'" />
      <FriendText :onShowContextMenu="onShowContextMenu"  :text="'Привет, хорошо, спасибо!'" :date="'2024-10-20T10:20:30'" />
      <div class="h-[1400px]">1</div>
      <div class="sticky bottom-0 flex justify-end">
        <ScrollDownButton @click="handleClickScrollDown" :class="{'hidden': !showScrollDownButton}" />
      </div>
      <template  v-for="file in uploadingFiles" :key="file.id">
        <FileUploadProgress  :progress="file.progress" />
      </template>
  </div>
  <div class="flex flex-col gap-3 px-6">
      <SendMessage  />
  </div>
  <ContextMenu :menu-items="menuItems" ref="refContextMenu" />
</div>
</template>