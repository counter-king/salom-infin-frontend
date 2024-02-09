<script setup>
// Core
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
// Components
import { ActionToolbar } from "@/components/Actions";
import DocType from "@/components/Chips/DocType.vue";
// Constants
import {BOXES_SIGN_COLUMNS, ROUTE_SIGN_SHOW} from "@/modules/Documents/modules/Boxes/constants";
// Store
import { useBoxesSignStore } from "@/modules/Documents/modules/Boxes/stores/sign.store";
// Utils
import { formatDate } from "@/utils/formatDate";

const { t } = useI18n();
const router = useRouter();
const signStore = useBoxesSignStore();

// Methods
const onRowClick = (data) => {
  router.push({
    name: ROUTE_SIGN_SHOW,
    params: {
      id: data.id
    },
    query: {
      compose_id: data.compose.id
    }
  })
}
// Hooks
onMounted(async () => {
  // await signStore.actionGetSignList({ page: signStore.filterState.page, page_size: signStore.filterState.page_size });
})
</script>

<template>
  <div class="sign-view">
    <action-toolbar
      :column-menu-items="signStore.headers"
      :title="t('for_signing')"
      :storage-columns-name="BOXES_SIGN_COLUMNS"
      @emit:reset-headers="signStore.resetHeaders"
    />

    <base-data-table
      :action-list="signStore.actionGetSignList"
      :headers="signStore.headers"
      :loading="signStore.listLoading"
      :storage-columns-name="BOXES_SIGN_COLUMNS"
      :total-count="signStore.totalCount"
      :value="signStore.documentList"
      @emit:set-store-headers="(val) => signStore.headers = val"
      @emit:row-click="onRowClick"
    >
      <template #register_number="{ data }">
        {{ data.compose.register_number }}
      </template>

      <template #type="{ data }">
        <doc-type :type="data.compose.type"/>
      </template>

      <template #register_date="{ data }">
        {{ data.compose.register_date ? formatDate(data.compose.register_date) : null }}
      </template>

      <template #signers="{ data }">
        <base-avatar-group
          :items="data.compose.signers"
          shape="circle"
          avatar-classes="w-8 h-8"
        />
      </template>

      <template #author="{ data }">
        <base-avatar-group
          :items="[data.compose.author]"
          shape="circle"
          avatar-classes="w-8 h-8"
        />
      </template>

      <template #short_description="{ data }">
        {{ data.compose.short_description }}
      </template>
    </base-data-table>
  </div>
</template>

<style scoped>

</style>
