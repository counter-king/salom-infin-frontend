<script setup>
// cores 
// contants
import { collectionStikers } from '../../constatns';

const props = defineProps({
  userReactionList : {
    type: Object,
  },
  emoji : {
    type: String
  },
  onContextMenuClick: {
    type: Function
  },
})
</script>
<template>
  <div 
    @contextmenu.prevent="onContextMenuClick"
    class="min-w-[36px] py-[6px] px-3 border border-primary-300 bg-primary-50 rounded-[90px] text-sm text-greyscale-900 text-medium cursor-pointer select-none"
    >
    {{ collectionStikers[props.emoji] }}
   <span class="ml-1">{{ props.userReactionList?.length }}</span>
  </div>
</template>