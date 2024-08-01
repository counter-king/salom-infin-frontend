<script setup>
// Components
import { TreeUsers } from '@/components/Tree'
import FieldGroupCollapse from '../../FieldGroupCollapse.vue'
// Macros
const props = defineProps({
  previewDetail: {
    type: Object,
    default: () => {}
  },
  headers: {
    type: Array,
    default: () => []
  },
  treeItems: {
    type: Object,
    default: () => {}
  }
})
</script>

<template>
  <div v-if="props.previewDetail" class="layout-preview-view p-4">
    <field-group-collapse :headers="props.headers" :data="props.previewDetail" />

    <div class="flex items-center gap-2 mt-5">
      <slot name="preview-actions"></slot>
    </div>

    <tree-users :tree-items="props.treeItems" />
  </div>
</template>

<style scoped>

</style>
