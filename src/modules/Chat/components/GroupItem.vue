<script setup>
// constants
import { UsersGroupBoldDuotoneIcon, UsersGroupRoundedIcon, UsersGroupTwoRoundedBoldIcon } from '@/components/Icons';
import { fileTypes } from '../constatns';
// utils
import { formatHour } from '@/utils/formatDate';
// props
const props = defineProps({
  group: {
    type: Object,
  },
  active: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <div
     class="flex px-4 py-[14px] hover:bg-greyscale-50  w-full rounded-xl cursor-pointer relative"
    :class="{ 'bg-greyscale-50': active }"
    >
    <base-avatar
      :label="(group?.title || '').toUpperCase()"
      color="#E2E8F0"
      shape="circle"
      :image="group?.image?.url"
      avatar-classes="w-10 h-10"
      label-classes="text-lg font-semibold text-greyscale-900"
    />
    <div class="flex flex-col w-full ml-3">
      <div class="flex justify-between w-full">
        <span class="text-sm font-semibold truncate max-w-[180px]">
           <base-iconify
              :icon="UsersGroupTwoRoundedBoldIcon"
              class="!w-4 !h-4 mr-1 inline-block align-middle text-greyscale-900"
            /> 
            {{ props.group?.title }}
          </span>
        <span class="text-xs font-medium text-greyscale-500">{{ props.group?.last_message_time && formatHour(props.group?.last_message_time) }}</span>
      </div>

      <div class="flex justify-between items-center mt-1">
        <div class="flex gap-[1px] items-center text-xs font-medium text-greyscale-500 truncate max-w-[200px]">
          <span class="flex items-center text-primary-500 font-semibold">{{ props.group?.last_message?.sender?.first_name }}{{props.group?.last_message?.sender?.first_name && ':'}} </span>
            <template v-if="fileTypes[props.group?.last_message?.type]?.icon">
              <base-iconify
              :icon="fileTypes[props.group?.last_message?.type]?.icon"
              class="!w-4 !h-4 mr-1 inline-block align-middle"
              :class="fileTypes[props.group?.last_message?.type]?.class"
              />
            </template>
            {{ props.group?.last_message?.text }}
        </div>
        <div v-if="!!props.group?.unread_count" class="flex justify-center items-center bg-critic-500 w-5 h-5 rounded-3xl p-1">
          <span class="text-xs font-semibold text-white">{{ props.group?.unread_count }} </span>
        </div>
      </div>
    </div>
    <div v-if="active" class="absolute bg-primary-500 left-0 w-[3px] h-[36px] top-4"></div>
  </div>
</template>

<style scoped>

</style>
