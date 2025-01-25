// cores
import { CopyIcon, ForwardIcon, PenIcon, TrashBinTrashIcon } from "@/components/Icons";
import { ref } from "vue";

export const useContextMenu = () => {
// reactives
const refContextMenu = ref(null);
const handleClickStiker = (value, type)=> {
  console.log(value, type);
  
  switch(type){
   case 'fire':
    return value 
   case 'lough':
    return value
   case 'heart':
    return value
   case 'like':
    return value
   case 'angry':
    return value
   case 'love':
    return value
  }
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
     command: () => {
     } 
   },
   { 
     label: 'update',
     iconName: PenIcon,
     command: () => {
     } 
   },
   { 
     label: 'copy',
     iconName: CopyIcon,
     command: () => {
     } 
   },
   { 
     label: 'delete',
     iconName: TrashBinTrashIcon,
     command: () => {
     },
     class: "!text-critic-500"
   }
]);
 return {
   menuItems,
   refContextMenu
 }
}