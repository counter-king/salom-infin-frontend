<script setup>
// Core
import { ref, onMounted, watchEffect, watch, computed } from 'vue'
import { useDebounce } from '@vueuse/core'
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from 'vue-router';
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
// constants
import { pagination } from '../constants';

const { t } = useI18n();
const route = useRoute()
const router = useRouter()

const emit = defineEmits(['emit:up', 'emit:search'])
// Reactive
const search = ref(null)
const branches = ref([])
const branchSelect = ref(null)
const departments = ref([])
const departmentSelect = ref(null)
const departmentUsers = ref([])
const isSearch = ref(false);
const mainBarnch = ref(false)

// methods
const paginationQuery = computed(() => ({
   page: route.query.page || pagination.page,
   page_size: route.query.page_size || pagination.pageSize,
   first_row: route.query.firstRow || pagination.firstRow
  }))

// constants
const departmentAllOption = {id: "all", name:t('all'),name_uz:t('all'),name_ru:t('all')}
const debouncedSearch = useDebounce(search, 750)

watch(debouncedSearch, async (value) => {
  // if value is empty if works
  if (!value) {
    if(departmentSelect.value != departmentAllOption.id){
      let { data: users } = await fetchDepartmentsWithUserList({ id: departmentSelect.value })
      departmentUsers.value = [users]
      isSearch.value = false;
      emit('emit:up', departmentUsers.value)
    }
    // when search, clear query to get new values
    router.push({ path: router.currentRoute.value.path, query: {} });
  }
  else {
    let { data } = await fetchDepartmentsUserListBySearch({ search: value })
    departmentUsers.value = data.results
    isSearch.value = true
    emit('emit:up', departmentUsers.value, data?.count)
  }

  emit('emit:search', isSearch.value);
})

watchEffect(async () => {
  if (!branchSelect.value) {
    departments.value = []
  }

  if (branchSelect.value) {
    let { data } = await fetchDepartmentList({ page_size:100, company: branchSelect.value, ordering:"name" })
    // if selected branch main, then all option is not add to list
    if (branchSelect.value !== mainBarnch.value.id) {
      departments.value = [departmentAllOption,...data.results]
    } else {
      departments.value = data.results
    }
    departmentSelect.value = departments.value[0]?.id
  }
})

watchEffect(async () => {
  if (!departmentSelect.value) {
    return
  }

  if (departmentSelect.value) {
    // if all deparement are choosed, then it works
    if(departmentSelect.value == departmentAllOption.id){
      let { data } = await fetchDepartmentsUserListBySearch({ ...paginationQuery.value, company: branchSelect.value})
      departmentUsers.value = data.results
      isSearch.value = true;
      emit('emit:search', true);
      emit('emit:up', departmentUsers.value, data?.count)
    } else {
      let { data: users } = await fetchDepartmentsWithUserList({ id: departmentSelect.value })
      departmentUsers.value = [users]
      isSearch.value = false;
      emit('emit:search', false);
      emit('emit:up', departmentUsers.value)
    }
  }
})

// clearing seach, whene other things are selected
watchEffect(()=> {
  if(!!departmentSelect.value && !isSearch.value && !!branchSelect.value || departmentSelect.value == departmentAllOption.id && isSearch){
    search.value = ""
  }
})

// Hooks
onMounted(async () => {
  let { data } = await fetchCompaniesList({ page_size: 100 })
  branches.value = data.results
  mainBarnch.value = branches.value.find((item)=> item.is_main == true )
  branchSelect.value = data.results[0].id
})
</script>

<template>
  <action-toolbar :title="t('handbook')">
    <template #title-after>
      <slot name="title-after" />
    </template>

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
            company: branchSelect, condition: 'A,K'
          }" placeholder="Подразделение" />
      </div>
    </template>
  </action-toolbar>
</template>
