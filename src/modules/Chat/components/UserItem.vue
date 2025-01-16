<script setup>
import { CheckReadIcon } from '@/components/Icons';

// constants
import { fileTypes } from '../constatns';

// props
const props = defineProps({
  user: {
    type: Object,
    default: () => {}
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div 
    class="flex px-4 py-[14px] items-center hover:bg-greyscale-50 w-full rounded-xl cursor-pointer relative"
    :class="{ 'bg-greyscale-50': active }"  
  >
    <div class="relative">
      <base-avatar
        label="Kirgizboev"
        color="#E2E8F0"
        shape="circle"
        avatar-classes="w-10 h-10"
        label-classes="text-lg font-semibold text-greyscale-900"
      />
      <div :class="{ 'bg-success-500': isOnline, 'bg-greyscale-300': !isOnline }" class="absolute w-3 h-3 rounded-lg right-0 bottom-0 border-[2px] border-white"></div>
    </div>

    <div class="flex flex-col w-full ml-3">
      <div class="flex justify-between w-full items-center">
        <span class="text-sm font-semibold">Turg'unov Bahodir</span>
        <span class="text-xs font-medium text-greyscale-500">17:25</span>
      </div>
      <div class="flex justify-between items-center mt-1">
        <div class="text-xs font-medium text-greyscale-500  truncate max-w-[200px]">
          <base-iconify
            v-if="false"
            :icon="fileTypes.file"
            class="!w-4 !h-4 mr-1 inline-block align-middle"
          />
         Привет! Как дела? Где ты  Привет! ходишь. Привет! Как дела? Где ты ходишь...
        </div>
       
        <div v-if="false" class="flex justify-center items-center bg-critic-500 w-5 h-5 rounded-3xl">
          <span class="text-xs font-semibold text-white">2</span>
        </div>
        <base-iconify
          v-else
          :icon="CheckReadIcon"
          class="!w-5 !h-5 text-success-500"
        />
      </div>  
    </div>

    <!-- active indicator -->
    <div v-if="active" class="absolute bg-primary-500 left-0 w-[3px] h-[36px] top-4"></div>
  </div>
</template>

<style scoped>

</style>
