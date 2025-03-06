<script setup>
// Core
import { useI18n } from "vue-i18n";
import { computed, inject, ref, watch } from "vue";
import { useRoute } from "vue-router";
// Components
import FileTypes from "./FileTypes.vue";
import FileTypeLink from "./FileTypeLink.vue";
import FileTypeDocument from "./FileTypeDocument.vue";
import FileTypeVideo from "./FileTypeVideo.vue";
import FileTypeImage from "./FileTypeImage.vue";
import GroupUserList from "./GroupUserList.vue";
// icons
import { ChevronUp20SolidIcon, FolderFavouriteStarBoldIcon, PaperclipRoundedBoldIcon, UsersGroupTwoRoundedBoldIcon, XMarkSolidIcon } from '@/components/Icons'
// constants 
import { CHAT_ROUTE_NAMES, COMPONENT_TYPES, MESSAGE_TYPES } from "../constatns";
// store
import { useChatStore } from "../stores";

const chatStore = useChatStore();
const route = useRoute();
const { t } = useI18n(); 
const inputSendMessasgeRef = inject("inputSendMessasgeRef");

const components = {
  [COMPONENT_TYPES.FILES]: FileTypes,
  [COMPONENT_TYPES.LINKS]: FileTypeLink,
  [COMPONENT_TYPES.DOCUMENTS]: FileTypeDocument,
  [COMPONENT_TYPES.VIDEOS]: FileTypeVideo,
  [COMPONENT_TYPES.IMAGES]: FileTypeImage,
  [COMPONENT_TYPES.GROUP_USERS]: GroupUserList,
}
// reactives
const componentType = ref(COMPONENT_TYPES.FILES);
// computed
const activeComponent = computed(() => {
  return components[componentType.value]
});

const activeFileMenu = computed(() => {
  if(componentType.value !== COMPONENT_TYPES.LINKS){
    return true;
  }
  else {
    return false;
  }
});

const allFileCount = computed(() => (chatStore.messageFileList?.length || 0) + (chatStore.messageImageFileList?.length || 0) + (chatStore.messageVideoFileList?.length || 0))
const isGroupDetail = computed(() => route.name == CHAT_ROUTE_NAMES.GROUP)
// methods
const handleClickGroupUsers = () => {
  if(componentType.value === COMPONENT_TYPES.GROUP_USERS){
    componentType.value = COMPONENT_TYPES.FILES;
  } else {
    componentType.value = COMPONENT_TYPES.GROUP_USERS
  }
}

const handleClickWrapper = () => {  
  inputSendMessasgeRef.value.$el.focus()
}

watch([() => route.params?.id], async () => {
  // when route change other than private or group, don't work only work on private or group
  if(route.name == CHAT_ROUTE_NAMES.PRIVATE || route.name == CHAT_ROUTE_NAMES.GROUP){
    chatStore.actionGetMessageLinkList({ chat:route.params?.id})
    chatStore.messageFilesListLoading = true
    await Promise.all([
      chatStore.actionGetMessageFileList({ chat:route.params?.id, type: MESSAGE_TYPES.FILE }),
      chatStore.actionGetMessageImageFileList({ chat:route.params?.id, type: MESSAGE_TYPES.IMAGE }),
      chatStore.actionGetMessageVideoFileList({ chat:route.params?.id, type: MESSAGE_TYPES.VIDEO }),
      chatStore.actionGetMessageAudioFileList({ chat:route.params?.id, type: MESSAGE_TYPES.AUDIO })
    ]).finally(()=>{
      chatStore.messageFilesListLoading = false
    })
  }
},{ immediate: true })
  
</script>
<template>
  <div
    @click="handleClickWrapper"
    class="h-full transition-all duration-500 ease-in-out overflow-hidden"
    :class="chatStore.rightSidebarVisible ? 'w-[336px] border-l' : 'w-0'"
  >
    <div class="flex flex-col h-full w-[336px]">
      <div class="flex min-h-[72px] max-h-[72px] w-full border-b justify-between items-center px-6">
        <span class="text-lg font-medium select-none">{{ t('information') }}</span>
        <base-iconify
          :icon="XMarkSolidIcon"
          class="text-greyscale-500 cursor-pointer"
          @click="chatStore.toggleRightSidebar"
        />
      </div>
      <div class="flex flex-col">
          <!-- avatar -->
          <div class="flex flex-col items-center gap-1 w-full my-12 mx-auto">
            <base-avatar
              :label="isGroupDetail ? chatStore.selectedGroup?.title : chatStore.selectedUser?.first_name"
              :color="isGroupDetail ? '#E2E8F0' : chatStore.selectedUser?.color"
              :image="isGroupDetail ? chatStore.selectedGroup?.image?.url : chatStore.selectedUser?.avatar?.url"
              shape="circle"
              avatar-classes="w-20 h-20"
              label-classes="text-2xl font-semibold select-none text-greyscale-900"
            />
            <h2 class="mt-1 text-base font-semibold select-none text-greyscale-900">{{ isGroupDetail ? chatStore.selectedGroup?.title : chatStore.selectedUser?.full_name}}</h2>
            <p class="text-sm font-medium select-none text-greyscale-500">{{ isGroupDetail ? t('members', { count: chatStore.selectedGroup?.members?.length}) : chatStore.selectedUser?.position}}</p>
          </div>
          <!-- users  -->
          <div 
            v-if="isGroupDetail"
            @click="handleClickGroupUsers"
            class="flex items-center gap-[10px] select-none p-6 py-0 cursor-pointer"
            >
            <base-iconify
              :icon="UsersGroupTwoRoundedBoldIcon"
              class="text-greyscale-300 !h-5 !w-5"
              :class="{ 'order-2': componentType === COMPONENT_TYPES.GROUP_USERS }"
            />
            <span 
              class="grow text-base font-medium text-greyscale-900"
              :class="{ 'order-3': componentType === COMPONENT_TYPES.GROUP_USERS }"
              >
              {{ t('members') }}
            </span>
            <div 
              class="p-1 rounded-full bg-none" 
              :class="{ 'order-1 bg-greyscale-200': componentType === COMPONENT_TYPES.GROUP_USERS }"
              >
              <base-iconify
                :icon="ChevronUp20SolidIcon"
                class="text-greyscale-300 !h-5 !w-5 transform rotate-90"
                :class="{ '!rotate-[-90deg] text-greyscale-500': componentType === COMPONENT_TYPES.GROUP_USERS }"
              />
            </div>
          </div>
          <!-- menu files -->
          <div
            v-if="componentType !== COMPONENT_TYPES.GROUP_USERS" 
            class="flex gap-3 px-6 mt-6"
            >
            <div 
              class="flex flex-col gap-3 py-3 px-3 pr-5 pb-2 relative bg-greyscale-50 rounded-xl cursor-pointer"
              :class="{ '!bg-primary-100': activeFileMenu }" 
              @click="componentType = COMPONENT_TYPES.FILES"
              >
              <div class="flex items-center gap-2">
                <base-iconify
                  :icon="FolderFavouriteStarBoldIcon"
                  class="text-primary-300 !h-5 !w-5"
                  :class="{ '!text-primary-500': activeFileMenu }"
                />
                <span 
                  class="text-xs font-medium select-none text-greyscale-500"
                  :class="{ 'text-greyscale-900': activeFileMenu }"
                  >
                  {{ t('total-files') }}
                </span>
              </div>
              <div class="flex justify-between items-center">
                <h2 class="text-2xl font-semibold text-greyscale-900">{{ allFileCount }}</h2>
                <div v-if="activeFileMenu" class="absolute right-3 border-[6px] border-white bg-primary-500 w-4 h-4 rounded-full shadow-md"></div>
              </div>
            </div>
            <div 
              class="flex flex-col gap-3 py-3 px-3 pr-5 pb-2 relative bg-greyscale-50 rounded-xl cursor-pointer"
              :class="{ '!bg-primary-100': !activeFileMenu }" 
              @click="componentType = COMPONENT_TYPES.LINKS"
              >
              <div class="flex items-center gap-2">
                <base-iconify
                  :icon="PaperclipRoundedBoldIcon"
                  class="text-primary-300 !h-5 !w-5"
                  :class="{ '!text-primary-500': !activeFileMenu }"
                />
                <span 
                  class="text-xs font-medium select-none text-greyscale-500"
                  :class="{ 'text-greyscale-900': !activeFileMenu }"
                  > 
                  {{ t('total-links') }}
                </span>
              </div>
              <div class="flex justify-between items-center">
                <h2 class="text-2xl font-semibold text-greyscale-900">{{ chatStore.messageLinkList?.length || 0 }}</h2>
                <div v-if="!activeFileMenu" class="absolute right-3 border-[6px] border-white bg-primary-500 w-4 h-4 rounded-full shadow-md"></div>
              </div>
            </div>
          </div>
          <!-- files types -->
          <component :is="activeComponent" :onClickFun="(type) => (componentType = type)" class="mt-8" :class="{ '!mt-6': componentType === COMPONENT_TYPES.GROUP_USERS }" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
