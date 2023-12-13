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
  stroke: {
    type: Boolean,
    default: true
  }
})
// Methods
const icon = defineAsyncComponent(() =>
  import(`../../assets/svg/${props.name}.svg`)
);
</script>

<template>
  <component
    :is="icon"
    :width="props.width"
    :height="props.height"
    :class="props.stroke ? 'app-stroke-icon' : 'app-filled-icon'"
  />
</template>

<style>
.app-stroke-icon path,
.app-stroke-icon circle {
  stroke: currentColor;
}

.app-filled-icon path,
.app-filled-icon circle {
  fill: currentColor;
}
</style>
