<script setup>
// Components
import { RestartIcon } from "@/components/Icons"

// Methods
const refresh = () => {
  window.location.reload()
}
</script>

<template>
  <base-button
    v-tooltip.bottom="{
      value: `<h4 class='text-xs text-white -my-1'>${locale === 'uz' ? 'Sahifani yangilash' : 'Обновить'}</h4>`,
      escape: true,
      autoHide: false
    }"
    color="bg-greyscale-800 hover:bg-greyscale-900"
    border-color="border-greyscale-800"
    :icon-left="RestartIcon"
    onlyIcon
    rounded
    @click="refresh"
  />
</template>

<style scoped>

</style>
