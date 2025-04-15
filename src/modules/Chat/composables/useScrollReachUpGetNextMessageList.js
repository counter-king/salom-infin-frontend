// stores
import { ref } from "vue";
import { useChatStore } from "../stores";
import { useRoute } from "vue-router";
import { useDebounceFn } from "@vueuse/core";  
// contants
import { CHAT_ROUTE_NAMES } from "../constatns";
 
export const useScrollReachUpGetNextMessageList = () => {
 const chatStore = useChatStore()
 const route = useRoute()
 // reactives
 const page = ref(1)
 const pageSize = ref(20)
 const hasNext = ref(false)

const debouncedHandleScrollUp = useDebounceFn(async(event, handleScrollUp) => {
  if(event && event.target && event.target.scrollTop < 10){
    if(hasNext.value && page.value >= 1){
      const isPrivateChat = route.name == CHAT_ROUTE_NAMES.PRIVATE;
      const { count } =  await chatStore.actionGetMessageListByChatId({ chat: isPrivateChat ? chatStore.selectedUser.chat_id : chatStore.selectedGroup.chat_id, page:page.value, page_size:pageSize.value }, false)
      hasNext.value = count > page.value * pageSize.value
      page.value += 1
      handleScrollUp()
   }
  }
}, 150)

const handleScrollReachUp = async (event, handleScrollUp) => {
  debouncedHandleScrollUp(event, handleScrollUp) 
}

 return { handleScrollReachUp, hasNext, page, pageSize }
}