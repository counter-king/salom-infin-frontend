// stores
import { ref } from "vue";
import { useChatStore } from "../stores";
import { useRoute } from "vue-router";
import { useDebounceFn } from "@vueuse/core";  
 
export const useScrollReachUp = () => {
 const chatStore = useChatStore()
 const route = useRoute()
 // reactives
 const page = ref(1)
 const pageSize = ref(10)
 const hasNext = ref(false)

const debouncedHandleScrollUp = useDebounceFn(async(event, handleScrollUp) => {
  if(event.target.scrollTop == 0){
   if(hasNext.value){
    const { count } =  await chatStore.actionGetMessageListByChatId({ chat:route.params?.id, page:page.value, page_size:pageSize.value }, false);
    hasNext.value = count > page.value * pageSize.value
    page.value += 1
    handleScrollUp()
   }
  }
}, 100)

const handleScrollReachUp = async (event, handleScrollUp) => {
 debouncedHandleScrollUp(event, handleScrollUp) 
}

 return { handleScrollReachUp, hasNext, page, pageSize }
}