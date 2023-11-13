<script setup>
// Core
import { onMounted } from 'vue'
// Store
import { useRegOutgoing } from "../../stores/outgoing.store"
// Composable
const regOutgoing = useRegOutgoing()
// Hooks
onMounted(async () => {
  await regOutgoing.actionGetList()
})
</script>

<template>
  <div class="registration-incoming-view">
    <div class="flex mb-5">
      <h1 class="text-2xl font-bold text-primary-900">Внутренний</h1>
    </div>

    <base-data-table
      :headers="regOutgoing.headers"
      :value="regOutgoing.list"
    >
    </base-data-table>
  </div>
</template>

<style scoped>

</style>
