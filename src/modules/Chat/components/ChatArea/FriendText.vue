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
  avatarVisible: {
    type: Boolean,
    default: false
  },
  onShowContextMenu: {
    type: Function
  },
  user: {
    type: Object
  }
})
</script>

<template>
  <div class="">
    <div class="flex gap-2 select-none">
      <base-avatar 
        :image="props.user?.avatar?.url"
        :label="props.user?.first_name"
        :color="props.user?.color"
        shape="circle"
        avatar-classes="w-8 h-8"
        :class="{'!visible': props.avatarVisible, '!invisible': !props.avatarVisible}"
      />
      <div 
        @contextmenu.prevent="onShowContextMenu($event, { text: props.text})"
         class="friend-text flex flex-col gap-1 bg-white rounded-2xl rounded-bl-[4px] px-4 py-2 cursor-pointer"
         :class="[{'!rounded-2xl !rounded-tl-[4px]': props.avatarVisible}]"
        >
        <div 
          v-if="false"
          class="flex flex-col gap-1 pl-2 border-l-[2px] border-warning-500"
          >
          <span class="text-xs font-semibold text-warning-500">Абдуллаев Рустам</span>
          <span class="text-xs font-medium text-greyscale-500">Привет, хорошо, спасибо!</span>
        </div>
        <p class="text-sm font-medium text-greyscale-900">
          {{ props.text }}
        </p>
      </div>
      <p class="text-xs font-medium text-greyscale-500 self-end">{{ formatHour(props.date) }}</p>
    </div>
  </div>
</template>
<style scoped>
.friend-text {
 box-shadow: 0px 2px 4px 0px rgba(47, 61, 87, 0.03), 0px 1px 1px 0px rgba(95, 110, 169, 0.03); 
}
</style>