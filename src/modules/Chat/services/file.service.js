import { fetchBlobFile } from "@/services/file.service";

export const downloadFile = async (message) => {
  message.uploaded = false
  try {
   const { blobUrl } = await fetchBlobFile(message?.attachments?.file.id);
   // create a link and trigger the download
   const link = document.createElement('a');
   link.href = blobUrl;
   link.download = message?.attachments?.file.name;
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
   window.URL.revokeObjectURL(blobUrl);
 } catch (error) {
   console.error('Download failed:', error);  
 } finally {
   message.uploaded = true
 }
};