<script setup>
// cores
import { computed, inject, nextTick, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useDebounceFn } from '@vueuse/core';
// componennts
import OwnerText from '../components/ChatArea/OwnerText.vue';
import FriendText from '../components/ChatArea/FriendText.vue';
import { ShowDate } from '../components/ChatArea';
import SendMessage from '../components/ChatArea/SendMessage.vue';
import ScrollDownButton from '../components/ChatArea/ScrollDownButton.vue';
import DeleteDialog from '../components/DeleteDialog.vue';
import Galleria from 'primevue/galleria';
// services 
import FileUploadProgress from '../components/ChatArea/FileUploadProgress.vue';
import ContextMenu from '../components/ChatArea/ContextMenu.vue';
import ChatFileItem from '../components/ChatArea/ChatFileItem.vue';
import Empty from '@/components/Empty.vue';
import ChatImageItem from '../components/ChatArea/ChatImageItem.vue';
import FriendChatFileItem from '../components/ChatArea/FriendChatFileItem.vue';
import FriendChatImageItem from '../components/ChatArea/FriendChatImageItem.vue';
// contants
import { CHAT_ROUTE_NAMES, CHAT_TYPES, MESSAGE_TYPES } from '../constatns';
// utils
import { formatDay } from '@/utils/formatDate';
import { dispatchNotify } from '@/utils/notify';
// stores
import { useChatStore } from '../stores';
import { useAuthStore } from '@/modules/Auth/stores';
// socket
import { socket } from "@/services/socket";
// composables
import { useContextMenu } from '../composables/useContextMenu';
import { useFileUploadDrop } from '../composables/useFileUploadDrop';  
import { useScrollReachUp } from '../composables/useScrollReachUp';
import { useReadMessageObserver } from '../composables/useReadMessageObserver';

const { menuItems, refContextMenu } = useContextMenu();
const { onDragOver, onDragLeave, onDrop } = useFileUploadDrop();
const { handleScrollReachUp, hasNext, page, pageSize } = useScrollReachUp();
const { refMessagesContainer, refMessageElements, initializeReadMessageObserver } = useReadMessageObserver();

const { t } = useI18n();
const route = useRoute();
const router = useRouter()
const chatStore = useChatStore()
const authStore = useAuthStore()
const { send } = socket()

// reactives
const showScrollDownButton = ref(false);
const refSendMessage = ref(null);
const refEmojiContextMenu = ref(null);
const emojiMenuItems = ref([]);
const inputSendMessageHeight = ref(90);
const initialRenderComplete = ref(false);
const activeImageIndex = ref(0);
const isGalleriaVisible = ref(false);
// computed
const getImageListByFilter = computed(()=> chatStore.messageListByChatId?.filter(item=>item?.message_type == MESSAGE_TYPES.IMAGE))
const imageGalleriaValues = computed(() => getImageListByFilter?.value?.map(item=>item?.attachments?.file?.url))

// inject
const refChatArea = inject("refChatArea");
// methods
// websocket event
const sendChatHandshake = ()=> {
  const payload = { command: 'chat_handshake', chat_type: route.name == CHAT_ROUTE_NAMES.PRIVATE ?  CHAT_TYPES.PRIVATE : CHAT_TYPES.GROUP, chat_id: route.params?.id }
  send(JSON.stringify(payload))
}
// when scroll down, scrollDwonButton will be visible
const handleScroll = (event) => {
  if(event && event.target && event.target.scrollHeight - event.target.clientHeight >  Math.floor(event.target.scrollTop + 100)  ) {
    showScrollDownButton.value = true
  } else {
    showScrollDownButton.value = false
  }
   // Only run handleScrollReachUp if initial render is complete
   if (initialRenderComplete.value) {
      handleScrollReachUp(event, handleScrollUp);
  }
}

const handleScrollUp = () => {
  refChatArea.value?.scrollTo({
    top: refChatArea.value.clientHeight,
  });
}

const handleScrollDown = () => {
  refChatArea.value?.scrollTo({
    top: refChatArea.value.scrollHeight,
    // behavior: 'smooth'
  });
}
const handleScrollDownSmooth = () => {
  refChatArea.value?.scrollTo({
    top: refChatArea.value.scrollHeight,
    behavior: 'smooth'
  });
}
const onShowContextMenu = (event, message, index) => {
  chatStore.contextMenu.tempMessage = message
  chatStore.contextMenu.index = index
  refContextMenu.value.menu.show(event);
}

const handleClickEmoji = (emojiType, messageId) => {
  chatStore.contextMenu.tempMessage = { message_id: messageId }
  menuItems.value[0].action(emojiType, emojiType)
}

const onShowEmojiContextMenu = (event, userReactionList) => {
  emojiMenuItems.value = userReactionList.map((item)=>({
      label: `${item?.first_name} ${item?.last_name}`,
      avatar: item?.avatar,
      color: item?.color,
      iconName: true,
      command: () => {
      } 
   }))
  
  refEmojiContextMenu.value.menu.show(event);
}

const onHandleDeleteMessage = async() => {
  await chatStore.actionDeleteMessageById(chatStore.contextMenu?.message?.message_id)
  chatStore.messageListByChatId = chatStore.messageListByChatId.filter(item=> item?.message_id != chatStore.contextMenu?.message?.message_id)
}

const onClickChatArea = () => {
  if(refSendMessage.value){
    refSendMessage.value.refInput.$el.focus()
  }
}

const handleClickImage = (message) => {
  isGalleriaVisible.value = true;
  const clickedImageIndex = getImageListByFilter?.value?.findIndex(item=> item?.message_id == message?.message_id)
  if(clickedImageIndex != -1){
    activeImageIndex.value = clickedImageIndex
  }
}

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
  // Joriy xabar va oldingi xabarni olish
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

const getMessageList = useDebounceFn(async()=>{
  const response = await chatStore.actionGetMessageListByChatId({ chat:route.params?.id, page:1, page_size: 20}, true);
      hasNext.value = response?.count > page.value * pageSize.value
      page.value += 1
      // make scroll down after loading new data
      setTimeout(() => {
        handleScrollDown()
        initializeReadMessageObserver()
      }, 10)
      // every route change, reset context menu
      chatStore.contextMenu = {}
}, 300)

watch(
  () => route.params?.id,
  async (newId, oldId) => {
    if (newId !== oldId && route.name === CHAT_ROUTE_NAMES.PRIVATE) {
      chatStore.selectedUser = await chatStore.actionGetPrivateChatById(newId);
      // if there is chat_id, then send chat handshake, otherwise don't
      sendChatHandshake()
      getMessageList()
    }
  }
);


onMounted(async () => {
  try {
    
    chatStore.selectedUser = await chatStore.actionGetPrivateChatById(route.params?.id, true);
    // if there is chat_id, then send chat handshake, otherwise don't
    sendChatHandshake()
    const response = await chatStore.actionGetMessageListByChatId({ chat:route.params?.id, page:1, page_size: 20 }, true);
    hasNext.value = response?.count > page.value * pageSize.value
    page.value += 1
    // if selected user don't exist in the list then add it
    if(!chatStore.privateChatList.some(item => item?.chat_id == chatStore.selectedUser?.chat_id)){
      chatStore.privateChatList.unshift(chatStore.selectedUser)
    }
  } catch(e) {
    if(e.status == 403){
      router.push({ name: CHAT_ROUTE_NAMES.CHAT_INDEX})
      dispatchNotify(null, 'Доступ запрещен')
    } else if(e.status == 404){
      router.push({ name: CHAT_ROUTE_NAMES.CHAT_INDEX})
    }
  }
  // make scroll down after loading new data
  handleScrollDown()
  // initialize read message observer to get correct ref values
  initializeReadMessageObserver()  
})

onMounted(() => {
  // tracking inputSendMessage when div's height change 
  if(!!refSendMessage.value?.InputSendMessageRows) {    
    watch([()=> refSendMessage.value?.InputSendMessageRows, () => chatStore.contextMenu], async() => {
      await nextTick(); 
      inputSendMessageHeight.value = refSendMessage.value.InputSendMessageWrapperRef.scrollHeight
    }, { immediate: true })
  }
  
  // avoid scroll event that get next page data working when initail loading happen 
  setTimeout(() => {
    initialRenderComplete.value = true;
  }, 500);
})

</script>
<template>
 <div class="h-full relative">
  <div
    ref="refChatArea" class="flex flex-col gap-2 px-6 py-4 overflow-y-auto relative"
    :style="`height: calc(100% - ${inputSendMessageHeight + 94}px)`" 
    @scroll="handleScroll"
    @click="onClickChatArea"
    @dragover.prevent="onDragOver"
    @dragleave.prevent="onDragLeave"
    @drop.prevent="onDrop"
    @contextmenu.prevent=""
    >
    <template v-if="chatStore.messageListByChatIdLoading">
        <base-spinner />
    </template>
    <template v-else>
      <!-- get more Message loading -->
      <div class="flex justify-center items-center" v-if="chatStore.messageListByChatIdAddMoreLoading">
        <div class="w-9 h-9 bg-white p-1 rounded-full" style="box-shadow: 0px 2px 4px 0px rgba(47, 61, 87, 0.03), 0px 1px 1px 0px rgba(95, 110, 169, 0.03)">
          <base-spinner />
        </div>
      </div>
      <!-- message list -->
      <div ref="refMessagesContainer" class="flex flex-col gap-1 h-full" v-if="!!chatStore.messageListByChatId?.length">
        <template v-for="(message, index) in chatStore.messageListByChatId" :key="message?.message_id">
          <template v-if="showDateByCalculate(index)">
              <ShowDate :classNames="{ 'mb-5': index == 0, 'my-5': index != 0}" :date="message.created_date" />
          </template>
          <!-- owner chat -->
          <template v-if="message?.sender?.id == authStore.currentUser?.id" >
            <template v-if="message?.message_type != MESSAGE_TYPES.TEXT && message?.message_type != MESSAGE_TYPES.LINK">
              <template v-if="message?.message_type == MESSAGE_TYPES.IMAGE">
                <ChatImageItem
                  :handleClickImage="handleClickImage"
                   ref="refMessageElements"
                  :data-message-id="message?.message_id"
                  :data-message-is-read="message?.is_read"
                  :data-message-user-id="message?.sender?.id"
                  :index="index"
                  :message="message"
                  :handleClickEmoji="handleClickEmoji"
                  :onShowContextMenu="onShowContextMenu"
                  :onShowEmojiContextMenu="onShowEmojiContextMenu"
                />
              </template>
              <template v-else>
                <ChatFileItem 
                 ref="refMessageElements"
                :data-message-id="message?.message_id"
                :data-message-is-read="message?.is_read"
                :data-message-user-id="message?.sender?.id"
                :message="message"
                :handleClickEmoji="handleClickEmoji"
                :onShowContextMenu="onShowContextMenu" 
                :onShowEmojiContextMenu="onShowEmojiContextMenu" 
              />
              </template>
            </template>
            <template v-else>
              <OwnerText 
                ref="refMessageElements"
                :data-message-id="message?.message_id"
                :data-message-is-read="message?.is_read"
                :data-message-user-id="message?.sender?.id"
                :handleClickEmoji="handleClickEmoji"
                :onShowContextMenu="onShowContextMenu" 
                :onShowEmojiContextMenu="onShowEmojiContextMenu" 
                :message="message"
                :index="index"
                :messageInnerClass="{'!rounded-br-[4px]': showFriendTextAvatar(index), '!rounded-tr-[4px]': !showFriendTextAvatar(index)}"
              />
            </template>
          </template>
          <!-- friend chat -->
          <template v-else>
            <template v-if="message?.message_type != MESSAGE_TYPES.TEXT && message?.message_type != MESSAGE_TYPES.LINK">
              <template v-if="message?.message_type == MESSAGE_TYPES.IMAGE">
                <FriendChatImageItem
                  ref="refMessageElements"
                  :handleClickImage="handleClickImage"
                  :data-message-id="message?.message_id"
                  :data-message-is-read="message?.is_read"
                  :data-message-user-id="message?.sender?.id"
                  :message="message"
                  :index="index"
                  :handleClickEmoji="handleClickEmoji"
                  :onShowContextMenu="onShowContextMenu"
                  :onShowEmojiContextMenu="onShowEmojiContextMenu"
                  :avatarVisible="showFriendTextAvatar(index)"
                  :classNames="[{ 'mt-5': showFriendTextAvatar(index) }]"
                />
              </template>
              <template v-else>
                <FriendChatFileItem 
                  ref="refMessageElements"
                  :data-message-id="message?.message_id"
                  :data-message-is-read="message?.is_read"
                  :data-message-user-id="message?.sender?.id"
                  :message="message"
                  :handleClickEmoji="handleClickEmoji"
                  :onShowContextMenu="onShowContextMenu"
                  :onShowEmojiContextMenu="onShowEmojiContextMenu"
                  :avatarVisible="showFriendTextAvatar(index)"
                  :classNames="[{ 'mt-5': showFriendTextAvatar(index) }]"
                />
              </template>
            </template>
            <template v-else>
              <FriendText 
                ref="refMessageElements"
                :data-message-id="message?.message_id"
                :data-message-is-read="message?.is_read"
                :data-message-user-id="message?.sender?.id"
                :handleClickEmoji="handleClickEmoji"
                :onShowContextMenu="onShowContextMenu" 
                :onShowEmojiContextMenu="onShowEmojiContextMenu" 
                :avatarVisible="showFriendTextAvatar(index)" 
                :message="message"
                :classNames="[{ 'mt-5': showFriendTextAvatar(index) }]"
              />
          </template>
        </template>
        </template>
        <template v-for="(message, index) in chatStore.uploadingFiles" :key="index"> 
          <ChatFileItem 
            :message="message"
            :handleClickEmoji="handleClickEmoji"
            :onShowContextMenu="onShowContextMenu" 
            :onShowEmojiContextMenu="onShowEmojiContextMenu" 
          />
        </template>
        <!-- file uploads progress -->
        <div class="sticky bottom-0 flex flex-col gap-1 mt-auto">
          <template  v-for="(message, index) in chatStore.uploadingFiles" :key="index">
            <FileUploadProgress :progress="message.progress" :file="message?.attachments?.file" :index="index" />
          </template>
        </div>
        <!-- scroll down button -->
        <div v-if="showScrollDownButton" class="sticky bottom-0 flex justify-end">
          <ScrollDownButton @click="handleScrollDownSmooth"/>
        </div>
      </div>
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
  <div class="px-6 mt-2">
      <SendMessage ref="refSendMessage" />
  </div>
  <ContextMenu :menu-items="menuItems" ref="refContextMenu" />
  <!-- emoji context menu -->
  <ContextMenu ref="refEmojiContextMenu" :menu-items="emojiMenuItems" class-menu="w-[229px]">
   <template  #default="{ item }">
     <base-avatar
       :label="item?.label"
       :image="item?.avatar?.url"
       :color="item?.color"
       avatar-classes="!w-6 !h-6"
       label-classes="text-sm font-semibold text-greyscale-900"
     />
     <span class="text-xs font-medium">{{ item?.label }}</span>
   </template>
  </ContextMenu>
  <DeleteDialog 
    v-model="chatStore.contextMenu.deleteDialog" 
    :onDelete="onHandleDeleteMessage" 
    :onClose="() => chatStore.contextMenu.deleteDialog = false"
    :isDeleteLoading="chatStore.deleteMessageByIdLoading"
  />
</div>
<Galleria 
  v-model:activeIndex="activeImageIndex"
  v-model:visible="isGalleriaVisible"
  :value="imageGalleriaValues"
  containerStyle="max-width: 850px"
  :circular="true" :fullScreen="true"
  :showItemNavigators="true"
  :showThumbnails="false"
  >
  <template #item="slotProps">
    <div class="h-[500px] rounded-xl overflow-hidden">
      <img
        :src="slotProps.item"
        :alt="slotProps.item?.alt"
        class="w-full h-full object-contain"
      />
    </div>
  </template>
</Galleria>
</template>