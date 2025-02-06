<script setup>
// Core
import {onMounted, reactive, ref, watch} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
// Store
import { useAuthStore } from "@/modules/Auth/stores";
import { useChatStore } from "@/modules/Chat/stores";
// Components
import BaseBrickTab from "@/components/UI/BaseBrickTab.vue";
import { MagniferIcon, Plus20SolidIcon, UserRoundedBoldIcon, UsersGroupTwoRoundedBoldIcon } from '@/components/Icons'
import GroupItem from "@/modules/Chat/components/GroupItem.vue";
import UserItem from "@/modules/Chat/components/UserItem.vue";
import UserItemSearch from "@/modules/Chat/components/UserItemSearch.vue";
import CreateGroupDialog from "./CreateGroupDialog.vue";

const { t } = useI18n();
const authStore = useAuthStore();
const chatStore = useChatStore();
const router = useRouter();
const route = useRoute();
// reactive
const search = ref(null);
const createGroupDialogVisible = ref(false);

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
  await chatStore.actionCreatePrivateChat({ member_id: user.id });
}

const onClickSearchedUser = (user) => {
  router.push({ name: 'ChatPrivateDetail', params: { id: user.id }})
  chatStore.selectedUser = user
  chatStore.privateChatList = [user, ...chatStore.privateChatList]
  chatStore.userSearching = false;
}

const onClickChatPrivateUser = (user) => {
  user = user.members.find(member => member.user?.id !== authStore.currentUser.id)
  router.push({ name: 'ChatPrivateDetail', params: { id: user.chat }})
  chatStore.selectedUser = user
}

const onClickChatGroup = (group) => {
  router.push({ name: 'ChatGroupDetail', params: { id: group.id }})
  chatStore.selectedGroup = group
}

// hooks
watch(search, async (val) => {
  if (val) {
    chatStore.userSearching = true;
    await chatStore.actionChatUsersSearchList({ search: val });
    await chatStore.actionUsersList({ search: val });
  } else {
    chatStore.userSearching = false;
  }
})

onMounted(async () => {
  await chatStore.actionGetPrivateChatList({});
  await chatStore.actionGetGroupChatList({});
  if(route.name == 'ChatGroupDetail'){
    chatStore.selectedGroup = chatStore.groupChatList.find(group => group.id == route.params.id)
  }
  if(route.name == 'ChatPrivateDetail'){
    chatStore.selectedUser = chatStore.privateChatList.find(user => user.id == route.params.id)
  }
})

</script>

<template>
  <div class="w-[352px] h-full border-r select-none">
    <div class="flex m-4 mb-0">
      <base-input
        v-model="search"
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
          <p class="text-sm font-medium text-greyscale-500 my-4">Найдено <span class="font-semibold text-greyscale-900">2</span> результата</p>
          <template v-for="user in chatStore.chatUserSearchList" :key="user.id">
            <user-item
              @click="onClickSearchedUser(user)"
              :user="user.members?.find(member => member.user?.id !== authStore.currentUser.id)?.user" 
            />
          </template>
          <!-- users who don't have chat with current user -->
          <p class="text-sm font-medium text-greyscale-500">{{ t('global-search-results') }}</p>
          <user-item-search
            v-for="user in chatStore.userSearchList"
            :key="user.id"
            :user="user"
            @click="onCreateChat(user)"
          />
        </div>
      </template>
    </template>
    <!-- /WHEN SEARCHING -->

    <template v-else>
      <base-brick-tab
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
                <template v-for="user in chatStore.privateChatList" :key="user.id">
                  <user-item
                    @click="onClickChatPrivateUser(user)"
                    :active="user.id === chatStore.selectedUser?.id" 
                    :user="user.members?.find(member => member.user?.id !== authStore.currentUser.id)?.user" 
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
                    :active="group.id === chatStore.selectedGroup?.id"
                  />
                </template>
              </template>
            </template>
          </div>
        </template>

      </base-brick-tab>
    </template>

    <create-group-dialog v-model="createGroupDialogVisible"/>
  </div>

</template>

<style scoped>
::v-deep(.p-tabview-panels) {
  padding-top: 16px!important;
}
</style>
