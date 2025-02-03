<script setup>
// Core
import { useI18n } from "vue-i18n";
import { computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
// Components
import { ChatAreWrapper, LeftSidebar, RightSidebar } from "@/modules/Chat/components";
// Socket
import { socket } from "@/services/socket";
// css
import 'vue3-emoji-picker/css'

const { t } = useI18n();
const router = useRoute()
const allowedPages = ['ChatPrivateDetail','ChatGroupDetail']
const isShowChat = computed(() => allowedPages.includes(router.name))

// onMounted(() => {
//   socket.connect()
// })

// onUnmounted(() => {
//   socket.disconnect()
// })

</script>
<template>
  <div class="chat-home flex flex-col w-full py-6 px-10" style="height: calc(100vh - 80px)">
    <span class="text-2xl font-semibold">{{ t('chat-messenger') }}</span>

    <div class="flex justify-between h-full mt-5 rounded-2xl shadow-lg bg-white overflow-hidden">

      <left-sidebar />

      <template v-if="isShowChat">
        <chat-are-wrapper />

        <right-sidebar />
      </template>

      <template v-else>
        <div class="flex flex-col justify-center items-center w-full h-full bg-greyscale-50">
          <img src="@/assets/img/chat-default-1.png" alt="no chat" class="w-[142px]">
          <span class="block text-lg font-semibold mt-4 text-greyscale-900">{{ t('select-chat') }}</span>
          <span class="block text-sm font-semibold mt-2 text-greyscale-500">{{ t('select-chat-user') }}</span>
        </div>
      </template>

    </div>
  </div>
</template>

<style scoped>

</style>
