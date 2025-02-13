// cores
import { ref } from "vue";
// components
import { CopyIcon, ForwardIcon, PenIcon, TrashBinTrashIcon } from "@/components/Icons";
// stores
import { useChatStore } from '../stores';
// utils
import { dispatchNotify } from "@/utils/notify";
// enums
import { COLOR_TYPES } from "@/enums";

const chatStore = useChatStore()
export const useContextMenu = () => {
// reactives
const refContextMenu = ref(null);
const handleClickStiker = (value, type)=> {
  let index = chatStore.contextMenu.tempData.index
  if (index !== undefined && index !== null && chatStore.messageListByChatId[index]) {
    const reactionIndex = chatStore.messageListByChatId[index].reactions.findIndex((item)=> item.type === type)
    if(reactionIndex !== -1){
      chatStore.messageListByChatId[index].reactions.splice(reactionIndex, 1);
    } else{
      chatStore.messageListByChatId[index].reactions.push({ type, value });
    }
  } else {
    console.error("Index not found or invalid");
  }

  // switch(type){
  //  case 'fire':
  //   return value 
  //  case 'lough':
  //   return value
  //  case 'heart':
  //   return value
  //  case 'like':
  //   return value
  //  case 'angry':
  //   return value
  //  case 'love':
  //   return value
  // }
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
      chatStore.contextMenu = { data: chatStore.contextMenu.tempData, replay: true, edit: false }
     } 
   },
   { 
     label: 'update',
     iconName: PenIcon,
     command: () => {
      chatStore.contextMenu = { data: chatStore.contextMenu.tempData, replay: false, edit: true }
     } 
   },
   { 
     label: 'copy',
     iconName: CopyIcon,
     command: async () => {      
      try {
        await navigator.clipboard.writeText(chatStore.contextMenu.tempData.text);
      } catch (err) {
        dispatchNotify(null, err, COLOR_TYPES.ERROR)
      }
     } 
   },
   { 
     label: 'delete',
     iconName: TrashBinTrashIcon,
     command: () => {
      chatStore.contextMenu = { data: chatStore.contextMenu.tempData, replay: false, edit: false, deleteDialog: true }
     },
     class: "!text-critic-500"
   }
]);
 return {
   menuItems,
   refContextMenu
 }
}