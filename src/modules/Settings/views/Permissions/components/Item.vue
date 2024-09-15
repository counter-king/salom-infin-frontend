<script setup>
// Components
import PermissionActions from './Actions.vue'
// Macros
const props = defineProps({
  item: {
    type: Object,
    default: () => {}
  },
  index: {
    type: Number
  },
  items: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['emit:deleted'])
</script>

<template>
  <div class="group flex items-center hover:bg-greyscale-50 rounded-xl py-[10px] pl-4 pr-3">
    <span class="flex-1 line-clamp-1 text-[15px] leading-[24px] font-semibold text-greyscale-900">{{ item.name_ru }}</span>

    <div class="transition-opacity hidden group-hover:block">
      <permission-actions
        :item="item"
        :index="index"
        :items="items"
        @emit:deleted="emit('emit:deleted')"
      />
    </div>
  </div>
</template>
