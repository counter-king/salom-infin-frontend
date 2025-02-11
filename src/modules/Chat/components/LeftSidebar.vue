<script setup>
// core
import {computed, onMounted, ref, watch} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
// components
import BaseBrickTab from "@/components/UI/BaseBrickTab.vue";
import GroupItem from "@/modules/Chat/components/GroupItem.vue";
import UserItem from "@/modules/Chat/components/UserItem.vue";
import UserItemSearch from "@/modules/Chat/components/UserItemSearch.vue";
import CreateGroupDialog from "./CreateGroupDialog.vue";
// icons
import { MagniferIcon, Plus20SolidIcon, UserRoundedBoldIcon, UsersGroupTwoRoundedBoldIcon } from '@/components/Icons'
// store
import { useAuthStore } from "@/modules/Auth/stores";
import { useChatStore } from "@/modules/Chat/stores";
// constatns
import { CHAT_ROUTE_NAMES, CHAT_TYPES } from "../constatns";

const { t } = useI18n();
const authStore = useAuthStore();
const chatStore = useChatStore();
const router = useRouter();
const route = useRoute();
// reactive
const searchInput = ref(null);
const createGroupDialogVisible = ref(false);
const activeTabIndex= computed(() => route.name == CHAT_ROUTE_NAMES.PRIVATE ? 0 : route.name == CHAT_ROUTE_NAMES.GROUP ? 1 : 0);

const tabPanelList = [
  {
    title: 'personal',
    slot: 'personal',
    icon: UserRoundedBoldIcon
  },
  {
    title: 'groups',
    slot: 'group',
    icon: UsersGroupTwoRoundedBoldIcon
  }
];

// Methods
const onTabChange = async (val) => {
  if (val.index === 0) {
    await chatStore.actionGetPrivateChatList({});
  }
  else if (val.index === 1) {
    await chatStore.actionGetGroupChatList({});
  }
}

const onCreateChat = async (user) => {
  const data = await chatStore.actionCreatePrivateChat({ member_id: user.id });  
  chatStore.selectedUser = data
  router.push({ name: CHAT_ROUTE_NAMES.PRIVATE, params: { id: data.chat_id }})
  searchInput.value = null;
}

const onClickSearchedUser = (item) => {  
  if(item.type == CHAT_TYPES.PRIVATE){
    console.log("ishlamoqda", item)
    router.push({ name: CHAT_ROUTE_NAMES.PRIVATE, params: { id: item.chat_id }})
    chatStore.selectedUser = item
    chatStore.userSearching = false;
    searchInput.value = null;
  } else if(item.type == CHAT_TYPES.GROUP) {
    router.push({ name: CHAT_ROUTE_NAMES.GROUP, params: { id: item.chat_id }})
    chatStore.selectedGroup = item
    chatStore.userSearching = false;
    searchInput.value = null;
  }
}

const onClickChatPrivateUser = (user) => {
  router.push({ name: CHAT_ROUTE_NAMES.PRIVATE, params: { id: user.chat_id }})
  chatStore.selectedUser = user
}

const onClickChatGroup = (group) => {
  router.push({ name: CHAT_ROUTE_NAMES.GROUP, params: { id: group.chat_id }})
  chatStore.selectedGroup = group
  chatStore.userSearching = false;
  searchInput.value = null;
}

// hooks
watch(searchInput, async (val) => {
  if (val) {
    chatStore.userSearching = true;
    await chatStore.actionChatUsersSearchList({ search: val });
    await chatStore.actionUsersSearchList({ search: val });
    await chatStore.actionUsersSearchByMessageList({ search: val });
  } else {
    chatStore.userSearching = false;
  }
})

onMounted(async () => {
  await chatStore.actionGetPrivateChatList({});
  await chatStore.actionGetGroupChatList({});
  if(route.name == CHAT_ROUTE_NAMES.GROUP){
    chatStore.selectedGroup = await chatStore.actionGetGroupChatById(route.params.id)
  }
  if(route.name == CHAT_ROUTE_NAMES.PRIVATE){
    chatStore.selectedUser = await chatStore.actionGetPrivateChatById(route.params.id)
  }
})

</script>

<template>
  <div class="w-[352px] h-full border-r select-none">
    <div class="flex m-4 mb-0">
      <base-input
        v-model="searchInput"
        :icon-left="MagniferIcon"
        placeholder="search"
        class="p-input-icon-left w-[270px] mr-2"
        input-class="h-10 pl-10"
      />

      <div class="flex justify-center items-center bg-greyscale-50 hover:bg-primary-100 rounded-3xl h-8 w-8 cursor-pointer mt-1">
        <base-iconify
          :icon="Plus20SolidIcon"
          width="20"
          height="20"
          class="text-primary-500"
          @click="createGroupDialogVisible = true"
        />
      </div>
    </div>

    <!-- WHEN SEARCHING -->
    <template v-if="chatStore.userSearching">
      <template v-if="chatStore.chatUserSearchListLoading">
        <base-spinner />
      </template>
      <template v-else>
        <div class="overflow-hidden overflow-y-auto p-4 pt-0" style="height: calc(100vh - 260px)">
          <!-- chat users who have chat with current user -->
          <p class="text-sm font-medium text-greyscale-500 my-4">Найдено <span class="font-semibold text-greyscale-900">{{ chatStore.chatUserSearchList.length }}</span> результата</p>
          <template v-for="item in chatStore.chatUserSearchList" :key="item.id">
            <template v-if="item.type === 'private'">
              <user-item
              @click="onClickSearchedUser(item)"
              :user="item" 
              />
            </template>
            <template v-else>
              <group-item
                @click="onClickChatGroup(item)"
                :group="item"
              />
            </template>
          </template>
          <!-- users who don't have chat with current user -->
          <p class="text-sm font-medium text-greyscale-500 my-4">{{ t('global-search-results') }}</p>
          <user-item-search
            v-for="user in chatStore.userSearchList"
            :key="user.id"
            :user="user"
            @click="onCreateChat(user)"
          />
          <!-- users who sent messages to current user -->
          <p class="text-sm font-medium text-greyscale-500 my-4">{{ t('message-found',{count: chatStore.usersSearchListByMessage.length })}}</p>
          <template v-for="item in chatStore.usersSearchListByMessage" :key="item.id">
            <user-item
            @click="onClickSearchedUser(item)"
            :user="item" 
            />
          </template>
        </div>
      </template>
    </template>
    <!-- /WHEN SEARCHING -->

    <template v-else>
      <base-brick-tab
        :active-index="activeTabIndex"
        :tab-panel-list="tabPanelList"
        panel-container-class="px-0"
        header-classes="h-8 w-full"
        nav-classes="w-full"
        nav-container-classes="mx-4"
        class="mt-4"
        :on-tab-change="onTabChange"
      >
        <template #personal>
          <div class="overflow-hidden overflow-y-auto px-4" style="height: calc(100vh - 332px)">
            <template v-if="chatStore.privateChatLoading">
              <base-spinner />
            </template>
            <template v-else>
              <template v-if="!chatStore.privateChatList.length">
                <div class="flex flex-col justify-center items-center h-full text-center px-4">
                  <img src="@/assets/img/chat-default.png" alt="chat-default">
                  <span class="text-sm font-semibold block mt-5">{{ t('find-users') }}</span>
                  <span class="text-xs font-medium text-greyscale-500 block mt-1">{{ t('find-users-start-chat') }}</span>
                </div>
              </template> 
              <template v-else>
                <template v-for="item in chatStore.privateChatList" :key="item.id">
                  <user-item
                    @click="onClickChatPrivateUser(item)"
                    :user="item" 
                    :active="item.chat_id === chatStore.selectedUser?.chat_id"
                  />
                </template>
              </template>
            </template>
          </div>
        </template>

        <template #group>
          <div class="overflow-hidden overflow-y-auto px-4" style="height: calc(100vh - 332px)">
            <template v-if="chatStore.groupChatLoading">
              <base-spinner />
            </template>
            <template v-else>
              <template v-if="!chatStore.groupChatList.length">
                <div class="flex flex-col justify-center items-center h-full text-center px-4">
                  <img src="@/assets/img/chat-default.png" alt="chat-default">
                  <span class="text-sm font-semibold block mt-5">{{ t('find-users') }}</span>
                  <span class="text-xs font-medium text-greyscale-500 block mt-1">{{ t('find-users-start-chat') }}</span>
                </div>
              </template> 
              <template v-else>
                <template v-for="group in chatStore.groupChatList" :key="group.id">
                  <group-item
                    @click="onClickChatGroup(group)"
                    :group="group"
                    :active="group.chat_id === chatStore.selectedGroup?.chat_id"
                  />
                </template>
              </template>
            </template>
          </div>
        </template>
      </base-brick-tab>
    </template>
    <create-group-dialog v-model="createGroupDialogVisible" type="create"/>
  </div>

</template>

<style scoped>
::v-deep(.p-tabview-panels) {
  padding-top: 16px!important;
}
</style>
