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
import {BOXES_SIGN_COLUMNS, ROUTE_SIGN_SHOW} from "@/modules/Documents/modules/Boxes/constants";
// Store
import { useBoxesSignStore } from "@/modules/Documents/modules/Boxes/stores/sign.store";
// Utils
import { formatDate } from "@/utils/formatDate";

// Composable
const route = useRoute()
const { t } = useI18n()
const router = useRouter()
const signStore = useBoxesSignStore()

// Const
const filterKeys = ["register_number", "document_types", "document_sub_types", "register_date", "department_recipients", "users", "branch_recipients",
  { key: 'department_recipients', label: 'recipient-departments' },
  { key: 'users', label: 'signers' },
  { key: 'branch_recipients', label: 'recipient-branches' }
]

// Methods
const onRowClick = (data) => {
  router.push({
    name: ROUTE_SIGN_SHOW,
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
  // await signStore.actionGetSignList({ page: signStore.filterState.page, page_size: signStore.filterState.page_size });
})
</script>

<template>
  <div class="sign-view">
    <action-toolbar
      :column-menu-items="signStore.headers"
      :title="t('for_signing')"
      :filter-keys="filterKeys"
      :action-list="signStore.actionGetSignList"
      :storage-columns-name="BOXES_SIGN_COLUMNS"
      @emit:reset-headers="signStore.resetHeaders"
    />

    <base-data-table
      :action-list="signStore.actionGetSignList"
      :api-params="{ ...route.query, page_size: 15 } ?? null"
      :headers="signStore.headers"
      :loading="signStore.listLoading"
      :storage-columns-name="BOXES_SIGN_COLUMNS"
      :total-count="signStore.totalCount"
      :value="signStore.documentList"
      scroll-height="calc(100vh - 295px)"
      @emit:set-store-headers="(val) => signStore.headers = val"
      @emit:row-click="onRowClick"
    >
      <template #status="{ data }">
        <status
          :status="data.is_signed"
          type="sign"
        />
      </template>

      <template #register_number="{ data }">
        {{ data.compose.register_number }}
      </template>

      <template #document_type="{ data }">
        <doc-type :type="data.compose.document_type.name"/>
      </template>

      <template #document_sub_type="{ data }">
        <doc-type :type="data.compose.document_sub_type.name"/>
      </template>

      <template #register_date="{ data }">
        {{ data.compose.register_date ? formatDate(data.compose.register_date) : null }}
      </template>

      <template #signers="{ data }">
        <base-avatar-group
          :items="data.compose.signers"
          shape="circle"
          detail-dialog
          avatar-classes="w-8 h-8"
        />
      </template>

      <template #author="{ data }">
        <base-avatar-group
          :items="[data.compose.author]"
          shape="circle"
          detail-dialog
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
