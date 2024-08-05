<script setup>
// Core
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
// Components
import { ActionToolbar } from "@/components/Actions";
import DocType from "@/components/Chips/DocType.vue";
import Status from "@/modules/Documents/modules/Boxes/components/Status.vue";
// Constants
import {
  BOXES_APPROVAL_COLUMNS,
  ROUTE_APPROVAL_SHOW
} from "@/modules/Documents/modules/Boxes/constants";
// Store
import { useBoxesApprovalStore } from "@/modules/Documents/modules/Boxes/stores/approval.store";
// Utils
import { formatDate } from "@/utils/formatDate";

const route = useRoute()
const { t } = useI18n();
const router = useRouter();
const approvalStore = useBoxesApprovalStore();

// Methods
const onRowClick = (data) => {
  router.push({
    name: ROUTE_APPROVAL_SHOW,
    params: {
      id: data.id,
      journal: data.compose.journal
    },
    query: {
      compose_id: data.compose.id
    }
  })
}

// Hooks
onMounted(async () => {
  // await approvalStore.actionGetApprovalList({ page: approvalStore.filterState.page, page_size: approvalStore.filterState.page_size });
})
</script>

<template>
  <div class="approval-view">
    <action-toolbar
      :column-menu-items="approvalStore.headers"
      :title="t('for-approval')"
      :storage-columns-name="BOXES_APPROVAL_COLUMNS"
      @emit:reset-headers="approvalStore.resetHeaders"
    />

    <base-data-table
      :action-list="approvalStore.actionGetApprovalList"
      :api-params="{ ...route.query } ?? null"
      :headers="approvalStore.headers"
      :loading="approvalStore.listLoading"
      :storage-columns-name="BOXES_APPROVAL_COLUMNS"
      :total-count="approvalStore.totalCount"
      :value="approvalStore.documentList"
      @emit:set-store-headers="(val) => approvalStore.headers = val"
      @emit:row-click="onRowClick"
    >
      <template #status="{ data }">
        <status
          :status="data.is_approved"
          type="approval"
        />
      </template>

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
