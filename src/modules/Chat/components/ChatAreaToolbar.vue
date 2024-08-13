<script setup>
// Components
import { SidebarMinimalisticIcon } from '@/components/Icons'
// Store
import { useChatStore } from "@/modules/Chat/stores";

const chatStore = useChatStore();
</script>

<template>
  <div class="flex items-center w-full h-[72px] border-b px-6">
    <div class="flex justify-between items-center w-full">
      <div class="flex">
        <div class="relative">
          <base-avatar
            label="Kirgizboev"
            color="#E2E8F0"
            shape="circle"
            avatar-classes="w-11 h-11"
            label-classes="text-lg font-semibold select-none text-greyscale-900"
          />
          <div class="absolute w-4 h-4 bg-success-500 rounded-lg right-0 bottom-0 border-[3px] border-white"></div>
        </div>

        <div class="flex flex-col ml-3">
          <div class="text-base font-semibold select-none">Turg'unov Bahodir</div>
          <div class="text-sm font-medium text-greyscale-500 select-none">HR manager</div>
        </div>
      </div>

      <base-iconify
        :icon="SidebarMinimalisticIcon"
        class="!w-6 !h-6 cursor-pointer"
        :class="chatStore.rightSidebarVisible ? 'text-primary-500' : 'text-greyscale-500'"
        @click="chatStore.toggleRightSidebar"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
