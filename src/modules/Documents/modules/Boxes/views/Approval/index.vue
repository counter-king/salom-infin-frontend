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

// Composable
const route = useRoute()
const { t } = useI18n()
const router = useRouter()
const approvalStore = useBoxesApprovalStore()

// Const
const filterKeys = ["register_number", "document_types", "document_sub_types", "register_date", "department_recipients", "users", "branch_recipients",
  { key: 'department_recipients', label: 'recipient-departments' },
  { key: 'users', label: 'signers' },
  { key: 'branch_recipients', label: 'recipient-branches' }
]

// Methods
const onRowClick = (data) => {
  router.push({
    name: ROUTE_APPROVAL_SHOW,
    params: {
      id: data.id,
      document_type: data.compose.document_type.id,
      document_sub_type: data.compose.document_sub_type.id
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
  <div class="approval-view w-">
    <action-toolbar
      :column-menu-items="approvalStore.headers"
      :title="t('for-approval')"
      :storage-columns-name="BOXES_APPROVAL_COLUMNS"
      :filter-keys="filterKeys"
      :action-list="approvalStore.actionGetApprovalList"
      @emit:reset-headers="approvalStore.resetHeaders"
    />

    <base-data-table
      :action-list="approvalStore.actionGetApprovalList"
      :api-params="{ ...route.query, page_size: 15 } ?? null"
      :headers="approvalStore.headers"
      :loading="approvalStore.listLoading"
      :storage-columns-name="BOXES_APPROVAL_COLUMNS"
      :total-count="approvalStore.totalCount"
      :value="approvalStore.documentList"
      scroll-height="calc(100vh - 295px)"
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

      <template #document_type="{ data }">
        <doc-type :type="data.compose.document_type.name"/>
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
        <div class="max-w-[200px] truncate">
          {{ data.compose.short_description }}
        </div>
      </template>
    </base-data-table>
  </div>
</template>

<style scoped>

</style>
