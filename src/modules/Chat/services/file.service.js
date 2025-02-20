import { fetchBlobFile } from "@/services/file.service";

export const downloadFile = async (file) => {
 try {
   const { blobUrl } = await fetchBlobFile(file?.id);
   // create a link and trigger the download
   const link = document.createElement('a');
   link.href = blobUrl;
   link.download = file.name;
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
   window.URL.revokeObjectURL(blobUrl);
 } catch (error) {
   console.error('Download failed:', error);  
 }
};