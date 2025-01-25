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
  },
  onShowContextMenu: {
    type: Function
  }
})
</script>

<template>
  <div class="">
    <div class="flex gap-2 select-none">
      <base-avatar 
        v-if="!props.avatar"
        :avatar="props.avatar"
        label="Kirgizboev"
        color="#E2E8F0"
        shape="circle"
        avatar-classes="w-8 h-8"
      />
      <div @contextmenu.prevent="onShowContextMenu" class="flex flex-col gap-1 bg-white rounded-xl rounded-bl-[4px] px-4 py-2 cursor-pointer">
        <div 
          v-if="true"
          class="flex flex-col gap-1 pl-2 border-l-[2px] border-warning-500"
          >
          <span class="text-xs font-semibold text-warning-500">Абдуллаев Рустам</span>
          <span class="text-xs font-medium text-greyscale-500">Привет, хорошо, спасибо!</span>
        </div>
        <p class="friend-text text-sm font-medium text-greyscale-900">{{ props.text }}</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.friend-text {
 box-shadow: 0px 2px 4px 0px rgba(47, 61, 87, 0.03), 0px 1px 1px 0px rgba(95, 110, 169, 0.03); 
}
</style>