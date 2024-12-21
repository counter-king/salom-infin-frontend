<script setup>
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import { useI18n } from 'vue-i18n'
import axiosConfig from "@/services/axios.config";
import { dialogConfig } from './config';
import { dispatchNotify } from '@/utils/notify';
import { ref } from 'vue';
const { t } = useI18n()
const props = defineProps({
   activeDepartment: Object,
   departmentsList: Array,
   getFirstPageEmployees: Function,
   setVisible: Function,
   topLevelDepartment: Object,
   visible: Boolean,
});
const employee = ref('');
const employeeLoading = ref(false);
const employees = ref([]);
const employeesPage = ref(1);
const loading = ref(false);
const searchEmployees = ({ search, page }) => {
   employeeLoading.value = true;
   employee.value = search;
   const newSearch = typeof search === 'string' ? search : search.full_name;
   axiosConfig
      .get(`users/?page=${page}&search=${newSearch}`)
      .then(response => {
         const newPage = response?.data?.next ? page + 1 : null;
         const results = response?.data?.results;
         const rootEmployees = page === 1 ? [] : employees.value;
         const newEmployees = (Array.isArray(results) ? results: []).map(user => ({...user, position: user?.position?.name, optionDisabled: !user.is_active}));
         employeesPage.value = newPage;
         employees.value = [ ...rootEmployees, ...newEmployees];
      })
      .catch(() => {
         employeesPage.value = null;
      })
      .finally(() => {
         employeeLoading.value = false;
      });
};
const addEmployee = () => {
   const employeeId = employee?.value?.id;
   if(employeeId) {
      const department = props.activeDepartment.id;
      const department_ids = props.departmentsList.map(({ id }) => id);
      const top_level_department = props.topLevelDepartment.id;
      const data = { department: department === top_level_department? null : department, top_level_department, department_ids};
      loading.value = true;
      axiosConfig
         .patch(`users/${employeeId}/`, data)
         .then(response => {
            if(response?.status === 200) {
               employee.value = '';
               dispatchNotify(null, t('added-employee'), 'success');
               props.getFirstPageEmployees();
               props.setVisible(false);
            }
         })
         .catch(() => {})
         .finally(() => {
            loading.value = false;
         });
   } else {
      dispatchNotify(null, t('enter-employee'), 'error');
   }
};
</script>
<template>
   <Dialog
      :closable="!loading"
      :pt="dialogConfig"
      :visible="visible"
      :header="t('add-employee')"
      modal
      @update:visible="() => {
         employee = '';
         setVisible(!visible);
      }">
      <div class="flex flex-col">
         <p class="text-sm text-greyscale-500 font-medium mb-1">{{ t('employee') }}<span class="text-red-500 ml-1">*</span></p>
         <base-auto-complete
            :loading="employeeLoading"
            :options="employees"
            :page="employeesPage"
            :value="employee"
            key="id"
            label="full_name"
            :noOptionsMessage="t('not-found-employee')"
            :placeholder="t('enter-employee')"
            @onInputChange="searchEmployees"
            @onChange="value => {
               employee = value;
            }"
            >
            <template #option="{option}">
               <div class="items-center flex w-[100%] px-3 py-2 text-m font-medium text-primary-900">
                  <div class="mr-3">
                     <Avatar style="color: #ffffff" :label="option.full_name.slice(0, 1)" :style="{'background-color': option.color}" class="w-10 h-10" shape="circle" />
                  </div>
                  <div class="flex flex-col">
                     <div class="text-base">{{ option.full_name }}</div>
                     <div class="flex items-center">
                        <span class="text-sm font-semibold" :style="{'color': option.optionDisabled ? '#F3335C' : '#63BA3D'}">{{ option.status && option.status.name }}</span>
                        <span v-if="option.status && option.status.name" class="mx-2 w-[4px] h-[4px] rounded-full" style="background-color: #79889B"></span>
                        <span class="text-sm font-medium" style="color: #767994">{{ option.position }}</span>
                     </div>
                  </div>
               </div>
            </template>
         </base-auto-complete>
      </div>
      <template #footer>
         <div class="flex justify-end">
            <template v-if="loading">
               <ProgressSpinner class="m-0 w-10 h-10" animationDuration=".5s" strokeWidth="4" />
            </template>
            <template v-else>
               <Button
                  @click="() => {
                     employee = '';
                     setVisible(!visible);
                  }"
                  class="bg-white border-0 shadow-1 text-greyscale-900 p-component font-semibold text-sm !rounded-full py-[10px] px-4 ml-0 mr-3"
                  rounded
                  style="box-shadow: 0px 1px 1px 0px rgba(95, 110, 169, 0.03), 0px 2px 4px 0px rgba(47, 61, 87, 0.03)"
                  type="button"
               >
                  {{ t('cancel') }}
               </Button>
               <Button
                  @click="addEmployee"
                  class="shadow-none p-button p-component font-semibold text-sm !rounded-full py-[9px] px-4 mx-0"
                  rounded
                  type="button"
               >
                  {{ t('add') }}
               </Button>
            </template>
         </div>
      </template>
   </Dialog>
</template>
<style>
.user-search-autocomplete .p-autocomplete-item {
   transition: background 0s !important;
}
.user-search-autocomplete .p-autocomplete-item.p-focus {
   outline: 1px solid var(--primary) !important;
   background: var(--greyscale-50);
}
</style>
