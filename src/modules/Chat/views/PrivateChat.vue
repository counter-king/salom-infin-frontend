<script setup>
// cores
// componennts
import BaseCalendar from '@/components/UI/BaseCalendar.vue';
import BaseCalendarButton from '@/components/UI/BaseCalendarButton.vue';
import OwnerText from '../components/ChatArea/OwnerText.vue';
import FriendText from '../components/ChatArea/FriendText.vue';
import { ShowDate } from '../components/ChatArea';
import SendMessage from '../components/ChatArea/SendMessage.vue';
import EmojiPicker from 'vue3-emoji-picker'

const onSelectEmoji = (emoji) => {
  console.log(emoji)
}

</script>
<template>
 <div class="flex flex-col gap-6 overflow-y-auto h-full relative" style="height: calc(100% - 56px)">
   <!-- <ShowDate :date="'2024-10-20T10:20:30'" />
   <OwnerText  isReaded :text="'Привет, хорошо, спасибо!'" :date="'2024-10-20T10:20:30'" />
   <FriendText  avatar="h" :text="'Привет, хорошо, спасибо!'" :date="'2024-10-20T10:20:30'" />
   <FriendText  :text="'Привет, хорошо, спасибо!'" :date="'2024-10-20T10:20:30'" /> -->
   <EmojiPicker :native="true" @select="onSelectEmoji" />
   <div class="absolute bottom-4 w-full">
     <SendMessage  />
   </div>
 </div>
</template>