// cores
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
// components
import { CopyIcon, DownloadMinimalisticIcon, ForwardIcon, PenIcon, TrashBinTrashIcon } from "@/components/Icons";
// stores
import { useChatStore } from '../stores';
// utils
import { dispatchNotify } from "@/utils/notify";
// enums
import { COLOR_TYPES } from "@/enums";
// socket
import { socket } from "@/services/socket";
// constants
import { CHAT_ROUTE_NAMES, CHAT_TYPES, MESSAGE_TYPES } from "../constatns";
import { downloadFile } from "../services/file.service";

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

const menuItems = computed(()=> ([
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
      chatStore.contextMenu = { ...chatStore.contextMenu, message: chatStore.contextMenu.tempMessage, replay: true, edit: false }
     } 
   },
   { 
      label: 'update',
      iconName: PenIcon,
      command: () => {
        chatStore.contextMenu = { ...chatStore.contextMenu, message: chatStore.contextMenu.tempMessage, replay: false, edit: true }
      } 
    },
   ...(
    [MESSAGE_TYPES.FILE, MESSAGE_TYPES.IMAGE, MESSAGE_TYPES.VIDEO, MESSAGE_TYPES.AUDIO].includes(chatStore.contextMenu?.tempMessage?.message_type) ? [
     { 
     label: 'save-as',
     iconName: DownloadMinimalisticIcon,
     command: () => {      
      downloadFile(chatStore.contextMenu.tempMessage?.attachments?.file)
      }
     } 
    ] : []
    ),
   { 
     label: 'copy',
     iconName: CopyIcon,
     command: async () => {   
      chatStore.contextMenu = { ...chatStore.contextMenu, message: chatStore.contextMenu.tempMessage, replay: false, edit: false }   
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
      chatStore.contextMenu = { ...chatStore.contextMenu, message: chatStore.contextMenu.tempMessage, replay: false, edit: false }
      chatStore.contextMenu = { message: chatStore.contextMenu.tempMessage, replay: false, edit: false, deleteDialog: true }
     },
     class: "!text-critic-500"
   }
]))

 return {
   menuItems,
   refContextMenu
 }
}
