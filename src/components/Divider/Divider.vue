<script setup>

// props
const props = defineProps({
  class: {
    type: String,
    default: ""
  }
})


</script>

<template>
    <div class="border border-greyscale-200" :class="props.class"></div>
</template>
