// cores
import { ref } from "vue";
// composibles
import { useFileUpload } from "./useFileUpload";

export const useFileUploadDrop = () => {
 const { uploadFiles } = useFileUpload()
 // reactives
//  const uploadingFiles = ref([]);

 const onDragOver = (event) => {
   console.log(event.target.files);
 }
 const onDragLeave = (event) => {
   console.log(event.target.files);
 }
 const onDrop = (event) => {
   console.log(event.dataTransfer.files );
   uploadFiles(event.dataTransfer.files);
 }

 return { onDragOver, onDragLeave, onDrop } 
}