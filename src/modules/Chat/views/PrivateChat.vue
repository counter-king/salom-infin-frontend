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

// reactives
const showScrollDownButton = ref(false);
const refChatArea = ref(null);
// methods
const onSelectEmoji = (emoji) => {
  console.log(emoji)
}
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
  // document.querySelector('.chat-area').scroll({
  //   top: document.querySelector('.chat-area').scrollHeight,
  //   behavior: 'smooth'
  // })
}
</script>
<template>
 <div class="h-full relative">
  <div ref="refChatArea" class="px-6 py-4 overflow-y-auto relative" @scroll="handleScroll" style="height: calc(100% - 135px)">
    <ShowDate :date="'2024-10-20T10:20:30'" />
    <OwnerText  isReaded :text="'Привет, хорошо, спасибо!'" :date="'2024-10-20T10:20:30'" />
    <FriendText  :text="'Привет, хорошо, спасибо!'" :date="'2024-10-20T10:20:30'" />
    
    <div class="h-[4000px]">1</div>
    <div class="sticky bottom-0 flex justify-end">
      <ScrollDownButton @click="handleClickScrollDown" :btn-class="{'hidden': !showScrollDownButton}" />
    </div>
  </div>
  <div class="flex flex-col gap-3 px-6">
      <SendMessage  />
  </div>
</div>
</template>