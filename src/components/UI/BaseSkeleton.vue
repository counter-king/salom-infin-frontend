<script setup>
import Skeleton from "primevue/skeleton";

const props = defineProps({
  columns: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="py-2 mt-[114px] bg-greyscale-50 h-full w-full">
    <div v-for="_ in 10" class="bg-white px-5 h-14 rounded-lg flex flex-col justify-center items-center mb-2">
      <div class="w-full h-full flex items-center justify-center gap-4">
        <skeleton
          v-if="props.columns.length"
          v-for="_ in props.columns.filter(col => col.active)"
          height="16px"
        />
        <skeleton
          v-else
          width="100%"
          height="16px"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
