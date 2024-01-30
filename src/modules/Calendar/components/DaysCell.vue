<script setup>
// Macros
const props = defineProps({
  interval: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="grid grid-cols-7 grid-rows-5 flex-1">
    <template v-for="{ date, status } in props.interval">
      <div
        class="bg-greyscale-50 transition-all hover:bg-greyscale-50 [&:not(:nth-child(7n))]:border-r border-t border-greyscale-200 p-2"
        :class="{ 'bg-white': status === 'now' }"
      >
        <span
          class="text-base font-medium text-gray-2 block text-center"
          :class="{ 'text-primary-900': status === 'now' }"
        >
          {{ date }}
        </span>
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>
