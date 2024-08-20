<script setup>
// Core
import { ref, onMounted, watchEffect } from 'vue'
// Components
import { ActionToolbar } from '@/components/Actions'
import HandbookDropdown from './Dropdown.vue'
// Services
import {
  fetchCompaniesList,
  fetchDepartmentList,
  fetchDepartmentsWithUserList
} from '@/services/common.service'
// Macros
const emit = defineEmits(['emit:up'])
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

    emit('emit:up', departmentUsers.value)
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
  <action-toolbar title="Справочник">
    <template #filters>
      <div class="max-w-[300px] w-full">
        <handbook-dropdown v-model="branchSelect" :items="branches" />
      </div>

      <div class="max-w-[300px] min-w-[200px] w-full">
        <handbook-dropdown v-model="deparmentSelect" :items="deparments" />
      </div>
    </template>
  </action-toolbar>
</template>
