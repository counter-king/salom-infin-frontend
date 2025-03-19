<script setup>
// utils
import { returnStatusColor } from '@/utils';
// props 
const props = defineProps({
  user: {
    type: Object
  }
})
</script>
<template>
 <div class="flex gap-3 items-center p-2 hover:bg-greyscale-50 cursor-pointer rounded-xl">
   <base-avatar
     :label="props.user?.first_name"
     :color="props.user?.color"
     :image="props.user?.avatar?.url"
     shape="circle"
     avatar-classes="!w-10 !h-10"
     label-classes="text-lg font-semibold text-greyscale-900"
   />
   <div class="grow flex flex-col">
     <span class="text-sm font-semibold text-greyscale-900">{{ props.user?.full_name }}</span>
     <div class="flex text-xs items-center gap-2">
        <span class="text-greyscale-500 font-medium">{{ props.user?.position }}</span>
        <div class="w-1 h-1 rounded-full bg-greyscale-300"></div>
        <p class="" :class="returnStatusColor(props.user?.status?.code)">{{ props.user?.status?.name}}</p>
     </div>
   </div>
 </div>
</template>