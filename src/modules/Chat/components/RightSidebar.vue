<script setup>
// Core
import { useI18n } from "vue-i18n";
// Store
import { useChatStore } from "@/modules/Chat/stores";

const { t } = useI18n();
const chatStore = useChatStore();

</script>

<template>
  <div
    class="h-full transition-all duration-500 ease-in-out overflow-hidden"
    :class="chatStore.rightSidebarVisible ? 'w-[336px] border-l' : 'w-0'"
  >
    <div class="flex flex-col h-full w-[336px]">
      <div class="flex h-[72px] w-full border-b justify-between items-center px-6">
        <span class="text-lg font-medium select-none">{{ t('information') }}</span>

        <base-icon
          name="XIcon"
          width="20"
          height="20"
          color="#767994"
          class="cursor-pointer"
          @click="chatStore.toggleRightSidebar"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
