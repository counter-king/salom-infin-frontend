<script setup>
// Core
import { defineAsyncComponent, computed } from 'vue'
import { COLOR_TYPES } from '@/enums'
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
  },
  type: {
    type: String,
    default: 'normal',
    validator(value) {
      return ['normal', 'primary'].includes(value)
    }
  }
})
// Computed
const typeClass = computed(() => {
  switch(props.type) {
    case COLOR_TYPES.PRIMARY: // Primary
      return 'base-icon-primary'
    default: // Normal
      return 'base-icon-normal'
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
    :class="[
      props.stroke ? 'app-stroke-icon' : 'app-filled-icon',
      typeClass
    ]"
  />
</template>

<style>
.app-stroke-icon path,
.app-stroke-icon circle,
.app-filled-icon ellipse {
  stroke: currentColor;
}

.app-filled-icon path,
.app-filled-icon circle,
.app-filled-icon ellipse {
  fill: currentColor;
}

.base-icon-primary circle {
  fill: var(--primary-500);
  color: var(--primary-500);
}

.base-icon-primary path {
  color: #fff;
}
</style>
