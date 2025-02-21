<script setup>
import { ChevronDown20SolidIcon } from '@/components/Icons';

const props = defineProps({
  btnClass: {
   type: String
  }
})

</script>
<template>
 <div 
    class="flex items-center justify-center bg-white rounded-full w-10 h-10 relative cursor-pointer drop-shadow-2xl"
    :class="props.btnClass"
    >
   <base-iconify
     :icon="ChevronDown20SolidIcon"
     class="!w-5 !h-5 text-greyscale-900"
    />
    <!-- <div class="flex items-center justify-center text-[10px] text-white font-semibold h-4 w-4 bg-critic-500 rounded-full absolute top-[-2px] right-0 z-10">2</div> -->
 </div>
</template>