<script setup>
// Components
import { GroupTable } from '@/components/Table'
// Macros
const props = defineProps({
  value: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <group-table
    :value="props.value"
    row-group-mode="subheader"
  >
  </group-table>
</template>
