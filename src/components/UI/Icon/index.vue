<script setup>
// Core
import { defineAsyncComponent } from 'vue'
// Macros
const props = defineProps({
  icon: {
    type: Boolean
  },
  name: {
    type: String
  },
  width: {
    type: [Number, String],
    default: 20
  },
  height: {
    type: [Number, String],
    default: 20
  },
})
// Methods
const icon = defineAsyncComponent(() =>
  import(`../../../assets/svg/${props.name}.svg`)
);
</script>

<template>
  <component
    :is="icon"
    :width="props.width"
    :height="props.height"
    class="app-icon"
  />
</template>

<style>
.app-icon path {
  stroke: currentColor;
}
</style>
