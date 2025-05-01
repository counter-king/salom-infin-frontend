<script setup>
const props = defineProps({
  index: {
    type: [Number, String],
    default: 1
  }
})
</script>

<template>
  <tr class="cursor-pointer hover:bg-greyscale-50">
    <td class="relative">
      <span class="text-sm font-medium text-greyscale-500">{{ index }}</span>
    </td>

    <slot />
  </tr>
</template>

<style scoped>

</style>
