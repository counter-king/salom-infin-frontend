<script setup>
// Core
import {onMounted, ref, watch} from "vue";
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

const { t } = useI18n();
const authStore = useAuthStore();
const chatStore = useChatStore();
const search = ref(null);
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


watch(search, async (val) => {
  if (val) {
    chatStore.userSearching = true;
    await chatStore.actionChatUsersSearchList({ search: val });
    await chatStore.actionUsersList({ search: val });
  } else {
    chatStore.userSearching = false;
  }
})

// Methods
const createChat = async (user) => {
  await chatStore.actionCreatePrivateChat({ member_id: user.id });
}
const onTabChange = async (val) => {
  if (val.index === 0) {
    await chatStore.actionGetPrivateChatList({});
  }
}

// Hooks
onMounted(async () => {
  await chatStore.actionGetPrivateChatList({});
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
        input-class="h-10"
      />

      <div class="flex justify-center items-center bg-greyscale-50 hover:bg-primary-100 rounded-3xl h-8 w-8 cursor-pointer mt-1">
        <base-icon
          :name="Plus20SolidIcon"
          width="20"
          height="20"
          class="text-primary-500"
        />
      </div>
    </div>

    <!-- WHEN SEARCHING -->
    <template v-if="chatStore.userSearching">
      <template v-if="chatStore.userSearchLoading">
        <base-spinner />
      </template>
      <template v-else>
        <div class="overflow-hidden overflow-y-auto p-4 pt-0" style="height: calc(100vh - 260px)">
          <span class="text-sm font-medium text-greyscale-500">Найдено <span class="font-semibold text-greyscale-900">2</span> результата</span>

          <pre>{{ chatStore.chatList }}</pre>

          <span class="text-sm font-medium text-greyscale-500">{{ t('global-search-results') }}</span>

          <user-item-search
            v-for="user in chatStore.userList"
            :key="user.id"
            :user="user"
            @click="createChat(user)"
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
        class="mt-2"
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
              <template>
                <user-item
                  v-for="i in 30"
                />
              </template>
            </template>
          </div>
        </template>

        <template #group>

          <div class="overflow-hidden overflow-y-auto px-4" style="height: calc(100vh - 332px)">
            <group-item />
          </div>
        </template>

      </base-brick-tab>
    </template>
  </div>

</template>

<style scoped>

</style>
