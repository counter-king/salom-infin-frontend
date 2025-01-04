<script setup>
// Components
import { CheckCircleBoldIcon } from '@/components/Icons'
// Props
import avatarProps from './props'
// Macros
const props = defineProps({
  ...avatarProps,
  title: {
    type: String
  },
  textTruncate: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <div class="flex items-center">
    <div class="w-[22px] h-[22px] mr-3">
      <base-iconify :icon="CheckCircleBoldIcon" class="icon-selected text-primary-500 !w-[22px] !h-[22px] stroke-0 hidden" />

      <div class="icon-not-selected w-5 h-5 border border-greyscale-200 rounded-full"></div>
    </div>

    <h1
      class="max-w-[250px] text-xs font-semibold text-primary-900"
      :class="{ 'truncate' : props.textTruncate }"
    >
      {{ props.title }}
    </h1>
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
