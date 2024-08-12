<script setup>
// Macros
const props = defineProps(['icon'])
</script>

<template>
  <component :is="props.icon" class="w-5 h-5" />
</template>
