<script setup>
// Core
import { computed, ref } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute } from "vue-router"
// Store
import { useDepartmentAssignmentStore } from "@/modules/Settings/stores/departmentAssignment.store"
import logger from "quill/core/logger";
// Components

// Composable
const { t } = useI18n()
const store = useDepartmentAssignmentStore()
const route  = useRoute()

// Reactive
const departmentCheckbox = ref(true)
const branchCheckbox = ref(true)

// Computed
const listComputed = computed(() => {
  const filters = []
  if (departmentCheckbox.value) filters.push('department')
  if (branchCheckbox.value) filters.push('branch')

  return filters.length
    ? store.depBranchList.filter(i => filters.includes(i.type))
    : []
})

// Methods
const onDelete = async (row) => {
  await store.actionDeleteAssignedDepBranch(row, route, t)
}
</script>

<template>
  <div class="department-table-view">
    <div class="flex px-5 py-[18px] justify-between items-center">
      <span class="text-base text-greyscale-900 font-semibold">{{ t('department') }} / {{ t('branch') }}</span>

      <div class="flex items-center gap-x-5">
        <base-checkbox
          v-model="departmentCheckbox"
          label="department"
          binary
        />

        <base-checkbox
          v-model="branchCheckbox"
          label="branch"
          binary
        />
      </div>
    </div>

    <base-simple-table
      :headers="store.depHeaders"
      :list="listComputed"
      :loading="store.depBranchListLoading"
      :actions="['delete']"
      scroll-height="h-[calc(100vh-380px)]"
      empty-description="structural-division-description"
      @emit:on-delete="onDelete"
    />
  </div>
</template>

<style scoped>

</style>
