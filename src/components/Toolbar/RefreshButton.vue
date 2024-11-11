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
    color="bg-greyscale-800 hover:bg-greyscale-900"
    border-color="border-greyscale-800"
    :icon-left="RestartIcon"
    label="renew"
    rounded
    @click="refresh"
  />
</template>

<style scoped>

</style>
