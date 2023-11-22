<script setup>
// Props
import avatarProps from './props'
// Macros
const props = defineProps({
  ...avatarProps,
  title: {
    type: String
  }
})
</script>

<template>
  <div class="flex items-center">
    <div class="w-[22px] h-[22px] mr-3">
      <base-icon name="CheckCircleBgIcon" class="icon-selected w-[22px] h-[22px] stroke-0 hidden" />

      <div class="icon-not-selected w-5 h-5 border border-greyscale-200 rounded-full"></div>
    </div>

    <h1 class="text-xs font-semibold text-primary-900">{{ props.title }}</h1>
  </div>
</template>

<style>
.p-highlight .icon-selected {
  display: block;
}

.p-highlight .icon-not-selected {
  display: none;
}
</style>
