<script setup>
const props = defineProps({
  composeModel: {
    type: Object,
    default: () => {},
    required: true
  }
})
</script>

<template>
  <pre>{{ props.composeModel }}</pre>
</template>

<style scoped>

</style>
