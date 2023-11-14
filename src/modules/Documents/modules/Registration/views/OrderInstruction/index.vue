<script setup>
// Core
import { onMounted } from 'vue'
// Store
import { useRegOrderInstruction } from "../../stores/orderInstruction.store"
// Composable
const regOrderInstruction = useRegOrderInstruction()
// Hooks
onMounted(async () => {
  await regOrderInstruction.actionGetList()
})
</script>

<template>
  <div class="registration-incoming-view">
    <div class="flex mb-5">
      <h1 class="text-2xl font-bold text-primary-900">Приказы и распоряжения</h1>
    </div>

    <base-data-table
      :headers="regOrderInstruction.headers"
      :value="regOrderInstruction.list"
    >
    </base-data-table>
  </div>
</template>

<style scoped>

</style>
