<script setup>
// utils
import { formatDate } from '@/utils/formatDate';
const props = defineProps({
 date: {
  type: String
 }
})

</script>
<template>
  <div>
    <div class="py-1 px-3 bg-white rounded-[90px] text-xs font-medium text-greyscale-500">
      {{ formatDate(date) }}
    </div>
  </div>
  </template>