// cores
import { ref } from "vue";
import { useRoute } from "vue-router";
// components
import { CopyIcon, ForwardIcon, PenIcon, TrashBinTrashIcon } from "@/components/Icons";
// stores
import { useChatStore } from '../stores';
// utils
import { dispatchNotify } from "@/utils/notify";
// enums
import { COLOR_TYPES } from "@/enums";
// socket
import { socket } from "@/services/socket";
// constants
import { CHAT_ROUTE_NAMES, CHAT_TYPES } from "../constatns";

const chatStore = useChatStore()

export const useContextMenu = () => {
const route = useRoute()
const { send } = socket
// reactives
const refContextMenu = ref(null);

const sendReactionEvent = (type) => {
  const payload = { command: "message_reaction", chat_id: route.params.id, chat_type: route.name == CHAT_ROUTE_NAMES.PRIVATE ? CHAT_TYPES.PRIVATE : CHAT_TYPES.GROUP, message_id: chatStore.contextMenu?.tempMessage?.message_id, emoji: type }
  send(JSON.stringify(payload))
}

const handleClickStiker = (value, type)=> {
  sendReactionEvent(type)  
}

const menuItems = ref([
   { 
     label: '',
     action: (value, type)=>{
      handleClickStiker(value, type)
     },
     command: () => {

     }  
   },
   { 
     label: 'answer',
     iconName: ForwardIcon,
     iconClass:"rotate-y-180 transform rotate-y-180", 
     command: () => {
      console.log(chatStore.contextMenu.tempMessage);
      chatStore.contextMenu = { ...chatStore.contextMenu, message: chatStore.contextMenu.tempMessage, replay: true, edit: false }
     } 
   },
   { 
     label: 'update',
     iconName: PenIcon,
     command: () => {
      console.log(chatStore.contextMenu)
      chatStore.contextMenu = { ...chatStore.contextMenu, message: chatStore.contextMenu.tempMessage, replay: false, edit: true }
     } 
   },
   { 
     label: 'copy',
     iconName: CopyIcon,
     command: async () => {      
      try {
        await navigator.clipboard.writeText(chatStore.contextMenu.tempMessage?.text);
      } catch (err) {
        dispatchNotify(null, err, COLOR_TYPES.ERROR)
      }
     } 
   },
   { 
     label: 'delete',
     iconName: TrashBinTrashIcon,
     command: () => {      
      chatStore.contextMenu = { message: chatStore.contextMenu.tempMessage, replay: false, edit: false, deleteDialog: true }
     },
     class: "!text-critic-500"
   }
]);
 return {
   menuItems,
   refContextMenu
 }
}
