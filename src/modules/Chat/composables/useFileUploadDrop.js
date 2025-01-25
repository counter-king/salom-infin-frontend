// cores
import { ref } from "vue";
// services
import axiosConfig from "@/services/axios.config";

export const useFileUploadDrop = () => {
 // reactives
 const uploadingFiles = ref([]);

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
 const returnShortFileName = (fileName) => {
  return (fileName.split('.')[0].length >= 12) ? fileName.substring(0, 13) + '... .' + fileName.split('.')[1] : fileName
}

const uploadFiles = async (files) => {
  if (files.length === 0) return;
  for (let i = 0; i < files.length; i++) {
    let fileName = returnShortFileName(files[i].name);
    let size = files[i].size;
    let fileSize = (size > 1048576) ? (size / 1048576).toFixed(2) + ' MB' : (size <= 1048576 && size > 1024) ? (size / 1024).toFixed(2) + ' KB' : size + ' B'
    uploadingFiles.value.push({ id: null, name: fileName, size: fileSize, progress: 0, uploaded: null, file: files[i] });
  }

  for (const item of uploadingFiles.value.filter((obj) => obj.uploaded === null)) {
    let formData = new FormData();
    formData.append("file", item.file);

    await axiosConfig.post(`/upload/`, formData, {
      onUploadProgress: ({ loaded, total }) => {
        item.progress = Math.floor((loaded / total) * 100) - 1;
      }
    })
      .then(({ data }) => {
        item.id = data.id;
        item.uploaded = true;
        item.url = data.url
      })
      .catch(() => {
        item.uploaded = false;
      })
  }
}

 return { onDragOver, onDragLeave, onDrop, uploadingFiles } 
}