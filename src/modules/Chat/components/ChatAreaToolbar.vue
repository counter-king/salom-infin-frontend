<script setup>
// cores
import { computed, ref, unref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
// Components
import CreateGroupDialog from './CreateGroupDialog.vue';
import { MenuDotsBoldIcon, PenIcon, SidebarMinimalisticIcon, TrashBinTrashIcon } from '@/components/Icons'
// Store
import { useChatStore } from "@/modules/Chat/stores";
import BaseMenu from '@/components/UI/BaseMenu.vue';
// import BaseMenu from './BaseMenu.vue';

const chatStore = useChatStore();
const route = useRoute();
const { t } = useI18n();

// reactives
const createGroupDialogVisible = ref(false);
const menu = ref();
const menuItems = ref([
   { 
     label: 'image',
     icon: PenIcon,
     command: () => {
      
     } 
   },
   { 
     label: 'delete',
     iconName: TrashBinTrashIcon,
     command: () => {
     
     },
     class: ["!text-critic-500"]
   }
]);

const toggle = (event) => {
  menu.value.menuRef.toggle(event);
};

function focussed() {
  setTimeout(function () {
    menu.value.menuRef.focusedOptionIndex = -1
  }, 0)
}

const isGroupDetail = computed(() => route.name == 'ChatGroupDetail')
</script>
<template>
  <div @click="createGroupDialogVisible = false" class="flex items-center w-full h-[72px] border-b px-6 pr-3 cursor-pointer">
    <div class="flex justify-between items-center w-full">
      <div class="flex">
        <div class="relative">
          <base-avatar
            :label="isGroupDetail ? chatStore.selectedGroup?.title : chatStore.selectedUser?.user?.first_name"
            :color="isGroupDetail ? '#E2E8F0' : chatStore.selectedUser?.user?.color"
            :image="isGroupDetail ? chatStore.selectedGroup?.image?.url : chatStore.selectedUser?.user?.avatar?.url"
            avatar-classes="w-11 h-11"
            label-classes="text-lg font-semibold select-none text-greyscale-900"
          />  
          <div 
            class="absolute w-4 h-4 rounded-lg right-[-2px] bottom-[-2px] border-[3px] border-white"
            :class="{ 'bg-success-500': false, 'bg-greyscale-300': true }"
          ></div>
        </div>
        <div class="flex flex-col ml-3">
          <div class="text-base font-semibold select-none">{{ isGroupDetail ? chatStore.selectedGroup?.title : chatStore.selectedUser?.user?.full_name}}</div>
          <div v-if="true" class="text-sm font-medium text-greyscale-500 select-none">{{ isGroupDetail ? t('members', { count: chatStore.selectedGroup?.members?.length}) : chatStore.selectedUser?.user?.position?.name}}</div>
          <div v-else class="text-sm font-medium text-success-500 select-none">typing ... </div>
        </div>
      </div>
      <div class="flex items-center gap-1 ">
        <base-iconify
         :icon="SidebarMinimalisticIcon"
          class="!w-6 !h-6 cursor-pointer"
         :class="chatStore.rightSidebarVisible ? 'text-primary-500' : 'text-greyscale-500'"
         @click.stop="chatStore.toggleRightSidebar"
        />
        <div @click="toggle"   class="relative flex justify-center">
          <base-iconify
          :icon="MenuDotsBoldIcon"
          class="!w-6 !h-6 text-greyscale-300 cursor-pointer transform rotate-90"    
          />
        </div>
        <BaseMenu ref="menu" :items="menuItems"  width="w-[171px]" class="!top-10" @focus="focussed" />         
      </div>
    </div>
  </div>
  <create-group-dialog v-if="createGroupDialogVisible" modal-label="edit-group" v-model="createGroupDialogVisible"/>
</template>