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

  </div>
</template>

<style scoped>

</style>
