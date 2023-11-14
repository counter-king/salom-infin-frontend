<script setup>
// Core
import { onMounted } from 'vue'
// Store
import { useRegAppeal } from "../../stores/appeal.store"
// Composable
const regAppeal = useRegAppeal()
// Hooks
onMounted(async () => {
  await regAppeal.actionGetList()
})
</script>

<template>
  <div class="registration-incoming-view">
    <div class="flex mb-5">
      <h1 class="text-2xl font-bold text-primary-900">Обращения</h1>
    </div>

    <base-data-table
      :headers="regAppeal.headers"
      :value="regAppeal.list"
    >
    </base-data-table>
  </div>
</template>

<style scoped>

</style>
