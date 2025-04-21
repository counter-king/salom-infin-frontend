<script setup>
// cores
import { computed, inject, nextTick, onMounted, onUnmounted, ref, useModel, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useDebounceFn } from '@vueuse/core';
// components
import EmojiStikers from './EmojiStikers.vue';
import Textarea from 'primevue/textarea';
import FileTypeIcon from '../FileTypeIcon.vue';
// icons
import { ForwardIcon, PaperclipLinearIcon, PenIcon, PlainBoldIcon, SmileCircleLinearIcon, XMarkSolidIcon } from '@/components/Icons';
// composables
import { useFileUpload } from '../../composables/useFileUpload';
// stores
import { useChatStore } from '../../stores';
// utils
import { CHAT_ROUTE_NAMES, CHAT_TYPES, MESSAGE_TYPES } from '../../constatns';
// webocket
import { socket } from "@/services/socket";

// props
const props = defineProps({
  modelValue: {
    type: Number
  }
})

const { t } = useI18n();
const { uploadFiles } = useFileUpload();
const { send } = socket()
const chatStore = useChatStore()
const route = useRoute();
// reactives
const message = ref("");
const refInput = inject("inputSendMessasgeRef"); 
const refFileInput = ref(null);
const showSendIcon = ref(false);
const isSimleStikerHovered = ref(false);
const isFocused = ref(false);
const isCtrlAllPressed = ref(false);
const InputSendMessageWrapperRef = ref(null);
const rows = ref(1);
// emits
const emit = defineEmits(['update:modelValue'])
// inject
const refChatArea = inject("refChatArea");
const modelValue = useModel(props, 'modelValue')

const isPrivateChat = computed(()=> route.name == CHAT_ROUTE_NAMES.PRIVATE)
// checking there are http or https regex
const urlRegex = /(^|\s)(https?:\/\/[^\s]+)/g;
// methods
const sendNewMessageEvent = (data)=> {
  const payload = { command: 'new_message', chat_type: isPrivateChat.value ? CHAT_TYPES.PRIVATE : CHAT_TYPES.GROUP, chat_id: isPrivateChat.value ? chatStore.selectedUser?.chat_id : chatStore.selectedGroup?.chat_id, text: data?.text, message_type: data.message_type } 
  send(JSON.stringify(payload))  
}

const sendReplayNewMessageEvent = (data)=> {
  const payload = { command: 'new_message', chat_type: isPrivateChat.value ? CHAT_TYPES.PRIVATE : CHAT_TYPES.GROUP, chat_id: isPrivateChat.value ? chatStore.selectedUser?.chat_id : chatStore.selectedGroup?.chat_id, text: data?.text, message_type: data.message_type, replied_to_id: chatStore.contextMenu?.message?.message_id } 
  send(JSON.stringify(payload))  
}

const sendMessageIsTyping = useDebounceFn(()=>{
  const payload = { command: 'typing', chat_type: isPrivateChat.value ? CHAT_TYPES.PRIVATE : CHAT_TYPES.GROUP, chat_id: isPrivateChat.value ? chatStore.selectedUser?.chat_id : chatStore.selectedGroup?.chat_id } 
  send(JSON.stringify(payload))  
}, 100);

const sendChatHandshake = ()=> {
  const payload = { command: 'chat_handshake',  chat_type: isPrivateChat.value ? CHAT_TYPES.PRIVATE : CHAT_TYPES.GROUP, chat_id: isPrivateChat.value ? chatStore.selectedUser?.chat_id : chatStore.selectedGroup?.chat_id }
  send(JSON.stringify(payload))
}

const resetInputProperties = (event) => {
  message.value = '';
  rows.value = 1;
  if(event){
    event.preventDefault();
  }
}

const handleSendMessage = async (event) => {

 if(event.key == "Enter"){
    // when shift or ctrl pressed with enter
    if(event.shiftKey || event.ctrlKey){
      if(rows.value < 9){
        rows.value += 1;
      }
    }
    else if(!message.value.trim()){
      event.preventDefault();
      resetInputProperties()
    }
    else if(!!message.value.trim()){
        // every change, urlRegex last index reset, to avoid unexpected checking result
        urlRegex.lastIndex = 0;
        // replay message
        if(chatStore.contextMenu?.replay) {
          if(urlRegex.test(message.value)){
            sendReplayNewMessageEvent({ text: message.value, message_type: MESSAGE_TYPES.LINK })
          } else {
            sendReplayNewMessageEvent({ text: message.value, message_type: MESSAGE_TYPES.TEXT })
          }
        // edit message
        } else if(chatStore.contextMenu?.edit){
          if(urlRegex.test(message.value)){
            chatStore.actionEditMessageById(chatStore.contextMenu?.message?.message_id, {chat: chatStore.contextMenu?.message.chat_id, replied_to: chatStore.contextMenu?.message?.replied_to?.id, text: message.value, message_type: MESSAGE_TYPES.LINK })
          } else {
            chatStore.actionEditMessageById(chatStore.contextMenu?.message?.message_id, {chat: chatStore.contextMenu?.message.chat_id, replied_to: chatStore.contextMenu?.message?.replied_to?.id, text: message.value, message_type: MESSAGE_TYPES.TEXT})
          }
        // new message
        } else {
          // link message
          if(urlRegex.test(message.value)){
            sendNewMessageEvent({ text: message.value, message_type: MESSAGE_TYPES.LINK })
          } else {
            sendNewMessageEvent({ text: message.value, message_type: MESSAGE_TYPES.TEXT })
          } 
        }
        // reset values
        resetInputProperties(event)
        // replay or edit reset, not show them in ui
        chatStore.contextMenu = {}
        // 
        if(chatStore.replayedMessageClicked){
          modelValue.value = 1
          chatStore.replayedMessageClicked = false
          await chatStore.actionGetMessageListByChatId({ chat: chatStore.selectedUser?.chat_id, page: 1, page_size: 20 }, true);
          refChatArea.value.scrollTop = refChatArea.value.scrollHeight
        }
    }
 } 

 // when ctrl + all is pressed, that works
 else if (event.ctrlKey && (event.key === 'A' || event.key === 'a')){
  isCtrlAllPressed.value = true
 }
 else if(event.key == "Backspace" && rows.value > 1) {
    rows.value -= 1;
    // if ctrl + all is pressed, reset    
    if(isCtrlAllPressed.value){
      rows.value = 1
      isCtrlAllPressed.value = false
    }
 } 
}

const handleMessageByIcon = () => {
 if(!!message.value.trim()){
        // every change, urlRegex last index reset, to avoid unexpected checking result
        urlRegex.lastIndex = 0;
        // replay message
        if(chatStore.contextMenu?.replay) {
          if(urlRegex.test(message.value)){
            sendReplayNewMessageEvent({ text: message.value, message_type: MESSAGE_TYPES.LINK })
          } else {
            sendReplayNewMessageEvent({ text: message.value, message_type: MESSAGE_TYPES.TEXT })
          }
        // edit message
        } else if(chatStore.contextMenu?.edit){
          if(urlRegex.test(message.value)){
            chatStore.actionEditMessageById(chatStore.contextMenu?.message?.message_id, {chat: chatStore.contextMenu?.message.chat_id, replied_to: chatStore.contextMenu?.message?.replied_to?.id, text: message.value, message_type: MESSAGE_TYPES.LINK })
          } else {
            chatStore.actionEditMessageById(chatStore.contextMenu?.message?.message_id, {chat: chatStore.contextMenu?.message.chat_id, replied_to: chatStore.contextMenu?.message?.replied_to?.id, text: message.value, message_type: MESSAGE_TYPES.TEXT})
          }
        // new message
        } else {
          // link message
          if(urlRegex.test(message.value)){
            sendNewMessageEvent({ text: message.value, message_type: MESSAGE_TYPES.LINK })
          } else {
            sendNewMessageEvent({ text: message.value, message_type: MESSAGE_TYPES.TEXT })
          } 
        }
        // reset values
        message.value = '';
        rows.value = 1;
        chatStore.contextMenu = {}
    }
}

const onChangeInput = () => {
  sendMessageIsTyping()
  sendChatHandshake()
}

// when emoji selected
const handleSelectEmoji = (e) => {
    message.value +=e.i;
}

const handleAttachmentClick = () => {
  refFileInput.value.click();
}

const handleFileInputChange = (event) => {
    uploadFiles(event.target.files);
}

const onCancelIconReplay = () => {
  chatStore.contextMenu = { edit: false, replay: false }
  resetInputProperties()
}

const onClickSendMessage = () => {
  refInput.value.$el.focus()
}

const handlePaste = async() => {
  await nextTick(); 
  setTimeout(() => {
    rows.value = message.value.split("\n").length
  }, 10);
  
}

const debouncedUploadFile = useDebounceFn((file) => {
    uploadFiles([file]);
  }, 400);

const handleCopyPasteImage = (e) => {
    const items = e.clipboardData?.items
    if (!items) return
    if (items[0]?.type.startsWith("image/")) {
        const file = items[0].getAsFile()
        debouncedUploadFile(file)
      }
}

// showSend icon show or hide
watch(message, (val) => {
 if(!!val) {
   showSendIcon.value = true;
 } else {
   showSendIcon.value = false;
 }
})

// when edit, set message value from store
watch(() => chatStore.contextMenu.edit, (val) => {
    if(chatStore.contextMenu?.edit){
      message.value = chatStore.contextMenu?.message?.text
      rows.value = chatStore.contextMenu?.message?.text.split("\n").length
    }
})
// when replay, set message value from store
watch(() => chatStore.contextMenu.replay, (val) => {
    if(chatStore.contextMenu?.replay){
      resetInputProperties()
    }
})

// tracking input focues when context menu is open 
watch([()=> chatStore.contextMenu], () => {
  refInput.value.$el.focus()
}, { deep: true })

// every route chnage, rest message value
watch(() => route.params?.id, async (old, newOne) => {
  if(old !== newOne){
    resetInputProperties()
  }
})
// expose
defineExpose({
  refInput,
  InputSendMessageWrapperRef,
  InputSendMessageRows: rows
})

onMounted(()=>{
  refInput.value.$el.focus()
  document.addEventListener("paste", handleCopyPasteImage)
})

onUnmounted(() => {
  document.removeEventListener("paste", handleCopyPasteImage)
})

</script>
<template>
 <div 
  @click="onClickSendMessage"
  class="relative pt-1"
  ref="InputSendMessageWrapperRef"
  :class="{'pt-[36px]': chatStore.contextMenu?.edit || chatStore.contextMenu?.replay}"
  >
  <!-- chat replay and edit -->
  <div 
    v-if="chatStore.contextMenu?.edit || chatStore.contextMenu?.replay"
    class="flex justify-between absolute gap-2 items-center px-2 pt-2 pb-10 top-[0px] bg-white w-full rounded-t-xl select-none"
    >
    <div class="flex items-center gap-2 w-[95%]">
      <base-iconify 
        :icon="chatStore.contextMenu?.edit ? PenIcon : ForwardIcon"
        class="!h-4 !w-4 rotate-y-180 text-primary-500"
      />
      <div class="flex items-center gap-2 w-[95%] text-xs h-[16px] font-medium text-primary-500 pl-2 border-l-[2px] border-warning-500">
        <template v-if="chatStore.contextMenu?.message?.message_type != MESSAGE_TYPES.TEXT">
          <FileTypeIcon :type="chatStore.contextMenu?.message?.message_type" />
        </template>
        <p class="truncate w-full">{{ chatStore.contextMenu?.message?.text  }}</p>
      </div>
    </div>
    <div class="p-1 cursor-pointer">
      <base-iconify 
        @click="onCancelIconReplay"
        :icon="XMarkSolidIcon"
        class="!h-4 !w-4"
      />
    </div>
  </div>
  <!-- seding input -->
  <div 
    class="relative w-full border flex items-center min-h-[52px] max-h-[150px] p-[6px] pl-5 pr-[130px] bg-white rounded-xl"
    :class="{'border-primary-500': isFocused }"
    > 
    <Textarea
      v-model="message"
      @input="onChangeInput"
      @keydown="handleSendMessage"
      @paste="handlePaste"
      ref="refInput"
      @focus="isFocused = true"
      @blur="isFocused = false"
      :disabled="chatStore.messageListByChatIdLoading"
      size="large"
      :pt="{
        root: {
          class: [
            'custom-scroll w-full max-h-[130px] overflow-y-auto border-none resize-none !shadow-none !p-0 text-sm font-medium text-greyscale-900 placeholder:text-sm placeholder:font-medium placeholder:text-greyscale-300',
          ]
        }
      }"
      :placeholder="t('enter-your-message')"
      :rows="rows"
    ></Textarea>
    <div class="flex gap-3 items-center absolute right-[10px] top-[6px]" :class="{'!top-auto bottom-[6px]': rows > 1}">
      <div
        @mouseover="isSimleStikerHovered = true" 
        @mouseleave="isSimleStikerHovered = false"
        >
        <base-iconify
          :icon="SmileCircleLinearIcon"
          class="!h-5 !w-5 text-greyscale-300 cursor-pointer"
        />
        <EmojiStikers 
          :select-emoji="handleSelectEmoji"
          @mouseleave="isSimleStikerHovered = false"
          v-if="isSimleStikerHovered"  
        />
      </div>
      <base-iconify
        @click="handleAttachmentClick"
        :icon="PaperclipLinearIcon"
        class="!h-5 !w-5 text-greyscale-300 cursor-pointer"
      />
      <div
        @click="handleMessageByIcon"
        class=" bg-primary-500 rounded-xl w-10 h-10 min-h-[40px] min-w-[40px] max-w-[40px] max-h-[40px] flex items-center justify-center cursor-pointer"
        :class="{'!bg-greyscale-300 pointer-events-none': !showSendIcon}"
        >
        <base-iconify
          :icon="PlainBoldIcon"
          class="!h-5 !w-5 text-white"
        />
      </div>
    </div>
    <!-- input file upload hidden -->
    <input 
      type="file" 
      ref="refFileInput" 
      class="hidden" 
      :multiple="true"
      @change="handleFileInputChange" 
    />
  </div>
</div>
</template>
<style scoped>
::v-deep(.p-inputtext) {
  box-shadow: 0px 4px 10px 0px rgba(47, 61, 87, 0.04), 0px 1px 1px 0px rgba(64, 64, 64, 0.03)!important;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}

.custom-scroll::-webkit-scrollbar {
    display: none;
}

.custom-scroll {
    scrollbar-width: none;
    -ms-overflow-style: none;
}
</style>