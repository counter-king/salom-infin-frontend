<script setup>
// Store
import { useRegIncoming } from "../../stores/incoming.store"
// Composable
const regStore = useRegIncoming()
</script>

<template>
  <div class="registration-incoming-view">
    <div class="flex mb-5">
      <h1 class="text-2xl font-bold text-primary-900">Входящие</h1>
    </div>

    <base-data-table
      :value="regStore.list"
      :headers="regStore.headers"
    />
  </div>
</template>

<style scoped>

</style>
