// stores
import { ref } from "vue";
import { useChatStore } from "../stores";
import { useRoute } from "vue-router";
import { useDebounceFn } from "@vueuse/core";  
// contants
import { CHAT_ROUTE_NAMES } from "../constatns";
 
export const useScrollReachUpDownGetNextMessageList = () => {
 const chatStore = useChatStore()
 const route = useRoute()
 // reactives
 const page = ref(1)
 const pageSize = ref(20)
 const hasNext = ref(false)

const isLoading = ref(false)
const debouncedHandleScrollDown = useDebounceFn(async(event) => {
  if(event && event.target && event.target.scrollHeight - event.target.clientHeight - event.target.scrollTop < 200){
    const isPrivateChat = route.name == CHAT_ROUTE_NAMES.PRIVATE;
    const chat = isPrivateChat ? chatStore.selectedUser : chatStore.selectedGroup
    if(page.value >= 1 && chat.unread_count > 0 && !isLoading.value){
    
    isLoading.value = true
    try {
      await chatStore.actionGetMessageListByChatId({ chat: chat.chat_id, page:page.value, page_size:pageSize.value }, false, false, true)
      page.value -= 1
    } catch (error) {
      console.log(error)
    } finally {
      isLoading.value = false
    }
  }
  }
}, 150)

const handleScrollReachDown = async (event) => {
  if(!isLoading.value){
    console.log("ishlamoqda")

    debouncedHandleScrollDown(event) 
  }
 }

 return { handleScrollReachDown, hasNext, page, pageSize }
}
