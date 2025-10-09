// stores
import { ref } from "vue";
import { useChatStore } from "../stores";
import { useRoute } from "vue-router";
import { useDebounceFn } from "@vueuse/core";  
// contants
import { CHAT_ROUTE_NAMES } from "../constatns";
// utils
import { extractPaginationCursors } from "../utlis";
 
export const useScrollReachDownGetNextMessageList = () => {
 const chatStore = useChatStore()
 const route = useRoute()
 // reactives
 const pageSize = ref(20)
 const previousCursor = ref(null)
 const isLoading = ref(false)

const debouncedHandleScrollDown = useDebounceFn(async(event) => {
  if(event && event.target && event.target.scrollHeight - event.target.clientHeight - event.target.scrollTop < 100){
    const isPrivateChat = route.name == CHAT_ROUTE_NAMES.PRIVATE;
    const chat = isPrivateChat ? chatStore.selectedUser : chatStore.selectedGroup
    // working cases
    // when unread_counts are exist then work
    // when replay message is clicked, then work
    if(previousCursor.value && !isLoading.value){
      isLoading.value = true
      try {
       const response = await chatStore.actionGetMessageListByChatId({ chat: chat.chat_id, cursor: previousCursor.value, page_size:pageSize.value }, false, false, true)
        const { previous } = extractPaginationCursors(response)
        previousCursor.value = previous

      } catch (error) {
        console.log(error)
      } finally {
        isLoading.value = false
      }
    } else {
      chatStore.replayedMessageClicked = false
    }
  }
}, 200)

const handleScrollReachDown = async (event) => {
  if(!isLoading.value){
    debouncedHandleScrollDown(event) 
  }
 }

 return { handleScrollReachDown, previousCursor, pageSize }
}
