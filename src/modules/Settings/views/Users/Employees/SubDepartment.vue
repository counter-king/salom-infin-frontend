<script setup>
import { ref, watch } from 'vue';
import axiosConfig from "@/services/axios.config";
const props = defineProps({ setDepartment: Function, topLevelDepartment: Object, required: Boolean});
const department = ref('');
const departmentsLoading = ref(false);
const departments = ref([]);
const departmentsPage = ref(1);
const searchDepartments = ({ search, page }) => {
   departmentsLoading.value = true;
   department.value = search;
   axiosConfig
      .get(`departments/sub-departments/${props?.topLevelDepartment?.id}/?search=${search}`)
      .then(response => {
         const newPage = response?.data?.next ? page + 1 : null;
         const results = response?.data?.results;
         const rootDepartments = page === 1 ? [] : departments.value;
         const newDepartments = Array.isArray(results) ? results : [];
         departments.value = [ ...rootDepartments, ...newDepartments];
         departmentsPage.value = newPage;
      })
      .catch(() => {
         departmentsPage.value = null;
      })
      .finally(() => {
         departmentsLoading.value = false;
      });
};
watch(department, department => {
   if(typeof department !== 'string' && department) {
      props.setDepartment(department);
   }
})
</script>
<template>
   <p class="text-sm text-greyscale-500 font-medium mb-1 mt-6">Отдел<span v-if="required" class="text-red-500 ml-1">*</span></p>
   <base-auto-complete
      :loading="departmentsLoading"
      :options="departments"
      :page="departmentsPage"
      :value="department"
      @onInputChange="searchDepartments"
      key="id"
      label="name"
      noOptionsMessage="Отдел не найден"
      placeholder="Введите отдел"
      @onChange="value => {
         department = value;
      }"
      >
      <template #option="{ option }">
         <div class="flex items-center h-11 px-3 text-base">{{ option.name }}</div>
      </template>
   </base-auto-complete>
   <template v-if="department?.id">
      <SubDepartment :setDepartment="setDepartment" :topLevelDepartment="department"/>
   </template>
</template>
<style></style>