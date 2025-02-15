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
    class="min-w-[36px] py-[6px] px-3 border border-primary-300 bg-primary-50 rounded-[90px] text-sm text-greyscale-900 text-medium cursor-pointer select-none"
    >
   {{ props.reaction?.value }}
   <span v-if="false" class="ml-1">2</span>
  </div>
</template>