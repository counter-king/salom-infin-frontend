<script setup>
// cores
// components
import { CheckReadIcon } from '@/components/Icons';
// constants
import { fileTypes } from '../constatns';
// utils
import { formatHour } from '@/utils/formatDate';

// props
const props = defineProps({
  user: {
    type: Object,
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
        :label="props.user?.first_name"
        :color="props.user?.color"
        shape="circle"
        :image="props.user?.avatar?.url"
        avatar-classes="w-10 h-10"
        label-classes="text-lg font-semibold text-greyscale-900"
      />
      <div :class="{ 'bg-success-500': props.user?.is_user_online, 'bg-greyscale-300': !props.user?.is_user_online }" class="absolute w-3 h-3 rounded-lg right-0 bottom-0 border-[2px] border-white"></div>
    </div>

    <div class="flex flex-col w-full ml-3">
      <div class="flex justify-between w-full items-center">
        <span class="text-sm font-semibold truncate max-w-[180px]">{{ props.user?.full_name }}</span>
        <span class="text-xs font-medium text-greyscale-500">{{ props.user?.last_message_date && formatHour(props.user?.last_message_date) }}</span>
      </div>
      <div class="flex justify-between items-center mt-1">
        <div class="text-xs font-medium text-greyscale-500 truncate max-w-[200px]">
          <template v-if="fileTypes[props.user?.last_message_type]?.icon">
            <base-iconify
              :icon="fileTypes[props.user?.last_message_type]?.icon"
              class="!w-4 !h-4 mr-1 inline-block align-middle"
              :class="fileTypes[props.user?.last_message_type]?.class"
            />
          </template>
          {{ props.user?.last_message }}
        </div>
        <div v-if="!!props.user?.unread_count" class="flex justify-center items-center bg-critic-500 w-5 h-5 rounded-3xl">
          <span class="text-xs font-semibold text-white">{{ props.user?.unread_count}}</span>
        </div>
        <base-iconify
          v-if="false"
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
