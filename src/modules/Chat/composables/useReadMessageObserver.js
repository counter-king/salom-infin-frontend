// cores
import { nextTick, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
// stores
import { useChatStore } from "../stores";
// socket
import { socket } from "@/services/socket";
import { CHAT_ROUTE_NAMES, CHAT_TYPES } from "../constatns";

const chatStore = useChatStore();
export const useReadMessageObserver = () => {
const route = useRoute()
// Reactives
const refMessagesContainer = ref(null);
const refMessageElements = ref([]);
const readMessageIds = ref([]);

// socket sending readed massageIds to backend
const { send } = socket
// mark message as read
function markMessageAsRead(messageId) {
    const messageIndex = chatStore.messageListByChatId.findIndex(msg => msg.message_id === messageId);
    if (messageIndex !== -1 && !chatStore.messageListByChatId[messageIndex].is_read) {
      chatStore.messageListByChatId[messageIndex].is_read = true;
      
      // add message id to readMessageIds
      if (!readMessageIds.value.includes(messageId)) {
        readMessageIds.value.push(messageId);
        // send read status to backend
        sendReadStatusToBackend(messageId);
      }
    }
}

// send read message ids to backend
function sendReadStatusToBackend(messageId) {
    const payload = { command: 'message_read', chat_id: route.params?.id, chat_type: route.name == CHAT_ROUTE_NAMES.PRIVATE ? CHAT_TYPES.PRIVATE : CHAT_TYPES.GROUP, message_id: messageId }
    send(JSON.stringify(payload))
}

let observer;
const initializeReadMessageObserver = ()=> {   
    console.log(chatStore.messageListByChatId.length)
    console.log(refMessageElements.value.length)
    if (refMessageElements.value.length) {
        refMessageElements.value.forEach(component => {
        const el = component?.forwardedRef;
            if (el) {
                observer.observe(el);
            }   
        });
    } 
}

// // Watch for changes in the message list
watch(() => chatStore.messageListByChatId, async () => {
    await nextTick();
    initializeReadMessageObserver();
}, { deep: true });


onMounted(() => {
    observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const messageId = parseInt(entry.target.dataset.messageId);
                if (messageId) {
                    console.log("messageId",messageId)
                  markMessageAsRead(messageId);
                }
            }
        });
    }, { threshold: 0.5 });
  });

return { refMessagesContainer, refMessageElements, readMessageIds, initializeReadMessageObserver }

}