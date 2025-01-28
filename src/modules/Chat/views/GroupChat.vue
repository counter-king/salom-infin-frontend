<script setup>
// cores
import { ref } from 'vue';
// componennts
import OwnerText from '../components/ChatArea/OwnerText.vue';
import FriendText from '../components/ChatArea/FriendText.vue';
import { ShowDate } from '../components/ChatArea';
import SendMessage from '../components/ChatArea/SendMessage.vue';
import ScrollDownButton from '../components/ChatArea/ScrollDownButton.vue';
// services 
import FileUploadProgress from '../components/ChatArea/FileUploadProgress.vue';
import ContextMenu from '../components/ChatArea/ContextMenu.vue';
import { useContextMenu } from '../composables/useContextMenu';
import { useFileUploadDrop } from '../composables/useFileUploadDrop';  
import ChatFileItem from '../components/ChatArea/ChatFileItem.vue';
import { DownloadMinimalisticIcon, FileTextBoldIcon } from '@/components/Icons';
import BaseSpinner from '@/components/UI/BaseSpinner.vue';
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
  refContextMenu.value.menu.show(event);
}

</script>
<template>
   <!-- style="height: calc(100% - 135px)"  -->
 <div class="h-full relative">
  <div
    @contextmenu.prevent=""
    ref="refChatArea" class="flex flex-col gap-2 px-6 py-4 overflow-y-auto relative"
    @scroll="handleScroll"
    style="height: calc(100% - 170px)" 
    @dragover.prevent="onDragOver"
    @dragleave.prevent="onDragLeave"
    @drop.prevent="onDrop"
    >
      <ShowDate :date="'2024-10-20T10:20:30'" />
      <OwnerText :onShowContextMenu="onShowContextMenu"  isReaded :text="'Привет, хорошо, спасибо!'" :date="'2024-10-20T10:20:30'" />
      <FriendText :onShowContextMenu="onShowContextMenu"  :text="'Привет, хорошо, спасибо!'" :date="'2024-10-20T10:20:30'" />
      <template  v-for="file in uploadingFiles" :key="file.id">
        <FileUploadProgress  :progress="file.progress" />
      </template>
      <ChatFileItem :right-icon="{ name: DownloadMinimalisticIcon, class: 'text-greyscale-500' }" :left-icon="{ name: FileTextBoldIcon, class: 'text-warning-500' }"/>
      <ChatFileItem :right-icon="{ name: DownloadMinimalisticIcon, class: 'text-greyscale-500' }" :left-icon="{ name: FileTextBoldIcon, class: 'text-warning-500' }"/>
      <ChatFileItem type="owner" :right-icon="{ name: DownloadMinimalisticIcon, class: 'text-greyscale-500' }" :left-icon="{ name: FileTextBoldIcon, class: 'text-white' }"/>
      <ChatFileItem type="owner" :right-icon="{ name: DownloadMinimalisticIcon, class: 'text-greyscale-500' }" :left-icon="{ name: FileTextBoldIcon, class: 'text-white' }"/>
      <div class="h-[2px]">1</div>
      <div class="sticky bottom-0 flex justify-end">
        <ScrollDownButton @click="handleClickScrollDown" :class="{'hidden': !showScrollDownButton}" />
      </div>
  </div>
  <div class="px-6">
      <SendMessage  />
  </div>
  <ContextMenu :menu-items="menuItems" ref="refContextMenu" />
</div>
</template>