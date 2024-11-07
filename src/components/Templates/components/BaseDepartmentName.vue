<script setup>
import { hostName } from "@/utils"

const props = defineProps({
  depName: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div
    class="w-full rounded-[6px] text-sm font-semibold px-3 py-1"
    :class="hostName() === 'vercel' ? 'bg-success-10' : 'bg-greyscale-50'"
    :style="{color: hostName() === 'vercel' ? '#174A43' : '#003D64'}"
  >
    {{ depName }}
  </div>
</template>

<style scoped>

</style>
