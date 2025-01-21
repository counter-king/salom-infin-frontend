<script setup>
// cores
// componennts
import { CheckBigIcon, CheckReadIcon } from '@/components/Icons';
// utils
import { formatHour } from '@/utils/formatDate';
// props
const props = defineProps({
  text: {
    type: String
  },
  date: {
    type: String 
  },
  avatar: {
    type: String
  }
})
</script>

<template>
  <div class="flex gap-2 select-none">
   <base-avatar 
     :avatar="props.avatar"
     label="Kirgizboev"
     color="#E2E8F0"
     shape="circle"
     avatar-classes="w-8 h-8"
     :class="{'invisible': !props.avatar}"
   />
   <p class="friend-text text-sm font-medium text-greyscale-900 bg-white rounded-xl rounded-bl-[4px] px-4 py-2">{{ props.text }}</p>
  </div>
</template>
<style scoped>
.friend-text {
 box-shadow: 0px 2px 4px 0px rgba(47, 61, 87, 0.03), 0px 1px 1px 0px rgba(95, 110, 169, 0.03); 
}
</style>