// cores
import { nextTick, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
// stores
import { useChatStore } from "../stores";
import { useAuthStore } from "@/modules/Auth/stores";
// socket
import { socket } from "@/services/socket";
// constatns
import { CHAT_ROUTE_NAMES, CHAT_TYPES } from "../constatns";

const chatStore = useChatStore();
const authStore = useAuthStore();

export const useReadMessageObserver = () => {
const route = useRoute()

// Reactives
const refMessagesContainer = ref(null);
const refMessageElements = ref([]);
const observer = ref(null);

// socket sending readed massageIds to backend
const { send } = socket

// mark message as read
function markMessageAsRead(messageId) {
    sendMessageIdEvent(messageId);
}

function sendMessageIdEvent(messageId) {
    const payload = { command: 'message_read', chat_id: route.params?.id, chat_type: route.name == CHAT_ROUTE_NAMES.PRIVATE ? CHAT_TYPES.PRIVATE : CHAT_TYPES.GROUP, message_id: messageId }
    send(JSON.stringify(payload))
}

// Disconnect observer to prevent memory leaks
const disconnectObserver = () => {
    if (observer.value) {
        observer.value.disconnect();
        observer.value = null;
    }
};

// Initialize observer with proper cleanup
const initializeObserver = () => {
    // Clean up existing observer if it exists
    if (observer.value) {
        disconnectObserver();
    }

    // Create new observer
    observer.value = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const messageId = parseInt(entry.target.dataset.messageId);
                const userId = parseInt(entry.target.dataset.messageUserId);
                if (messageId && userId != authStore.currentUser?.id && (chatStore.selectedUser?.unread_count > 0 || chatStore.selectedGroup?.unread_count > 0)) {
                    markMessageAsRead(messageId);
                }
            }
        });
    }, { threshold: 0.5  });
};

const initializeReadMessageObserver = ()=> {   

    // Make sure observer exists
    if (!observer.value) {
    initializeObserver();
    }

    if (refMessageElements.value.length) {
        refMessageElements.value.forEach(component => {
        const el = component?.forwardedRef;
            if (el) {
                observer.value.observe(el);
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
    initializeObserver();   
});

return { refMessagesContainer, refMessageElements, initializeReadMessageObserver }

}