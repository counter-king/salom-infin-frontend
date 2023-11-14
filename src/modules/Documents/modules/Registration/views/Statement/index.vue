<script setup>
// Core
import { onMounted } from 'vue'
// Store
import { useRegStatement } from "../../stores/statement.store"
// Composable
const regStatement = useRegStatement()
// Hooks
onMounted(async () => {
  await regStatement.actionGetList()
})
</script>

<template>
  <div class="registration-incoming-view">
    <div class="flex mb-5">
      <h1 class="text-2xl font-bold text-primary-900">Заявления</h1>
    </div>

    <base-data-table
      :headers="regStatement.headers"
      :value="regStatement.list"
    >
    </base-data-table>
  </div>
</template>

<style scoped>

</style>
