<script setup>
// Core
import { ref, onMounted, watchEffect } from 'vue'
// Components
import { ActionToolbar } from '@/components/Actions'
import { LinearTable } from '@/components/Table'
import BranchesDropdown from '../components/BranchesDropdown.vue'
import DepartmentsDropdown from '../components/DepartmentsDropdown.vue'
// Services
import { fetchCompaniesList, fetchDepartmentList, fetchDepartmentsWithUserList } from '@/services/common.service'
// Stores
import { useHandbookStore } from '../stores'
// Composable
const handbookStore = useHandbookStore()
// Reactive
const branches = ref([])
const branchSelect = ref(null)
const deparments = ref([])
const deparmentSelect = ref(null)
const departmentUsers = ref([])
// Watch
watchEffect(async () => {
  if(!branchSelect.value) {
    deparments.value = []
  }

  if(branchSelect.value) {
    let { data } = await fetchDepartmentList({ page_size: 30, company: branchSelect.value })
    deparments.value = data.results
    deparmentSelect.value = data.results[0] ? data.results[0].id : null
  }
})
watchEffect(async () => {
  if(!deparmentSelect.value) {
    return
  }

  if(deparmentSelect.value) {
    let { data: users } = await fetchDepartmentsWithUserList({ id: deparmentSelect.value })
    departmentUsers.value = [users]
  }
})
// Hooks
onMounted(async () => {
  let { data } = await fetchCompaniesList({ page_size: 30 })
  branches.value = data.results
  branchSelect.value = data.results[0].id
})
</script>

<template>
  <div class="handbook-view w-full p-10 pt-7">
    <action-toolbar title="Справочник">
      <template #filters>
        <div class="max-w-[300px] w-full">
          <branches-dropdown v-model="branchSelect" :items="branches" />
        </div>

        <div class="max-w-[300px] w-full">
          <departments-dropdown v-model="deparmentSelect" :items="deparments" />
        </div>
      </template>
    </action-toolbar>

    <div class="h-[calc(100vh-200px)] rounded-2xl bg-white shadow-button p-5">
      <linear-table
        :value="departmentUsers"
        row-group-mode="subheader"
      >
      </linear-table>
    </div>
  </div>
</template>
