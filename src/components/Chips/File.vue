<script setup>
// Components
import { FileTextIcon } from '@/components/Icons'
// Macros
const props = defineProps({
  name: {
    type: String
  }
})
</script>

<template>
  <div class="file-chip-view flex items-center gap-1 bg-white shadow-button py-[2px] px-2 rounded">
    <base-icon :name="FileTextIcon" class="!w-3" />

    <span>{{ props.name }}</span>
  </div>
</template>
