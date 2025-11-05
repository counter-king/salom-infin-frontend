<script setup>
// Const
import { SETTINGS_ASSIGN_EXECUTIVES_DEPARTMENT_COLUMN } from "@/modules/Settings/constants"
// Store
import { useAssignExecutivesDepartmentStore } from "@/modules/Settings/stores/assignExecutivesDepartment.store"
// Components
import { ActionToolbar } from "@/components/Actions"
import BaseDataTable from "@/components/UI/BaseDataTable.vue"
import FormDialog from "@/modules/Settings/views/AssignExecutives/Department/FormDialog.vue"

// Composable
const store = useAssignExecutivesDepartmentStore()

// Methods
const onRowClick = (row) => {

}
const onEdit = async (row) => {
  await store.actionManage(row)
}

</script>

<template>
  <div class="department-assigned-executives">
    <action-toolbar
      title="assign-executives"
      :action-list="store.actionGetAssignExecutivesList"
      :column-menu-items="store.headers"
      :storage-columns-name="SETTINGS_ASSIGN_EXECUTIVES_DEPARTMENT_COLUMN"
      :action-buttons="[]"
      search-field
    />

    <base-data-table
      :action-list="store.actionGetAssignExecutivesList"
      :loading="store.listLoading"
      :total-count="store.totalCount"
      :value="store.assignExecutiveList"
      :headers="store.headers"
      :storage-columns-name="SETTINGS_ASSIGN_EXECUTIVES_DEPARTMENT_COLUMN"
      :actions="['edit']"
      scroll-height="calc(100vh - 295px)"
      @emit:set-store-headers="(val) => store.headers = val"
      @emit:row-click="onRowClick"
      @emit:on-edit="onEdit"
    >
      <template #department="{ data }">
        {{ data.department?.name }}
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
