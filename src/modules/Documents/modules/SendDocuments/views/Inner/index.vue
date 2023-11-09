<script setup>
// Core
import {onMounted} from "vue";
// Store
import { useSDInner } from "../../stores/inner.store";
// Components
import DocType from "../../../../../../components/Chips/DocType.vue";
import Status from "../../../../../../components/Chips/Status.vue";

const innerStore = useSDInner();

// Hooks
onMounted(async () => {
  await innerStore.actionGetDocumentList({ page_size: 15 });
})
</script>

<template>
  <div class="sending-documents-inner-view">
    <div class="flex mb-5">
      <h1 class="text-2xl font-bold text-primary-900">Внутренний</h1>
    </div>

    <base-data-table
      :headers="innerStore.headers"
      :value="innerStore.documentList"
      :filter-state="innerStore.filterState"
    >
      <template #type="{ data }">
        <doc-type :type="data.type"/>
      </template>

      <template #status="{ data }">
        <status :status="data.status"/>
      </template>

      <template #signers="{ data }">
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
