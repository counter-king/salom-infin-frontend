// core
import { useRoute } from "vue-router";
// stores
import { useChatStore } from "../stores";
// services
import axiosConfig from "@/services/axios.config";
// sockets
import { socket } from "@/services/socket";
// contants
import { CHAT_ROUTE_NAMES, CHAT_TYPES, MESSAGE_TYPES } from "../constatns";

const chatStore = useChatStore()

const { send } = socket()

const messageTypes = [MESSAGE_TYPES.IMAGE, MESSAGE_TYPES.VIDEO, MESSAGE_TYPES.AUDIO]

export const useFileUpload = () => {
const route = useRoute();

const sendChatFileEmit = (file_id, file_name, message_type, chat_id, chat_type)=> {
  const payload = { command: 'new_message', chat_type, chat_id, files: [file_id],message_type, text: file_name, replied_to_id: chatStore.contextMenu?.message?.message_id}
  send(JSON.stringify(payload))
}

const returnShortFileName = (fileName) => {
  return (fileName.split('.')[0].length >= 12) ? fileName.substring(0, 13) + '... .' + fileName.split('.')[1] : fileName
}

 const uploadFiles = async (files) => {
   if (files.length === 0) return;

  // Chat snapshot: upload boshlanganda qaysi chatda turgan bo'lsangiz, shuni "muzlatib" olamiz, bu current chat o'zgarib ketsa xatolikni olish uchun ma'lumotlar boshqa user chatga yozib qolishni oldini oladi
  const isPrivateChatRoute = route.name === CHAT_ROUTE_NAMES.PRIVATE
  const snapshot_chat_type = isPrivateChatRoute ? CHAT_TYPES.PRIVATE : CHAT_TYPES.GROUP
  const snapshot_chat_id = isPrivateChatRoute ? chatStore.selectedUser?.chat_id : chatStore.selectedGroup?.chat_id
  const snapshot_chat_uid = isPrivateChatRoute ? chatStore.selectedUser?.chat_uid : chatStore.selectedGroup?.chat_uid

   for (let i = 0; i < files.length; i++) {
     // Har bir so'rov uchun yangi AbortController yaratish
     const abortController = new AbortController();
     const signal = abortController.signal;

     let fileName = returnShortFileName(files[i]?.name);
     let size = files[i]?.size;
     let fileSize = (size > 1048576) ? (size / 1048576).toFixed(2) + ' MB' : (size <= 1048576 && size > 1024) ? (size / 1024).toFixed(2) + ' KB' : size + ' B'
     const message = { 
        attachments: { 
          file: {
            size: fileSize,
            id: null,
            abortController: abortController,
            signal: signal,
            process: 0,
            file: files[i]
        }},
        message_type: MESSAGE_TYPES.FILE,
        reactions: [],
        text: fileName,
        uploaded: false,
        progress: 0,
        chat_type: snapshot_chat_type,
        chat_id: snapshot_chat_id,
        chat_uid: snapshot_chat_uid,
      }
     chatStore.uploadingFiles.push(message);
    }

   for (const item of chatStore.uploadingFiles) {
     let formData = new FormData();
     formData.append("file", item.attachments?.file?.file);
     formData.append("module", "chat");

     await axiosConfig.post(`/upload/`, formData, {
       onUploadProgress: ({ loaded, total }) => {
         item.progress = Math.floor((loaded / total) * 100) - 1;
       },
       signal: item.attachments?.file?.signal
     })
       .then(({ data }) => {
        // sending file to websocket          
        const currentMessageType =  messageTypes.find(type=>type === item.attachments?.file?.file?.type.split("/")[0]) || MESSAGE_TYPES.FILE

         sendChatFileEmit(data.id, data.name, currentMessageType, item.chat_id, item.chat_type); 
         item.attachments.file.id = data.id;
         item.uploaded = false;
         item.attachments.file.url = data.url
       })
       .catch(() => {
         item.uploaded = false;
       })
   }
 }

 return { uploadFiles}
}