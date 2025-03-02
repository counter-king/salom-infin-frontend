// cores
// composibles
import { useFileUpload } from "./useFileUpload";

export const useFileUploadDrop = () => {
 const { uploadFiles } = useFileUpload()

 const onDragOver = (event) => {
 }
 const onDragLeave = (event) => {
 }
 const onDrop = (event) => {
   uploadFiles(event.dataTransfer.files);
 }

 return { onDragOver, onDragLeave, onDrop } 
}