<script setup>
// cores
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
// componennts
import OwnerText from '../components/ChatArea/OwnerText.vue';
import FriendText from '../components/ChatArea/FriendText.vue';
import { ShowDate } from '../components/ChatArea';
import SendMessage from '../components/ChatArea/SendMessage.vue';
import ScrollDownButton from '../components/ChatArea/ScrollDownButton.vue';
import DeleteDialog from '../components/DeleteDialog.vue';
// services 
import FileUploadProgress from '../components/ChatArea/FileUploadProgress.vue';
import ContextMenu from '../components/ChatArea/ContextMenu.vue';
import { useContextMenu } from '../composables/useContextMenu';
import { useFileUploadDrop } from '../composables/useFileUploadDrop';  
import ChatFileItem from '../components/ChatArea/ChatFileItem.vue';
import { DownloadMinimalisticIcon, FileTextBoldIcon } from '@/components/Icons';
// stores
import { useChatStore } from '../stores';
import Empty from '@/components/Empty.vue';

const chatStore = useChatStore()
// composables
const { menuItems, refContextMenu } = useContextMenu();
const { onDragOver, onDragLeave, onDrop, uploadingFiles, abortController } = useFileUploadDrop();

const { t } = useI18n();
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

const onShowContextMenu = (event, data) => {
  refContextMenu.value.menu.show(event);
  chatStore.contextMenu.tempData = data
}

const onHandleDeleteMessage = () => {
  console.log("log");
}
</script>
<template>
 <!-- style="height: calc(100% - 135px)"  -->
 <div class="h-full relative">
  <div
    ref="refChatArea" class="flex flex-col gap-2 px-6 py-4 overflow-y-auto relative"
    @scroll="handleScroll"
    :style="`height: calc(100% - ${chatStore.contextMenu.edit || chatStore.contextMenu.replay ? '170px' : '135px'})`" 
    @dragover.prevent="onDragOver"
    @dragleave.prevent="onDragLeave"
    @drop.prevent="onDrop"
    >
    <template v-if="false">
      <ShowDate :date="'2024-10-20T10:20:30'" />
      <OwnerText :onShowContextMenu="onShowContextMenu"  isReaded :text="'Привет, хорошо, спасибо!'" :date="'2024-10-20T10:20:30'" />
      <FriendText :onShowContextMenu="onShowContextMenu"  :text="'Привет, хорошо, спасибо!'" :date="'2024-10-20T10:20:30'" />
      <template  v-for="file in uploadingFiles" :key="file.id">
        <FileUploadProgress :abortController="abortController" :progress="file.progress" />
      </template>
      <ChatFileItem :onShowContextMenu="onShowContextMenu"  :right-icon="{ name: DownloadMinimalisticIcon, class: 'text-greyscale-500' }" :left-icon="{ name: FileTextBoldIcon, class: 'text-warning-500' }"/>
      <ChatFileItem :onShowContextMenu="onShowContextMenu"  :right-icon="{ name: DownloadMinimalisticIcon, class: 'text-greyscale-500' }" :left-icon="{ name: FileTextBoldIcon, class: 'text-warning-500' }"/>
      <ChatFileItem type="owner" :onShowContextMenu="onShowContextMenu"  :right-icon="{ name: DownloadMinimalisticIcon, class: 'text-greyscale-500' }" :left-icon="{ name: FileTextBoldIcon, class: 'text-white' }"/>
      <ChatFileItem type="owner" :onShowContextMenu="onShowContextMenu"  :right-icon="{ name: DownloadMinimalisticIcon, class: 'text-greyscale-500' }" :left-icon="{ name: FileTextBoldIcon, class: 'text-white' }"/>
      <!-- <div class="h-[2px]">1</div> -->
      <div v-if="showScrollDownButton || true" class="sticky bottom-0 flex justify-end">
        <ScrollDownButton @click="handleClickScrollDown"  />
      </div>
      <div class="">
        <FileUploadProgress/>
      </div>
    </template>
    <div v-if="true" class="h-full">
      <Empty 
        title="you-dont-have-any-messages"
        description="you-dont-have-any-messages-description"
        label-classes="text-greyscale-900 !text-lg font-semibold"
        wrapper-class="w-full h-full !bg-transparent shadow-none"
        inner-wrapper-class="w-[335px]"
      />
    </div>
  </div>

  <div class="px-6">
      <SendMessage  />
  </div>
  <ContextMenu :menu-items="menuItems" ref="refContextMenu" />
  <DeleteDialog 
    v-model="chatStore.contextMenu.deleteDialog" 
    :onDelete="onHandleDeleteMessage" 
    :onClose="() => chatStore.contextMenu.deleteDialog = false"
  />
</div>
</template>