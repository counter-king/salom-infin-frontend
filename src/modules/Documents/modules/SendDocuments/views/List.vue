<script setup>
// Core
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
// Store
import { useSDStore } from "../stores/index.store";
import { usePaginationStore } from "@/stores/pagination.store";
// Constants
import { COMPOSE_DOCUMENT_TYPES } from "@/enums";
import { ROUTE_SD_DETAIL, SD_INNER_COLUMNS } from "../constants";
// Components
import DocType from "../../../../../components/Chips/DocType.vue";
import Status from "../../../../../components/Chips/Status.vue";
import { ActionToolbar } from "../../../../../components/Actions";
import { ToolbarMenu } from "../components/index";
import CreateButton from "@/modules/Documents/modules/SendDocuments/components/CreateButton.vue";
import OverlayButton from "@/components/Menu/OverlayButton.vue";

const sdStore = useSDStore()
const paginationStore = usePaginationStore()
const route = useRoute()
const router = useRouter()
const filterKeys = ["approvers", "author", "curator", "signers", "departments", "register_number", "status", "document_sub_types",]
const keysToIncludeOnClearFilter = ["document_type"]

const title = computed(() => {
  return route.query?.document_type ? sdStore.SD_TOOLBAR_MENU_LIST.find(item => item.document_type === route.query?.document_type).label : COMPOSE_DOCUMENT_TYPES.INNER
})

const apiParams = computed(() => {
  return route.query?.document_type ? { document_type: route.query.document_type, page_size: 15 } : { document_type: COMPOSE_DOCUMENT_TYPES.INNER, page_size: 15 }
})

const onClickRow = (data) => {
  router.push({
    name: ROUTE_SD_DETAIL,
    params: {
      id: data.id,
      document_type: data.document_type.id,
      document_sub_type: data.document_sub_type.id
    }
  })
}
const onDeleteRow = (data) => {
  console.log(data)
}
const onChangeDocType = (menu) => {
  paginationStore.resetPagination();
}
const manageRoute = () => {
  if (!(route.query && route.query.document_type)){
    router.replace({
      query: {
        ...route.query,
        document_type: COMPOSE_DOCUMENT_TYPES.INNER
      }
    });
    sdStore.SD_TOOLBAR_MENU_LIST.forEach(menu => {
      menu.active = menu.document_type === COMPOSE_DOCUMENT_TYPES.INNER;
    })
  }
}

// Hooks
onMounted(async () => {
  manageRoute();
  // await sdStore.actionGetDocumentList({ type: route.query.type ? route.query.type : SD_TYPE_INNER, page_size: sdStore.filterState.page_size });
})
</script>

<template>
  <div class="sending-documents-inner-view">
    <toolbar-menu
      @emit:change-doc-type="onChangeDocType"
    />

    <action-toolbar
      :title="title"
      :column-menu-items="sdStore.headers"
      :storage-columns-name="SD_INNER_COLUMNS"
      :action-list="sdStore.actionGetDocumentList"
      :filter-keys="filterKeys"
      :keys-to-include-on-clear-filter="keysToIncludeOnClearFilter"
      @emit:reset-headers="sdStore.resetHeaders"
    >
      <template #end>
        <overlay-button />
<!--        <create-button />-->
      </template>
    </action-toolbar>


    <base-data-table
      :action-list="sdStore.actionGetDocumentList"
      :api-params="apiParams"
      :headers="sdStore.headers"
      :value="sdStore.documentList"
      :total-count="sdStore.totalCount"
      :storage-columns-name="SD_INNER_COLUMNS"
      :loading="sdStore.listLoading"
      scroll-height="calc(100vh - 295px)"
      @emit:set-store-headers="(val) => sdStore.headers = val"
      @emit:row-click="onClickRow"
    >
      <template #document_sub_type="{ data }">
        {{ data.document_sub_type.name }}
      </template>

      <template #status="{ data }">
        <status :status="data.status" type="compose"/>
      </template>

      <template #signers="{ data }">
        <base-avatar-group
          :items="data.signers"
          shape="circle"
          detail-dialog
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
          @click="onDeleteRow(data)"
        />
      </template>
    </base-data-table>
  </div>
</template>

<style scoped>

</style>
