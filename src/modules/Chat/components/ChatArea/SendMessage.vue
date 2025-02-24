<script setup>
// cores
import { inject, onMounted, ref, watch } from 'vue';
import InputText from 'primevue/inputtext';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
// components
import EmojiStikers from './EmojiStikers.vue';
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

const { t } = useI18n();
const { uploadFiles } = useFileUpload();
const { send } = socket
const chatStore = useChatStore()
const route = useRoute();

// reactives
const message = ref("");
const refInput = inject("inputSendMessasgeRef"); 
const refFileInput = ref(null);
const showSendIcon = ref(false);
const isSimleStikerHovered = ref(false);

// methods
const sendNewMessageEvent = (data)=> {
    const payload = { command: 'new_message', chat_type: route.name == CHAT_ROUTE_NAMES.PRIVATE ? CHAT_TYPES.PRIVATE : CHAT_TYPES.GROUP, chat_id: route.params.id, text: data?.text, message_type: data.message_type } 
    send(JSON.stringify(payload))  
}
const sendReplayNewMessageEvent = (data)=> {
  const payload = { command: 'new_message', chat_type: route.name == CHAT_ROUTE_NAMES.PRIVATE ? CHAT_TYPES.PRIVATE : CHAT_TYPES.GROUP, chat_id: route.params.id, text: data?.text, message_type: data.message_type, replied_to_id: chatStore.contextMenu?.message?.message_id } 
  send(JSON.stringify(payload))  
}
const handleSendMessage = () => {
 if(!!message.value) {
    if(chatStore.contextMenu?.replay) {
      sendReplayNewMessageEvent({ text: message.value, message_type: MESSAGE_TYPES.TEXT })
    } else if(chatStore.contextMenu?.edit){
      chatStore.actionEditMessageById(chatStore.contextMenu?.message?.message_id, {chat: chatStore.contextMenu?.message.chat_id, replied_to: chatStore.contextMenu?.message?.replied_to?.id, text: message.value})
    } else {
      sendNewMessageEvent({ text: message.value, message_type: MESSAGE_TYPES.TEXT })
    }
 }
 message.value = '';
 chatStore.contextMenu = {}
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
}

const onClickSendMessage = () => {
  refInput.value.$el.focus()
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
watch(() => chatStore.contextMenu?.message?.text, (val) => {
    if(chatStore.contextMenu?.edit){
      message.value = chatStore.contextMenu?.message?.text
    }
})
watch([()=> chatStore.contextMenu], () => {
  refInput.value.$el.focus()
}, { deep: true })

// expose
defineExpose({
  refInput
})
onMounted(() => {
  refInput.value.$el.focus()
})

</script>
<template>
 <div 
  @click="onClickSendMessage"
  class="relative pt-1"
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
        <template v-if="chatStore.contextMenu?.message?.message_type !='text'">
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
  <div class="relative w-full bg-transparent">
    <!-- <base-input 
      ref="refInput"
      v-model="message"  
      input-class="p-[6px] pl-5 h-[52px] bg-white w-full text-sm font-medium text-greyscale-900 placeholder:text-sm placeholder:font-medium placeholder:text-greyscale-300"
      placeholder="Ввведите свое сообщение..."
      @keydown.enter="handleSendMessage"
    /> -->
    <InputText
      ref="refInput"
      v-model="message"
      type="text"
      size="small"
      :placeholder="t('enter-your-message')"
      @keydown.enter="handleSendMessage"
      :pt="{
        root: {
          class: [
            'w-full p-[6px] pl-5 pr-[130px] h-[52px] bg-white w-full rounded-xl  text-sm font-medium text-greyscale-900 placeholder:text-sm placeholder:font-medium placeholder:text-greyscale-300',
          ]
        }
      }"
    />
    <div class="flex gap-3 items-center absolute right-[10px] top-[6px] ">
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
        class=" bg-primary-500 rounded-xl w-10 h-10 min-h-[40px] min-w-[40px] max-w-[40px] max-h-[40px] flex items-center justify-center cursor-pointer"
        :class="{'!bg-greyscale-300 pointer-events-none': !showSendIcon}"
        >
        <base-iconify
          @click="handleSendMessage"
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
</style>