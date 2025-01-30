<script setup>
// cores 
// components
const props = defineProps({
  reaction : {
    type: Object,
  },
  onContextMenuClick: {
    type: Function
  },
})

const onContextMenuClick = (event) => {
  props.onContextMenuClick(event);
}
</script>
<template>
  <div 
    @contextmenu.prevent="onContextMenuClick"
    class="w-fit py-[6px] px-3 border border-primary-300 bg-primary-50 rounded-[90px] text-sm text-greyscale-900 text-medium cursor-pointer select-none"
   >{{ props.reaction?.stiker }}<span v-if="true" class="ml-1">{{ props.reaction?.users?.length }}</span></div>
</template>