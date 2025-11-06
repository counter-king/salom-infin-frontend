<script setup>
// Const
import {
  SETTINGS_ASSIGN_EXECUTIVES_BRANCH_COLUMN,
} from "@/modules/Settings/constants"
// Store
import { useAssignExecutivesBranchStore } from "@/modules/Settings/stores/assignExecutivesBranch.store"
// Components
import { ActionToolbar } from "@/components/Actions"
import BaseDataTable from "@/components/UI/BaseDataTable.vue"
import FormDialog from "@/modules/Settings/views/AssignExecutives/Branch/FormDialog.vue"

// Composable
const store = useAssignExecutivesBranchStore()

// Methods
const onRowClick = (row) => {

}
const onEdit = async (row) => {
  await store.actionManage(row)
}
</script>

<template>
  <div class="branch-assigned-executives">
    <action-toolbar
      title="assign-executives"
      :action-list="store.actionGetAssignExecutivesList"
      :column-menu-items="store.headers"
      :storage-columns-name="SETTINGS_ASSIGN_EXECUTIVES_BRANCH_COLUMN"
      :action-buttons="[]"
      search-field
    />

    <base-data-table
      :action-list="store.actionGetAssignExecutivesList"
      :loading="store.listLoading"
      :total-count="store.totalCount"
      :value="store.assignExecutiveList"
      :headers="store.headers"
      :storage-columns-name="SETTINGS_ASSIGN_EXECUTIVES_BRANCH_COLUMN"
      :actions="['edit']"
      scroll-height="calc(100vh - 295px)"
      @emit:set-store-headers="(val) => store.headers = val"
      @emit:row-click="onRowClick"
      @emit:on-edit="onEdit"
    >
      <template #branch="{ data }">
        {{ data.branch?.name }}
      </template>

      <template #leader="{ data }">
        <template v-if="data.leader">
          <div class="flex items-center gap-x-3">
            <base-avatar-group
              :items="[data.leader]"
              shape="circle"
              avatar-classes="w-8 h-8"
            />

            <div class="text-sm">{{ data.leader?.full_name }}</div>
          </div>
        </template>
        <template v-else>-</template>
      </template>

      <template #assistants="{ data }">
        <template v-if="data.assistants?.length">
          <base-avatar-group
            :items="data.assistants"
            shape="circle"
            detail-dialog
            avatar-classes="w-8 h-8"
          />
        </template>
        <template v-else>-</template>
      </template>
    </base-data-table>

    <form-dialog />
  </div>
</template>

<style scoped>

</style>
