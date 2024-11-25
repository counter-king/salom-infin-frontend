<script setup>
// Core
import { ref, onMounted, watchEffect, watch } from 'vue'
import { useDebounce } from '@vueuse/core'
import { useI18n } from "vue-i18n";
// Components
import { ActionToolbar } from '@/components/Actions'
import HandbookDropdown from './Dropdown.vue'
import BaseInput from '@/components/UI/BaseInput.vue'
//Icons
import { MagniferIcon } from '@/components/Icons'
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

const { t } = useI18n();
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
    <template #filters>
      <div class="w-full max-w-[316px]">
        <base-input
          v-model="search"
          :icon-left="MagniferIcon"
         :placeholder="t('search')"
          class="flex p-input-icon-left items-center"
          input-class="!pl-10 p-3 bg-white text-xs !rounded-[90px] placeholder:text-xs"
          icon-left-class="!w-4 !h-4"
        />
      </div>
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
