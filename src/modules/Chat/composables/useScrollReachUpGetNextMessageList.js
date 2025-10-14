// stores
import { ref } from "vue";
import { useChatStore } from "../stores";
import { useRoute } from "vue-router";
import { useDebounceFn } from "@vueuse/core";  
// contants
import { CHAT_ROUTE_NAMES } from "../constatns";
// utils
import { extractPaginationCursors } from "../utlis";
 
export const useScrollReachUpGetNextMessageList = () => {
 const chatStore = useChatStore()
 const route = useRoute()
 // reactives
 const pageSize = ref(20)
 const nextCursor = ref(null)
 const isLoading = ref(false)

const debouncedHandleScrollUp = useDebounceFn(async(event, handleScrollUp) => {
  if(event && event.target && event.target.scrollTop < 10){
    if(nextCursor.value && !isLoading.value){
      try {
        const isPrivateChat = route.name == CHAT_ROUTE_NAMES.PRIVATE;
        const response =  await chatStore.actionGetMessageListByChatId({ chat: isPrivateChat ? chatStore.selectedUser.chat_id : chatStore.selectedGroup.chat_id, cursor: nextCursor.value, page_size: pageSize.value }, false)
        const { next } = extractPaginationCursors(response)
        nextCursor.value = next
        handleScrollUp()
      } catch (error) { 
        console.log(error)
      } finally {
        isLoading.value = false
      }
    }
  }
}, 150)

const handleScrollReachUp = async (event, handleScrollUp) => {
  debouncedHandleScrollUp(event, handleScrollUp)
}

  return { handleScrollReachUp, nextCursor, pageSize }
}