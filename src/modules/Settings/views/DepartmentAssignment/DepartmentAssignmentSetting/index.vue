<script setup>
// Const
import { HR_ASSIGN_DEPARTMENT_EMPLOYEE } from "@/modules/HR/constants"
import { FORM_TYPE_CREATE } from "@/constants/constants"
// Store
import { useDepartmentAssignmentStore } from "@/modules/Settings/stores/departmentAssignment.store"
// Components
import { ActionToolbar } from "@/components/Actions"
import EmployeeTable
  from "@/modules/Settings/views/DepartmentAssignment/DepartmentAssignmentSetting/components/EmployeeTable.vue"
import DepartmentTable
  from "@/modules/Settings/views/DepartmentAssignment/DepartmentAssignmentSetting/components/DepartmentTable.vue"

// Composable
const store = useDepartmentAssignmentStore()
</script>

<template>
  <div class="department-assignment">
    <action-toolbar
      title="department-assignment-setting"
      :action-list="store.actionGetAssignedEmpList"
      :column-menu-items="[]"
      :storage-columns-name="HR_ASSIGN_DEPARTMENT_EMPLOYEE"
      :action-buttons="['export']"
    >
    </action-toolbar>

    <div class="flex w-full gap-x-3 h-[calc(100vh-250px)]">
      <div class="bg-white w-1/2 rounded-2xl overflow-hidden">
        <employee-table />
      </div>

      <div class="bg-white w-1/2 rounded-2xl overflow-hidden">
        <department-table />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
