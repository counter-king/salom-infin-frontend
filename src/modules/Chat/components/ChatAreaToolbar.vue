<script setup>
// cores
import { computed, inject, ref, watch} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
// components
import CreateEditGroupDialog from './CreateEditGroupDialog.vue';
import { MenuDotsBoldIcon, PenIcon, SidebarMinimalisticIcon, TrashBinTrashBoldIcon, TrashBinTrashIcon } from '@/components/Icons'
import DeleteDialog from './DeleteDialog.vue';
import BaseMenu from '@/components/UI/BaseMenu.vue';
// services
import { fetchDeleteGroupChatById, fetchDeletePrivateChatById } from '../services';
// store
import { useChatStore } from "@/modules/Chat/stores";
import { useAuthStore } from '@/modules/Auth/stores';
// constatns
import { CHAT_ROUTE_NAMES } from '../constatns';
import TypingAnimation from './ChatArea/TypingAnimation.vue';

const chatStore = useChatStore();
const authStore = useAuthStore()
const route = useRoute();
const router = useRouter();
const { t } = useI18n();

// reactives
const createGroupDialogVisible = ref(false);
const deleteDialogVisible = ref(false);
const isDeleteLoading = ref(false);
const menu = ref();
const isGroupDetail = computed(() => route.name == CHAT_ROUTE_NAMES.GROUP)
const isAllowedToDelete = computed(() => chatStore.selectedGroup?.members?.find((item) => item?.id == authStore.currentUser.id)?.role == 'owner' || chatStore.selectedUser?.members?.find((item) => item.user?.id == authStore.currentUser?.id)?.role == 'owner')
const menuItems = computed(() => [
  ...(route.name == CHAT_ROUTE_NAMES.GROUP ? [{ 
    label: 'edit',
    icon: PenIcon,
    command: () => {
      createGroupDialogVisible.value = true
    },
    iconClass: "!text-greyscale-500 !w-4 !h-4"
  }] : []),  
  {
    label: 'delete',
    class: ['pointer-events-none', '!text-critic-200', {'!text-critic-500 !pointer-events-auto': isAllowedToDelete.value}],
    icon: TrashBinTrashBoldIcon,
    command: () => {
    deleteDialogVisible.value = true
    },
    iconClass: ['pointer-events-none', '!text-critic-200', {'!text-critic-500': isAllowedToDelete.value}],
  }
]);

const isPrivate = computed(() => route.name == CHAT_ROUTE_NAMES.PRIVATE)
const chat_id = computed(() => isPrivate.value ? chatStore.selectedUser?.chat_id : chatStore.selectedGroup?.chat_id)
// Computed property to check if someone is typing in current chat
const isUserTypingInCurrentChat = computed(() => {
  return Object.values(chatStore.typingUsers).some(item => item.chat_id == chat_id.value && authStore.currentUser?.id != item?.user?.id);
});

// Get the name of typing user
const typingUserName = computed(() => {
  const typingUser = Object.values(chatStore.typingUsers).find(item => item.chat_id == chat_id.value);
  return typingUser ? typingUser.user?.first_name : '';
});

// injects
const inputSendMessasgeRef = inject("inputSendMessasgeRef")
// methods
const toggle = (event) => {
  menu.value.menuRef.toggle(event);
  // set inputSendMessasgeRef focus when createGroupDialogVisible
  inputSendMessasgeRef.value?.$el?.focus()
};

function focussed() {
  setTimeout(function () {
    menu.value.menuRef.focusedOptionIndex = -1
  }, 0)
}

const onDeleteChat = async () => {
  isDeleteLoading.value = true
  
  if(route.name == CHAT_ROUTE_NAMES.GROUP){
    await fetchDeleteGroupChatById(chatStore.selectedGroup?.chat_uid)
    chatStore.selectedGroup = null
    router.push({name: CHAT_ROUTE_NAMES.CHAT_INDEX, query :{ tab: "group" } })
    chatStore.actionGetGroupChatList()  
  } else if(route.name == CHAT_ROUTE_NAMES.PRIVATE){
    await fetchDeletePrivateChatById(chatStore.selectedUser?.chat_uid)
    chatStore.selectedUser = null
    router.push({name: CHAT_ROUTE_NAMES.CHAT_INDEX, query :{ tab: undefined} })
    chatStore.actionGetPrivateChatList()
  }
  
  isDeleteLoading.value = false
  deleteDialogVisible.value = false
}

const handleEditDialogGroupVisible = () => {
  if(route.name == CHAT_ROUTE_NAMES.GROUP){
    createGroupDialogVisible.value = true
  }
  inputSendMessasgeRef.value?.$el?.focus()
}

// set inputSendMessasgeRef focus when createGroupDialogVisible
watch(createGroupDialogVisible, () => {
  inputSendMessasgeRef.value?.$el?.focus()
})

</script>
<template>
  <div @click="handleEditDialogGroupVisible" class="flex items-center w-full h-[72px] border-b px-6 pr-3 cursor-pointer">
    <div class="flex justify-between items-center w-full">
      <div class="flex">
        <div class="relative">
          <base-avatar
            :label="isGroupDetail ? chatStore.selectedGroup?.title : chatStore.selectedUser?.first_name"
            :color="isGroupDetail ? '#E2E8F0' : chatStore.selectedUser?.color"
            :image="isGroupDetail ? chatStore.selectedGroup?.image?.blobUrl : chatStore.selectedUser?.avatar?.url"
            avatar-classes="w-11 h-11"
            label-classes="text-lg font-semibold select-none text-greyscale-900"
          />  
          <div 
            v-if="!isGroupDetail"
            class="absolute w-4 h-4 rounded-lg right-[-2px] bottom-[-2px] bg-greyscale-300 border-[3px] border-white"
            :class="{ '!bg-success-500': chatStore.selectedUser?.is_user_online }"
          ></div>
        </div>
        <div class="flex flex-col ml-3">
          <div class="text-base font-semibold select-none">{{ isGroupDetail ? chatStore.selectedGroup?.title : chatStore.selectedUser?.full_name}}</div>
          <div v-if="isUserTypingInCurrentChat" class="text-sm font-medium text-success-500 select-none">{{route.name == CHAT_ROUTE_NAMES.GROUP ? typingUserName : ''}} <TypingAnimation/> </div>
          <div v-else class="text-sm font-medium text-greyscale-500 select-none">{{ isGroupDetail ? t('members', { count: chatStore.selectedGroup?.members?.length}) : chatStore.selectedUser?.position}}</div>
        </div>
      </div>
      <div class="flex items-center gap-1 ">
        <base-iconify
         :icon="SidebarMinimalisticIcon"
          class="!w-6 !h-6 cursor-pointer"
         :class="chatStore.rightSidebarVisible ? 'text-primary-500' : 'text-greyscale-500'"
         @click.stop="chatStore.toggleRightSidebar"
        />
        <div @click.stop="toggle"   class="relative flex justify-center">
          <base-iconify
          :icon="MenuDotsBoldIcon"
          class="!w-6 !h-6 text-greyscale-300 cursor-pointer transform rotate-90"    
          />
        </div>
        <BaseMenu ref="menu" :items="menuItems"  width="w-[171px]" @focus="focussed" menu-class="rounded-xl p-1"  label-class="!text-sm font-medium" >
          <template #item="{item}">
            <div
             class="flex gap-2 items-center text-greyscale-500 px-3 py-2 rounded-lg hover:bg-greyscale-50 cursor-pointer"
             :class="item.class"
             >
              <slot :item="item">
                <base-iconify class="!w-4 !h-4" :icon="(item.icon)" :class="item.iconClass" />
                <span class="text-xs font-medium" :class="item?.labelClass">{{t(item.label)}}</span>
              </slot>
          </div>
          </template>
        </BaseMenu>         
      </div>
    </div>
  </div>
  <create-edit-group-dialog v-if="createGroupDialogVisible" modal-label="edit-group" v-model="createGroupDialogVisible" type="edit" />
  <DeleteDialog
   v-model="deleteDialogVisible" 
   :onDelete="onDeleteChat" 
   :onClose="() => deleteDialogVisible = false"
   :conetentText="route.name == CHAT_ROUTE_NAMES.GROUP ? 'delete-chat-group-dialog-content' : 'delete-chat-private-dialog-content'"
   :isDeleteLoading="isDeleteLoading"
  />
</template>