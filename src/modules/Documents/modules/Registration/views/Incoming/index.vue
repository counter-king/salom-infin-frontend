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
      :headers="regStore.headers"
      :value="regStore.list"
    >
      <template #author="{ data }">
        <base-avatar
          image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
          shape="circle"
          avatar-classes="w-8 h-8"
        />
      </template>
    </base-data-table>
  </div>
</template>

<style scoped>

</style>
