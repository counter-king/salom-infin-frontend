<script setup>
// Components
import { GroupTable } from '@/components/Table'
// Macros
const props = defineProps({
  value: {
    type: Array,
    default: () => []
  },
  isSearch: {
    type : Boolean,
    default: false
  }
})
</script>

<template>
  <group-table
    :value="props.value"
    row-group-mode="subheader"
    :isSearch="props.isSearch"
  >
  </group-table>
</template>
