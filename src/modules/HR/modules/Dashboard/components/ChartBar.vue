<script setup>
const props = defineProps({
  colors: {
    type: Array
  }
})
</script>

<template>
  <div class="chart-bar-view">
    <div class="flex items-center gap-4">
      <div class="max-w-[150px]">
        <h1
          class="text-sm text-greyscale-900 font-medium line-clamp-2"
          v-tooltip.top="{
            value: `<h4 class='text-xs text-white text-center -my-1'>Департамент финансов и экономики</h4>`,
            escape: true,
            autoHide: false
          }"
        >
          Департамент финансов и экономики
        </h1>
      </div>

      <div class="flex flex-1">
        <template v-for="{ color } in colors">
          <div class="flex-1 h-3" :style="{ background: color }"></div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
