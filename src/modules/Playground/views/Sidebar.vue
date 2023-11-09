<script setup>
// Core
import { ref } from 'vue'
// Reactive
const visible = ref(false)
</script>

<template>
  <div class="p-10">
    <base-button
      label="create"
      @click="visible = !visible"
    />

    <base-sidebar v-model="visible" />
  </div>
</template>
