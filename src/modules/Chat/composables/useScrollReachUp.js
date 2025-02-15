// stores
import { ref } from "vue";
import { useChatStore } from "../stores";
import { useRoute } from "vue-router";
 
export const useScrollReachUp = () => {
 const chatStore = useChatStore()
 const route = useRoute()
 // reactives
 const page = ref(1)

const handleScrollReachUp = (event) => {
 if(event.target.scrollTop == 0){
   chatStore.actionGetMessageListByChatId({chat:route.params?.id}, false);
 }
}

return { handleScrollReachUp }

}