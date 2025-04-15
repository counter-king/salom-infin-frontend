<script setup>
// core
import { computed } from 'vue';
import { useRoute } from 'vue-router';
// components
import { ChevronDown20SolidIcon } from '@/components/Icons';
// sore
import { useChatStore } from '../../stores';
// contatns
import { CHAT_ROUTE_NAMES } from '../../constatns';

const chatStore = useChatStore()
const route = useRoute()
// props
const props = defineProps({
  btnClass: {
   type: String
  }
})

const unReadMessagesCount = computed(() => {
  const isPrivateChat = route.name == CHAT_ROUTE_NAMES.PRIVATE
  const chatList = isPrivateChat ? chatStore.privateChatList : chatStore.groupChatList
  const chat = chatList.find(item=> item.chat_id == (chatStore.selectedUser?.chat_id || chatStore.selectedGroup?.chat_id))
  return chat?.unread_count;
})
</script>
<template>
 <div 
    class="flex items-center justify-center bg-white rounded-full w-10 h-10 relative cursor-pointer drop-shadow-2xl"
    :class="props.btnClass"
    >
   <base-iconify
     :icon="ChevronDown20SolidIcon"
     class="!w-5 !h-5 text-greyscale-900"
    />
    <div v-if="!!unReadMessagesCount" class="flex items-center justify-center text-[10px] text-white font-semibold h-4 w-4 bg-critic-500 rounded-full absolute top-[-2px] right-0 z-10">
      {{unReadMessagesCount  }}
    </div>
 </div>
</template>