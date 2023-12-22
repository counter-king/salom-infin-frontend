<script setup>
// Components
import { TreeUsers } from '@/components/Tree'
import FieldGroups from '../../FieldGroups.vue'
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
    <field-groups :headers="props.headers" :data="props.previewDetail">
      <template #preview-actions>
        <slot name="preview-actions" />
      </template>
    </field-groups>

    <tree-users :tree-items="props.treeItems" />
  </div>
</template>

<style scoped>

</style>
