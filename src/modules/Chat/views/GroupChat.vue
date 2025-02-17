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
import ChatFileItem from '../components/ChatArea/ChatFileItem.vue';
import { DownloadMinimalisticIcon, FileTextBoldIcon } from '@/components/Icons';
import Empty from '@/components/Empty.vue';
// stores
import { useChatStore } from '../stores';
import { useAuthStore } from '@/modules/Auth/stores';
import { formatDay } from '@/utils/formatDate';
// composables
import { useContextMenu } from '../composables/useContextMenu';
import { useFileUploadDrop } from '../composables/useFileUploadDrop';  
// constatns
import { CHAT_ROUTE_NAMES, MESSAGE_TYPES } from '../constatns';
// composables
const { menuItems, refContextMenu } = useContextMenu();
const { onDragOver, onDragLeave, onDrop } = useFileUploadDrop();

const { t } = useI18n();
const route = useRoute();
const chatStore = useChatStore()
const authStore = useAuthStore()
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

const onShowContextMenu = (event, message, index) => {
  refContextMenu.value.menu.show(event);
  chatStore.contextMenu.tempMessage = message
  chatStore.contextMenu.index = index
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


const showDateByCalculate = (index) => {
  const previouMessageCreatedDate = chatStore.messageListByChatId[index - 1]?.created_date
  const nowMessageCreatedDate = chatStore.messageListByChatId[index]?.created_date
  if(formatDay(nowMessageCreatedDate) != formatDay(previouMessageCreatedDate)){
    return true
  } else {
    return false
  }
}

const showFriendTextAvatar = (index) => {
  // hozirgi xabar va oldingi xabarni olish
  const nowMessage = chatStore.messageListByChatId[index]
  const perviousMessage = chatStore.messageListByChatId[index - 1]
  
  // Avatar quyidagi hollarda ko'rsatiladi:
  // 1. Agar bu birinchi xabar bo'lsa (oldingi xabar yo'q)
  // 2. Agar oldingi xabar boshqa foydalanuvchidan bo'lsa
  // 3. Agar xabar boshqa kunda yuborilgan bo'lsa
  return !perviousMessage || 
         perviousMessage.sender?.id !== nowMessage.sender?.id ||
         formatDay(perviousMessage.created_date) !== formatDay(nowMessage.created_date)
}
// error bor
watch(
  () => route.params?.id,
  async (newId, oldId) => {
    if (newId !== oldId && route.name === CHAT_ROUTE_NAMES.GROUP) {
      await chatStore.actionGetMessageListByChatId({chat:newId}, true);
      chatStore.selectedGroup = await chatStore.actionGetGroupChatById(newId);
    }
  }
);

onMounted(async () => {
  chatStore.selectedGroup = await chatStore.actionGetGroupChatById(route.params?.id);
  await chatStore.actionGetMessageListByChatId({chat:route.params?.id}, true);
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
    <template v-if="chatStore.messageListByChatIdLoading">
        <base-spinner />
    </template>
    <template v-else>
      <template v-if="!!chatStore.messageListByChatId.length">
        <template v-for="(message, index) in chatStore.messageListByChatId" :key="message?.id">
          <template v-if="showDateByCalculate(index)">
              <ShowDate :date="message.created_date" />
          </template>
          <!-- owner chat -->
          <template v-if="message?.sender?.id == authStore.currentUser?.id" >
            <template v-if="message.message_type != MESSAGE_TYPES.TEXT">
              <ChatFileItem type="owner" :onShowContextMenu="onShowContextMenu"  :right-icon="{ name: DownloadMinimalisticIcon, class: 'text-greyscale-500' }" :left-icon="{ name: FileTextBoldIcon, class: 'text-white' }"/> 
            </template>
            <template v-else>
              <OwnerText 
                :onShowContextMenu="onShowContextMenu" 
                :onShowEmojiContextMenu="onShowEmojiContextMenu" 
                :message="message"
                :index="index"
              />          
            </template>
          </template>
          <!-- friend chat -->
          <template v-else>
            <template v-if="message.message_type != MESSAGE_TYPES.TEXT">
              <ChatFileItem :onShowContextMenu="onShowContextMenu"  :right-icon="{ name: DownloadMinimalisticIcon, class: 'text-greyscale-500' }" :left-icon="{ name: FileTextBoldIcon, class: 'text-white' }"/> 
            </template>
            <template v-else>
              <FriendText 
                :onShowContextMenu="onShowContextMenu" 
                :avatarVisible="showFriendTextAvatar(index)" 
                :message="message"
                :index="index"  
              />
          </template>
        </template>
        </template>
        <template v-for="item in chatStore.uploadingFiles" :key="item?.id"> 
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
    </template>
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