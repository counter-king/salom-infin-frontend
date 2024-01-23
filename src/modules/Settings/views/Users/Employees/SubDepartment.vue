<script setup>
import { ref } from 'vue';
import axiosConfig from "@/services/axios.config";
const props = defineProps({
   clearTopLevelDepartment: Function,
   department: Object,
   setTopLevelDepartment: Function,
});
const subDepartment = ref('');
const subDepartmentLoading = ref(false);
const subDepartments = ref([]);
const searchSubDepartments = e => {
   subDepartmentLoading.value = true;
   const search = e?.target?.value;
   axiosConfig
      .get(`departments/sub-departments/${props?.department?.id}/?search=${search}`)
      .then(response => {
         const results = response?.data?.results;
         const newSubDepartments = Array.isArray(results) ? results : [];
         subDepartments.value = newSubDepartments;
      })
      .catch(() => {
         subDepartments.value = [];
      })
      .finally(() => {
         subDepartmentLoading.value = false;
      });
};
</script>
<template>
   <p class="text-sm text-greyscale-500 font-medium mb-1 mt-6">Департамент<span class="text-red-500 ml-1">*</span></p>
   <base-auto-complete
      :hasValue="subDepartment"
      :loading="subDepartmentLoading"
      :options="subDepartments"
      :value="subDepartment"
      @onChange="({ value }) => {
         subDepartment = value;
         setTopLevelDepartment(value?.id);
      }"
      @onClear="() => {
         subDepartment = '';
         clearTopLevelDepartment();
      }"
      @onInputChange="searchSubDepartments"
      field="name"
      noOptionMessage="Департамент не найден"
      v-model="subDepartment"
      >
      <template #option="{ option }">
         <div class="flex items-center h-11 px-3 text-base">{{ option.name }}</div>
      </template>
   </base-auto-complete>
   <template v-if="subDepartment?.sub_department_count">
      <SubDepartment :setTopLevelDepartment="top_level_department => { setTopLevelDepartment(top_level_department) }" :clearTopLevelDepartment="() => { setTopLevelDepartment(subDepartment) }" :department="subDepartment" />
   </template>
</template>
<style></style>