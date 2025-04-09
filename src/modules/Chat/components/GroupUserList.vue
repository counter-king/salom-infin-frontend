<script setup>
// core
import { useRouter } from 'vue-router';
// components
import GroupUserItem from './GroupUserItem.vue';
// stores
import { useChatStore } from '../stores';
import { useAuthStore } from '@/modules/Auth/stores';
// constants
import { CHAT_ROUTE_NAMES, COMPONENT_TYPES } from '../constatns';

const chatStore = useChatStore()
const router = useRouter()
const authStore = useAuthStore()

// props
const props = defineProps({
  onClickFun: {
   type: Function
  }
})

const onCreateUserChat = async (user) => {
  const data = await chatStore.actionCreatePrivateChat({ member_id: user.id });  
  chatStore.selectedUser = data
  // if user don't exist in the list then add it
  if(!chatStore.privateChatList.some(item => item.chat_id == data.chat_id)){
    chatStore.privateChatList.unshift(data)
  }
  router.push({ name: CHAT_ROUTE_NAMES.PRIVATE, params: { id: data.chat_uid }, query :{ tab: undefined} })
}

const onClickChatPrivateUser = (user) => {
  if(user.private_chat_uid && user?.id != authStore.currentUser?.id){
    router.push({ name: CHAT_ROUTE_NAMES.PRIVATE, params: { id: user.private_chat_uid }, query :{ tab: undefined} })
    props.onClickFun(COMPONENT_TYPES.FILES)
  } else if(!user.private_chat_uid){
    onCreateUserChat(user)
  }
}

</script>
<template>
 <div class="px-6 overflow-y-auto"  style="height: calc(100vh - 540px)">
  <template v-for="member in chatStore.selectedGroup?.members" :key="member?.user_id">
    <GroupUserItem @click="onClickChatPrivateUser(member)" :user="member" />
  </template>
 </div>
</template>