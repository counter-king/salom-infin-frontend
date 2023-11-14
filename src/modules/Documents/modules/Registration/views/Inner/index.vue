<script setup>
// Core
import { onMounted } from 'vue'
// Store
import { useRegInner } from "../../stores/inner.store"
// Components
import { DocTypeChip } from '@/components/Chips'
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

      <template #document_type="{ data }">
        <doc-type-chip :type="data.document_type.name"/>
      </template>

      <template #reviewers="{ data }">
        <!-- {{ data.reviewers }} -->
        <base-avatar
          image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
          shape="circle"
          avatar-classes="w-8 h-8"
        />
      </template>

      <template #action="{ data }">
        <base-button
          color="text-critic-500"
          icon-left="TrashIcon"
          only-icon
          text
          rounded
        />
      </template>
    </base-data-table>
  </div>
</template>

<style scoped>

</style>
