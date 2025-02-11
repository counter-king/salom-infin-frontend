<script setup>
// cores
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
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
import Empty from '@/components/Empty.vue';
// stores
import { useChatStore } from '../stores';

// composables
const { menuItems, refContextMenu } = useContextMenu();
const { onDragOver, onDragLeave, onDrop } = useFileUploadDrop();

const { t } = useI18n();
const route = useRoute();
const chatStore = useChatStore()
// reactives
const showScrollDownButton = ref(false);
const refChatArea = ref(null);
const refSendMessage = ref(null);
const refEmojiContextMenu = ref(null);

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

const onShowEmojiContextMenu = (event) => {
  refEmojiContextMenu.value.menu.show(event);
}

const onHandleDeleteMessage = () => {
  console.log("log");
}

const onClickChatArea = () => {
  if(refSendMessage.value){
    refSendMessage.value.refInput.$el.focus()
  }
}

const emojiMenuItems = ref([
   { 
     label: 'select-image',
     iconName: true,
     command: () => {
     } 
   },
   { 
     label: 'delete',
     iconName: true,
     command: () => {
     },
   }
]);


onMounted(() => {
  console.log(route.params.id);
  chatStore.actionGetPrivateChatById(route.params.id);
  chatStore.actionGetMessageListByChatId(route.params.id);
})

</script>
<template>
 <!-- style="height: calc(100% - 135px)"  -->
 <div class="h-full relative">
  <div
    ref="refChatArea" class="flex flex-col gap-2 px-6 py-4 overflow-y-auto relative"
    @scroll="handleScroll"
    :style="`height: calc(100% - ${chatStore.contextMenu.edit || chatStore.contextMenu.replay ? '170px' : '135px'})`" 
    @click="onClickChatArea"
    @dragover.prevent="onDragOver"
    @dragleave.prevent="onDragLeave"
    @drop.prevent="onDrop"
    >
    <template v-if="!!chatStore.messageListByChatId.length">
      <template v-for="(message, index) in chatStore.messageListByChatId" :key="message.id">
          <template v-if="index==0">
            <ShowDate :date="message.created_date" />
          </template>
      </template>
      <!-- 
      <OwnerText :onShowContextMenu="onShowContextMenu" :onShowEmojiContextMenu="onShowEmojiContextMenu"  isReaded :text="'Привет, хорошо, спасибо!'" :date="'2024-10-20T10:20:30'" />
      <FriendText :onShowContextMenu="onShowContextMenu"  :text="'Привет, хорошо, спасибо!'" :date="'2024-10-20T10:20:30'" />
      <FriendText :onShowContextMenu="onShowContextMenu" :avatarVisible="true"  :text="'Привет, хорошо, спасибо!'" :date="'2024-10-20T10:20:30'" /> -->
      <!-- <ChatFileItem :onShowContextMenu="onShowContextMenu"  :right-icon="{ name: DownloadMinimalisticIcon, class: 'text-greyscale-500' }" :left-icon="{ name: FileTextBoldIcon, class: 'text-warning-500' }"/> -->
      <!-- <ChatFileItem :onShowContextMenu="onShowContextMenu"  :right-icon="{ name: DownloadMinimalisticIcon, class: 'text-greyscale-500' }" :left-icon="{ name: FileTextBoldIcon, class: 'text-warning-500' }"/> -->
      <!-- <ChatFileItem type="owner" :onShowContextMenu="onShowContextMenu"  :right-icon="{ name: DownloadMinimalisticIcon, class: 'text-greyscale-500' }" :left-icon="{ name: FileTextBoldIcon, class: 'text-white' }"/> -->
      <!-- <ChatFileItem type="owner" :onShowContextMenu="onShowContextMenu"  :right-icon="{ name: DownloadMinimalisticIcon, class: 'text-greyscale-500' }" :left-icon="{ name: FileTextBoldIcon, class: 'text-white' }"/> -->
      <!-- <div class="h-[2px]">1</div> -->
      <template v-for="item in chatStore.uploadingFiles" :key="item.id"> 
        <ChatFileItem 
          :info="item"
          type="owner"
          :onShowContextMenu="onShowContextMenu"
          :right-icon="{ name: DownloadMinimalisticIcon, class: 'text-greyscale-500' }" 
          :left-icon="{ name: FileTextBoldIcon, class: 'text-white' }"
        />
      </template>
      <!-- file uploads progress -->
      <div v-if="true" class="sticky bottom-0 flex flex-col gap-1 mt-auto">
        <template  v-for="(file, index) in chatStore.uploadingFiles" :key="index">
          <FileUploadProgress :progress="file.progress" :file="file" :index="index" />
        </template>
      </div>
      <!-- scroll down button -->
      <div v-if="showScrollDownButton" class="sticky bottom-0 flex justify-end">
        <ScrollDownButton @click="handleClickScrollDown"/>
      </div>
    </template>
     <!-- not start yet chat  -->
    <div v-else class="h-full">
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
      <SendMessage ref="refSendMessage" />
  </div>
  <ContextMenu :menu-items="menuItems" ref="refContextMenu" />
  <!-- emoji context menu -->
  <ContextMenu ref="refEmojiContextMenu" :menu-items="emojiMenuItems" class-menu="w-[229px]">
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
  </ContextMenu>
  <DeleteDialog 
    v-model="chatStore.contextMenu.deleteDialog" 
    :onDelete="onHandleDeleteMessage" 
    :onClose="() => chatStore.contextMenu.deleteDialog = false"
  />
</div>
</template>