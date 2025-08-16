<script setup>
import GroupTable from '../components/GroupTable.vue'

const props = defineProps({
  value: {
    type: Array,
    default: () => []
  },
  isSearch: {
    type: Boolean
  },
  totalCount: {
    type: Number
  }
})
</script>

<template>
  <div class="h-[calc(100vh-200px)] rounded-2xl bg-white shadow-button p-5">
    <group-table
      :value="value"
      :isSearch="isSearch"
      :totalCount="totalCount"
      row-group-mode="subheader"
    />
  </div>
</template>

<style scoped>

</style>
