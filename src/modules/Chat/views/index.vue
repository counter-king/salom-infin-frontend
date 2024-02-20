<script setup>
// Core
import { useI18n } from "vue-i18n";
// Components
import { ChatAreWrapper, LeftSidebar, RightSidebar } from "@/modules/Chat/components";


const { t } = useI18n();
</script>

<template>
  <div class="chat-home flex flex-col w-full py-6 px-10">
    <span class="text-2xl font-semibold">{{ t('chat-messenger') }}</span>

    <div class="flex justify-between h-full mt-5 rounded-2xl shadow-lg bg-white overflow-hidden">

      <left-sidebar />

      <template v-if="false">
        <chat-are-wrapper />

        <right-sidebar />
      </template>

      <template v-else>
        <div class="flex flex-col justify-center items-center w-full h-full bg-greyscale-50">
          <img src="@/assets/img/chat-default-1.png" alt="no chat" class="w-[142px]">
          <span class="block text-lg font-semibold mt-4">{{ t('select-chat') }}</span>
        </div>
      </template>

    </div>
  </div>
</template>

<style scoped>

</style>
