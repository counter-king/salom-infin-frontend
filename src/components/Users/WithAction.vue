<script setup>
//components
import { StatusChip } from '../Chips';
// Props
import avatarProps from './props'
// Macros
const props = defineProps({
  ...avatarProps,
  subTitle: {
    type: String
  },
  item: {
    type: Object,
    default:() => {}
  }
})
</script>

<template>
  <div class="user-with-action-view flex gap-2 bg-greyscale-50 rounded-lg py-[10px] px-3">
    <div class="relative">
      <base-avatar
        :label="item?.full_name"
        :image="item.avatar?.url"
        :color="item?.color"
        :meta="item"
        detailDialog
        avatarClasses="w-8 h-8"
      />
      <div 
        class="absolute bottom-[1px]  border-2 border-greyscale-50 right-0 min-w-[10px] min-h-[10px] w-[10px] h-[10px] rounded-full bg-greyscale-300"
        :class="{'!bg-success-500': item.is_user_online}"
        >
      </div>
    </div>
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-1 font-semibold leading-[1] mb-1">
        <h1 class="text-greyscale-900 text-[13px] font-semibold leading-[1] truncate">{{ props.label }}</h1>
        <slot name="title-after" />
      </div>
      
      <div class="flex items-center gap-1 font-semibold leading-[1]">
        <!-- TODO: исправить потом -->
        <status-chip type="handbook" :status="item.status" class="border border-1 border-opacity-10 !rounded-full !text-xs !py-0 !px-2">
          {{ item.status.name }}
        </status-chip>
        <slot name="sub-title-after" />
      </div>
    </div>
    <div class="flex gap-2 mt-1">
      <slot name="action" />
    </div>
  </div>
</template>

<style>
.asdasd {
  cursor: pointer;
}
</style>
