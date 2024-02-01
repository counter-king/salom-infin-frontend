<script setup>
// Enums
import { WEEK_DAYS } from '@/modules/Calendar/enums'
</script>

<template>
  <div class="grid grid-cols-7">
    <template v-for="week in WEEK_DAYS">
      <div class="flex items-center justify-center h-16 [&:not(:last-child)]:border-r border-greyscale-200">
        <span class="text-sm font-medium text-gray-2">{{ week }}</span>
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>
