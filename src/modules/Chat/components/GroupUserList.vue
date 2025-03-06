<script setup>
// components
import GroupUserItem from './GroupUserItem.vue';
// stores
import { useChatStore } from '../stores';

const chatStore = useChatStore()

const onClickChatPrivateUser = (user) => {
  console.log(user)
}
</script>
<template>
 <div class="px-6 overflow-y-auto"  style="height: calc(100vh - 540px)">
  <template v-for="member in chatStore.selectedGroup?.members" :key="member.user?.id">
    <GroupUserItem @click="onClickChatPrivateUser(member)" :user="member.user" />
  </template>
 </div>
</template>