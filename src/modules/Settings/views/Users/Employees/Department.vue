<script setup>
import { ref, watch } from 'vue';
import axiosConfig from "@/services/axios.config";
const props = defineProps({
   department: [Object, String],
   departments: Array,
   order: Number,
   parent: [Object, String],
   setDepartments: Function,
});
const department = ref(props.department);
const departments = ref([]);
const departmentsLoading = ref(false);
const departmentsPage = ref(1);
const searchDepartments = ({ search, page }) => {
   departmentsLoading.value = true;
   department.value = search;
   axiosConfig
      .get(`departments/sub-departments/${props.parent?.id}/?condition=A&search=${search}`)
      .then(response => {
         const newPage = response?.data?.next ? page + 1 : null;
         const results = response?.data?.results;
         const rootDepartments = page === 1 ? [] : departments.value;
         const newDepartments = Array.isArray(results) ? results : [];
         departments.value = [ ...rootDepartments, ...newDepartments ];
         departmentsPage.value = newPage;
      })
      .catch(() => {
         departmentsPage.value = null;
      })
      .finally(() => {
         departmentsLoading.value = false;
      });
};
const onChange = value => {
   department.value = value;
};
watch(department, department => {
   const departments = [...props.departments.slice(0, props.order), department];
   const newDepartments = typeof department !== 'string' && department?.has_child ? [...departments, ''] : departments;
   props.setDepartments(newDepartments);
});
</script>
<template>
   <p class="text-sm text-greyscale-500 font-medium mb-1 mt-6">Отдел<span v-if="order === 0" class="text-red-500 ml-1">*</span></p>
   <base-auto-complete
      :loading="departmentsLoading"
      :options="departments"
      :page="departmentsPage"
      :value="department"
      @onChange="onChange"
      @onInputChange="searchDepartments"
      key="id"
      label="name"
      noOptionsMessage="Отдел не найден"
      placeholder="Введите отдел"
      >
      <template #option="{ option }">
         <div class="flex items-center h-11 px-3 text-base">{{ option.name }}</div>
      </template>
   </base-auto-complete>
</template>
<style></style>