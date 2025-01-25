<script setup>
// cores 
import { ref } from 'vue';
// components
import ContextMenu from './ContextMenu.vue';
import BaseAvatar from '@/components/UI/BaseAvatar.vue';
// reactives
const refContextMenu = ref(null);
const menuItems = ref([
   { 
     label: 'select-image',
     iconName: true,
     command: () => {
     } 
   },
   { 
     label: 'delete',
     iconName: true,
     command: () => {
     },
   }
]);

const onContextMenuClick = (event) => {
 refContextMenu.value.menu.show(event);
}

</script>
<template>
  <div 
    @contextmenu.prevent="onContextMenuClick"
    class="w-fit py-[6px] px-3 border border-primary-300 bg-primary-50 rounded-[90px] text-sm text-greyscale-900 text-medium cursor-pointer select-none"
   >😁 <span v-if="true" class="ml-1">2</span></div>
  <ContextMenu ref="refContextMenu" :menu-items="menuItems" class-menu="w-[210px]">
   <template  #default="{ item }">
     <base-avatar
       label="Doclines Project"
       color="#E2E8F0"
       shape="circle"
       avatar-classes="w-6 h-6"
       label-classes="text-lg font-semibold text-greyscale-900"
     />
     <span class="text-xs font-medium">{{ item.label }}</span>
   </template>
  </ContextMenu>
</template>