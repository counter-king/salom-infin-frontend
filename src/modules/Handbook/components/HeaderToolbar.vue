<script setup>
// Core
import { ref, onMounted, watchEffect, watch } from 'vue'
import { useDebounce } from '@vueuse/core'
// Components
import { ActionToolbar } from '@/components/Actions'
import HandbookDropdown from './Dropdown.vue'
// Services
import {
  fetchCompaniesList,
  fetchDepartmentList,
  fetchDepartmentsUserListBySearch,
  fetchDepartmentsWithUserList
} from '@/services/common.service'
// Macros
const emit = defineEmits(['emit:up', 'emit:search'])
// Reactive
const search = ref(null)
const branches = ref([])
const branchSelect = ref(null)
const departments = ref([])
const departmentSelect = ref(null)
const departmentUsers = ref([])
const isSearch = ref(false);

const debouncedSearch = useDebounce(search, 750)

watch(debouncedSearch, async (value) => {
  // if value is empty if works
  if (!value) {
    let { data: users } = await fetchDepartmentsWithUserList({ id: departmentSelect.value })
    departmentUsers.value = [users]
    isSearch.value = false;
  }
  else {
    let { data } = await fetchDepartmentsUserListBySearch({ search: value })
    departmentUsers.value = data.results
    isSearch.value = true
  }
  emit('emit:up', departmentUsers.value)
  emit('emit:search', isSearch.value);
})

watchEffect(async () => {
  if (!branchSelect.value) {
    departments.value = []
  }

  if (branchSelect.value) {
    let { data } = await fetchDepartmentList({ page_size: 100, company: branchSelect.value })
    departments.value = data.results
    departmentSelect.value = data.results[0] ? data.results[0].id : null
  }
})

watchEffect(async () => {
  if (!departmentSelect.value) {
    return
  }

  if (departmentSelect.value) {
    let { data: users } = await fetchDepartmentsWithUserList({ id: departmentSelect.value })
    departmentUsers.value = [users]

    emit('emit:up', departmentUsers.value)
  }
})

// Hooks
onMounted(async () => {
  let { data } = await fetchCompaniesList({ page_size: 100 })
  branches.value = data.results
  branchSelect.value = data.results[0].id
})
</script>

<template>
  <action-toolbar title="Справочник">
    <template #title-after>
      <input v-model="search" placeholder="Search..."
        class="bg-white w-[350px] h-10 shadow-button leading-[14px] rounded-[80px] outline-0 py-[10px] px-4" />
    </template>

    <template #filters>
      <div class="max-w-[350px] w-full">
        <handbook-dropdown v-model="branchSelect" v-model:options="branches" api-url="companies" placeholder="Филиал" />
      </div>

      <div class="max-w-[350px] w-full">
        <handbook-dropdown v-model="departmentSelect" v-model:options="departments"
          api-url=departments/top-level-departments :api-params="{
            company: branchSelect
          }" placeholder="Подразделение" />
      </div>
    </template>
  </action-toolbar>
</template>
