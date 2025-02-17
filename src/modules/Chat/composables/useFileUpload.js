// stores
import { useChatStore } from "../stores";
import { useRoute } from "vue-router";
// services
import axiosConfig from "@/services/axios.config";
// sockets
import { socket } from "@/services/socket";
// contants
import { CHAT_ROUTE_NAMES, CHAT_TYPES, MESSAGE_TYPES } from "../constatns";
const chatStore = useChatStore()

const { send } = socket

const sendChatFileEmit = (file_id, file_name, chat_id, message_type, chat_type)=> {
  console.log("ishlmoqda")
  const payload = { command: 'new_message', chat_type, chat_id, files: [file_id],message_type, text: file_name }
  send(JSON.stringify(payload))
}

const messageTypes = [MESSAGE_TYPES.IMAGE, MESSAGE_TYPES.VIDEO, MESSAGE_TYPES.AUDIO]

export const useFileUpload = () => {
  const route = useRoute()

const returnShortFileName = (fileName) => {
  return (fileName.split('.')[0].length >= 12) ? fileName.substring(0, 13) + '... .' + fileName.split('.')[1] : fileName
}

 const uploadFiles = async (files) => {
   if (files.length === 0) return;
   for (let i = 0; i < files.length; i++) {
     // Har bir so'rov uchun yangi AbortController yaratish
     const abortController = new AbortController();
     const signal = abortController.signal;

     let fileName = returnShortFileName(files[i].name);
     let size = files[i].size;
     let fileSize = (size > 1048576) ? (size / 1048576).toFixed(2) + ' MB' : (size <= 1048576 && size > 1024) ? (size / 1024).toFixed(2) + ' KB' : size + ' B'
     chatStore.uploadingFiles.push({ id: null, name: fileName, size: fileSize, progress: 0, uploaded: null, file: files[i], abortController: abortController, signal: signal});
    
    }

   for (const item of chatStore.uploadingFiles.filter((obj) => obj.uploaded === null)) {
     let formData = new FormData();
     formData.append("file", item.file);

     await axiosConfig.post(`/upload/`, formData, {
       onUploadProgress: ({ loaded, total }) => {
         item.progress = Math.floor((loaded / total) * 100) - 1;
       },
       signal: item.signal
     })
       .then(({ data }) => {
        console.log("ishlmoqda",data.name)
        // sending file to websocket          
        const currentMessageType =  messageTypes.find(type=>type === item.file.type.split("/")[0]) || MESSAGE_TYPES.FILE     
         sendChatFileEmit(data.id, data.name, route.params.id, currentMessageType, route.name == CHAT_ROUTE_NAMES.PRIVATE ? CHAT_TYPES.PRIVATE : CHAT_TYPES.GROUP); 
         
         item.id = data.id;
         item.uploaded = true;
         item.url = data.url
       })
       .catch(() => {
         item.uploaded = false;
       })
   }
 }

 return { uploadFiles}
}