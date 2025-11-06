<script setup>
// Core
import { useRoute, useRouter } from "vue-router"
import { onMounted, ref } from "vue"
import { useI18n } from "vue-i18n"
import { useVuelidate } from "@vuelidate/core"
// Const
import { FORM_TYPE_CREATE, FORM_TYPE_UPDATE } from "@/constants/constants"
// Store
import { useDepartmentAssignmentStore } from "@/modules/Settings/stores/departmentAssignment.store"
// Components
import { AddCircleBoldIcon } from "@/components/Icons"
import { UserStatusChip } from "@/components/Chips"
import UserSelect from "@/components/Select/UserSelect.vue"
import DepartmentMultiSelect from "@/components/Select/DepartmentMultiSelect.vue"
import BranchMultiSelect from "@/components/Select/BranchMultiSelect.vue"
import { DeleteModal } from "@/modules/HR/modules/BusinessTrip/views/Settings/components/TripPrupose";

// Reactive
const formType = ref(FORM_TYPE_CREATE)

// Composable
const { t } = useI18n()
const store = useDepartmentAssignmentStore()
store.initValidationRules()
const $v = useVuelidate(store.rules, store.model)
const route =  useRoute()
const router = useRouter()

// Methods
const openForm = (type) => {
  formType.value = type
  store.dialog = true
}
const resetFormModel = () => {
  store.actionResetModel()
  $v.value.$reset()
}
const manage = async () => {
  const valid = await $v.value.$validate()
  if (!valid) return

  await store.actionManage(formType, t, route)
}
const onRowClick = async (row) => {
  await changeRoute(row.id)
  await store.actionGetDepBranchList(row.id)
  store.empList.forEach(item => item.active = item.id === row.id)
}
const onEdit = async (row) => {
  await changeRoute(row.id)
  formType.value = FORM_TYPE_UPDATE
  await store.actionAdjustModelFields(row)
  store.empList.forEach(item => item.active = item.id === row.id)
}
const onDelete = (row) => {
  store.deletingAssignedEmpId = row.id
  store.deleteDialogVisible = true
}
const changeRoute = async (hr_user_id) => {
  await router.replace({
    query: {
      ...route.query,
      hr_user_id
    }
  })
}

// Hooks
onMounted(async () => {
  await store.actionGetAssignedEmpList()
})
</script>

<template>
  <div>
    <div class="flex px-5 py-3 justify-between items-center">
      <span class="text-base text-greyscale-900 font-semibold">{{ t('employee') }}</span>

      <div
        class="flex bg-greyscale-50 rounded-lg px-4 py-2 gap-x-2 select-none cursor-pointer"
        @click="openForm(FORM_TYPE_CREATE)"
      >
        <base-iconify
          :icon="AddCircleBoldIcon"
          type="primary"
          class="text-primary-500"
        />

        <span class="text-sm text-greyscale-900 font-semibold">{{ t('add') }}</span>
      </div>
    </div>

    <base-simple-table
      :headers="store.empHeaders"
      :list="store.empList"
      :loading="store.empListLoading"
      :actions="['edit', 'delete']"
      action-button-classes="bg-white"
      scroll-height="h-[calc(100vh-380px)]"
      @emit:on-row-click="onRowClick"
      @emit:on-edit="onEdit"
      @emit:on-delete="onDelete"
    >
      <template #employee="{ data }">
        <div class="flex items-center gap-x-2">
          <base-avatar
            :label="data.full_name"
            :color="data.color"
            shape="circle"
            avatar-classes="w-8 h-8"
          />
          <span class="text-sm text-greyscale-900 font-semibold">{{ data.full_name }}</span>
        </div>
      </template>

      <template #status="{ data }">
        <user-status-chip
          :name="data.status?.name"
          :status="{ id: data.status?.code }"
          border
          circle
        />
      </template>
    </base-simple-table>
  </div>

  <!-- DIALOG --->
  <base-dialog
    v-model="store.dialog"
    max-width="max-w-[672px]"
    :label="formType === FORM_TYPE_CREATE ? 'add-employee-department' : 'update-employee-department'"
    :draggable="false"
    @emit:after-hide="resetFormModel"
  >
    <template #content>
      <template v-if="!store.updateGetLoading">
        <div class="flex flex-col gap-y-8">
          <user-select
            v-model="$v.__hr_user.$model"
            :error="$v.__hr_user"
            label="assigned-employee"
            required
            placeholder="select-employee"
          />

          <department-multi-select
            v-model="$v.__departments.$model"
            :error="$v.__departments"
            :required="false"
          />

          <branch-multi-select
            v-model="$v.__branches.$model"
            :error="$v.__branches"
            :text-truncate="true"
            :required="false"
            label="branch"
          />

<!--          <pre>{{ store.model }}</pre>-->
        </div>
      </template>

      <template v-else>
        <base-spinner />
      </template>
    </template>

    <template #footer>
      <div class="flex items-center justify-end w-full">
        <base-button
          color="bg-white hover:bg-greyscale-100 text-primary-dark"
          border-color="border-transparent"
          label="cancel"
          rounded
          shadow
          type="button"
          @click="dialog = false"
        />

        <base-button
          label="send"
          :loading="store.buttonLoading"
          rounded
          shadow
          type="button"
          @click="manage"
        />
      </div>
    </template>
  </base-dialog>
  <!-- /DIALOG --->

  <!-- DELETE CONFIRM MODAL -->
  <DeleteModal
    v-model="store.deleteDialogVisible"
    label="delete"
    :loading="store.deleteButtonLoading"
    :max-width="'max-w-[480px]'"
    :content="{
        title: 'really-want-delete'
      }"
    @click:delete="store.actionDeleteAssignedEmp(t)"
  />
  <!-- /DELETE CONFIRM MODAL -->
</template>

<style scoped>

</style>
