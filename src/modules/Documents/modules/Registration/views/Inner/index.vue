<script setup>
// Core
import { onMounted } from 'vue'
// Store
import { useRegInner } from "../../stores/inner.store"
// Composable
const regStore = useRegInner()
// Hooks
onMounted(async () => {
  await regStore.actionGetList()
})
</script>

<template>
  <div class="registration-incoming-view">
    <div class="flex mb-5">
      <h1 class="text-2xl font-bold text-primary-900">Внутренний</h1>
    </div>

    <base-data-table
      :headers="regStore.headers"
      :value="regStore.list"
    >
    </base-data-table>
  </div>
</template>

<style scoped>

</style>
