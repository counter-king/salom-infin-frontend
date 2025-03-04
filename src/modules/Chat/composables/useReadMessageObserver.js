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

// socket sending readed massageIds to backend
const { send } = socket

// mark message as read
function markMessageAsRead(messageId) {
    sendMessageIdEvent(messageId);
}

// send read message ids to backend
function sendMessageIdEvent(messageId) {
    const payload = { command: 'message_read', chat_id: route.params?.id, chat_type: route.name == CHAT_ROUTE_NAMES.PRIVATE ? CHAT_TYPES.PRIVATE : CHAT_TYPES.GROUP, message_id: messageId }
    send(JSON.stringify(payload))
}

let observer;
const initializeReadMessageObserver = ()=> {   
    if (refMessageElements.value.length) {
        refMessageElements.value.forEach(component => {
        const el = component?.forwardedRef;
            if (el) {
                observer.observe(el);
            }   
        });
    } 
}

// Watch for changes in the message list, then observer new messages
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
                   markMessageAsRead(messageId);
                }
            }
        });
    }, { threshold: 0.5, root: refMessagesContainer.value  });
  });

return { refMessagesContainer, refMessageElements, initializeReadMessageObserver }

}