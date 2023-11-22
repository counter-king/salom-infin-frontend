<script setup>
// Core
import { computed } from 'vue'
// Props
import avatarProps from './props'
// Macros
const props = defineProps({
  ...avatarProps,
  title: {
    type: String
  },
  shadow: {
    type: Boolean
  },
  compact: {
    type: Boolean
  }
})
// Computed
const classes = computed(() => {
  return {
    'bg-white shadow-md cursor-pointer rounded-2xl border-t border-r border-l border-greyscale-100': props.shadow,
    'py-[0.375rem] px-[0.75rem]': !props.compact
  }
})
</script>

<template>
  <div class="flex items-center gap-2" :class="classes">
    <slot name="avatar">
      <base-avatar
        :label="props.label"
        :color="props.color"
        :image="props.image"
        :type="props.type"
        :size="props.size"
        :shape="props.shape"
        :avatarClasses="props.avatarClasses"
      />
    </slot>

    <h1 class="text-xs font-semibold text-primary-900">{{ props.title }}</h1>
  </div>
</template>

<style scoped>

</style>
