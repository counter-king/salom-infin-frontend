<script setup>
// Core
import {computed, onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
// Store
import { useSDStore } from "../stores/index.store";
// Constants
import {SD_INNER_COLUMNS, SD_SUB_TYPE_INNER} from "../constants";
// Components
import DocType from "../../../../../components/Chips/DocType.vue";
import Status from "../../../../../components/Chips/Status.vue";
import { ActionToolbar } from "../../../../../components/Actions";
import { ToolbarMenu } from "../components/index";

const sdStore = useSDStore();
const route = useRoute();
const router = useRouter();

const title = computed(() => {
  return route.query?.sub_type ? sdStore.SD_TOOLBAR_MENU_LIST.find(item => item.sub_type === route.query?.sub_type).label : SD_SUB_TYPE_INNER;
})

const onClickRow = (data) => {
  console.log(data);
}
const onDeleteRow = (data) => {
  console.log(data)
}
const onChangeDocType = (menu) => {
  console.log(menu)
}
const manageRoute = () => {
  if (!(route.query && route.query.sub_type)){
    router.replace({
      query: {
        ...route.query,
        sub_type: SD_SUB_TYPE_INNER
      }
    });
    sdStore.SD_TOOLBAR_MENU_LIST.forEach(menu => {
      menu.active = menu.sub_type === SD_SUB_TYPE_INNER;
    })
  }
}
const create = () => {
  router.push({
    name: "SendDocumentsCreate",
    params: {
      sub_type: route.query.sub_type
    }
  })
}

// Hooks
onMounted(async () => {
  manageRoute();
  await sdStore.actionGetDocumentList({ sub_type: route.query.sub_type ? route.query.sub_type : SD_SUB_TYPE_INNER, page_size: sdStore.filterState.page_size });
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
      @emit:reset-headers="sdStore.resetHeaders"
    >
      <template #end>
        <base-button
          label="create"
          icon-left="AddIcon"
          rounded
          type="button"
          @click="create"
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
      @emit:row-click="onClickRow"
    >
      <template #type="{ data }">
        <doc-type :type="data.type"/>
      </template>

      <template #status="{ data }">
        <status :status="data.status"/>
      </template>

      <template #signers="{ data }">
        <base-avatar-group
          :items="data.signers"
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
          @click="onDeleteRow(data)"
        />
      </template>
    </base-data-table>
  </div>
</template>

<style scoped>

</style>
