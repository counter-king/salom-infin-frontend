<script setup>
// Store
import { useChatStore } from "@/modules/Chat/stores";
// Components
import { ChatAreaToolbar } from "@/modules/Chat/components/index";

</script>
<template>
  <div class="h-full flex-1">
    <chat-area-toolbar /> 
    <div class="bg-greyscale-50 h-full w-full"> 
      <router-view />
    </div>
  </div>
</template>

<style scoped>

</style>
