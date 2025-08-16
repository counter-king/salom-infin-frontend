<script setup>
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
  <div>Tree type</div>
</template>

<style scoped>

</style>
