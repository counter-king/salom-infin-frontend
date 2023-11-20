<script setup>
// Core
import {onMounted} from "vue";
// Store
import { useSDStore } from "../stores/index.store";
// Constants
import {SD_INNER_COLUMNS} from "../constants";
// Components
import DocType from "../../../../../components/Chips/DocType.vue";
import Status from "../../../../../components/Chips/Status.vue";
import { ActionToolbar } from "../../../../../components/Actions";
import { ToolbarMenu } from "../components/index"

const sdStore = useSDStore();

const onRowClick = (data) => {
  console.log(data);
}
const onRowDelete = (data) => {
  console.log(data)
}
const onChangeDocType = (menu) => {
  console.log(menu)
}

// Hooks
onMounted(async () => {
  await sdStore.actionGetDocumentList({ page_size: sdStore.filterState.page_size });
})
</script>

<template>
  <div class="sending-documents-inner-view">

    <toolbar-menu
      @emit:change-doc-type="onChangeDocType"
    />

    <action-toolbar
      title="inner"
      :column-menu-items="sdStore.headers"
      :storage-columns-name="SD_INNER_COLUMNS"
      @emit:reset-headers="sdStore.resetHeaders"
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
      :headers="sdStore.headers"
      :value="sdStore.documentList"
      :page-size="sdStore.filterState.page_size"
      :total-count="sdStore.totalCount"
      :storage-columns-name="SD_INNER_COLUMNS"
      :loading="sdStore.listLoading"
      @emit:set-store-headers="(val) => sdStore.headers = val"
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
