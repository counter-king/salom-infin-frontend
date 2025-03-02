<script setup>
// Store
import { useChatStore } from "@/modules/Chat/stores";
// Components
import { ChatAreaToolbar } from "@/modules/Chat/components/index";
// inject
import { inject, ref } from 'vue'
const inputSendMessasgeRef = inject("inputSendMessasgeRef");

const onClickChatArea = () => {
  inputSendMessasgeRef.value.$el.focus()
}

</script>
<template>
  <div class="h-full flex-1" @click="onClickChatArea">
    <chat-area-toolbar /> 
    <div class="bg-greyscale-50 h-full w-full"> 
      <router-view ref="refChatArea" />
    </div>
  </div>
</template>

<style scoped>

</style>
