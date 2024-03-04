<script setup>
// Props
import avatarProps from './props'
// Macros
const props = defineProps({
  ...avatarProps,
  subTitle: {
    type: String
  }
})
</script>

<template>
  <div class="user-with-action-view flex gap-2 bg-greyscale-50 rounded-lg py-[10px] px-3">
    <base-avatar
      :label="props.label"
    />

    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-1 font-semibold leading-[1] mb-1">
        <h1 class="text-greyscale-900 text-[13px] font-semibold leading-[1] truncate">{{ props.label }}</h1>

        <slot name="title-after" />
      </div>

      <div class="flex items-center gap-1 font-semibold leading-[1]">
        <h1 class="text-greyscale-400 text-[13px] truncate">{{ props.subTitle }}</h1>

        <slot name="sub-title-after" />
      </div>
    </div>

    <div class="flex gap-2 cursor-pointer">
      <slot name="action" />
    </div>
  </div>
</template>

<style scoped>

</style>
