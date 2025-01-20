<script setup>
// utils
import { returnStatusColor } from '@/utils';

</script>
<template>
 <div class="flex gap-3 items-center p-2 hover:bg-greyscale-50 cursor-pointer rounded-xl">
   <base-avatar
     label="Doclines Project"
     color="#E2E8F0"
     shape="circle"
     avatar-classes="!w-10 !h-10"
     label-classes="text-lg font-semibold text-greyscale-900"
   />
   <div class="grow flex flex-col">
     <span class="text-sm font-semibold text-greyscale-900">Doclines Project</span>
     <div class="flex text-xs items-center gap-2">
        <span class="text-greyscale-500 font-medium">Administrator</span>
        <div class="w-1 h-1 rounded-full bg-greyscale-300"></div>
        <p class="" :class="returnStatusColor(item?.status?.code)">{{ item?.status?.name || "Рабочие" }}</p>
     </div>
   </div>
 </div>
</template>