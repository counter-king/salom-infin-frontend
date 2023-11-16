<script setup>
// Core
import {onMounted} from "vue";
// Store
import { useSDInner } from "../../stores/inner.store";
// Constants
import { SD_INNER_COLUMNS } from "../../constants";
// Components
import DocType from "../../../../../../components/Chips/DocType.vue";
import Status from "../../../../../../components/Chips/Status.vue";
import { ActionToolbar } from "../../../../../../components/Actions";

const innerStore = useSDInner();

const onRowClick = (data) => {
  console.log(data);
}
const onRowDelete = (data) => {
  console.log(data)
}

// Hooks
onMounted(async () => {
  await innerStore.actionGetDocumentList({ page_size: innerStore.filterState.page_size });
})
</script>

<template>
  <div class="sending-documents-inner-view">

    <action-toolbar
      title="inner"
      :column-menu-items="innerStore.headers"
      :storage-columns-name="SD_INNER_COLUMNS"
      @emit:reset-headers="innerStore.resetHeaders"
    >
      <template #end>
        <base-button
          label="create"
          icon-left="AddIcon"
          rounded
          type="button"
        />
      </template>
    </action-toolbar>

    <base-data-table
      :headers="innerStore.headers"
      :value="innerStore.documentList"
      :page-size="innerStore.filterState.page_size"
      :total-count="innerStore.totalCount"
      :storage-columns-name="SD_INNER_COLUMNS"
      :loading="innerStore.listLoading"
      @emit:set-store-headers="(val) => innerStore.headers = val"
      @emit:row-click="onRowClick"
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

      <template #action="{ data }">
        <base-button
          color="text-critic-500"
          icon-left="TrashIcon"
          only-icon
          text
          rounded
          @click="onRowDelete(data)"
        />
      </template>
    </base-data-table>
  </div>
</template>

<style scoped>

</style>
