<script setup>
// Store
import { useChatStore } from "@/modules/Chat/stores";
// Components
import { ChatAreaToolbar } from "@/modules/Chat/components/index";

const chatStore = useChatStore();
</script>

<template>
  <div class="h-full flex-1">
    <chat-area-toolbar /> 
    <div class="bg-greyscale-50 h-full w-full px-6 py-4 overflow-y-auto"> 
      <router-view />
    </div>
  </div>
</template>

<style scoped>

</style>
