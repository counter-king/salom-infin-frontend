<script setup>
// stores
import { useAuthStore } from '@/modules/Auth/stores';
// contants
import { collectionStikers } from '../../constatns';

const authStore = useAuthStore()
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
    @contextmenu.prevent="props.onContextMenuClick"
    class="min-w-[36px] py-[6px] px-3 border border-primary-300 bg-primary-50 rounded-[90px] text-sm text-greyscale-900 text-medium cursor-pointer select-none"
    :class="{ 'bg-primary-300 ': props.userReactionList.some(user => user?.id === authStore.currentUser?.id)  }"
    >
    {{ collectionStikers[props.emoji] }}
   <span class="ml-1 text-xs font-medium text-greyscale-500">{{ props.userReactionList?.length }}</span>
  </div>
</template>