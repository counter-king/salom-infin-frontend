<script setup>
// Store
import { useChatStore } from "@/modules/Chat/stores";
// Components
import { ChatAreToolbar } from "@/modules/Chat/components/index";

const chatStore = useChatStore();
</script>

<template>
  <div class="h-full flex-1">
    <chat-are-toolbar />

  </div>
</template>

<style scoped>

</style>
