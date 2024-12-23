<script setup>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import ProgressSpinner from 'primevue/progressspinner';
import axiosConfig from "@/services/axios.config";
import { dialogConfig } from './config';
import Department from './Department.vue';
import { dispatchNotify } from '@/utils/notify';
import { ref, } from 'vue';
import { replaceSpecChars } from '@/utils/string';
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const props = defineProps({ getFirstPageEmployees: Function, setVisible: Function, visible: Boolean });
const defaultEmployee = { first_name: '', last_name: '', father_name: '', phone: 8, pinfl: 0 };
const employee = ref(defaultEmployee);
const loading = ref(false);
const departments = ref(['']);

const companies = ref([]);
const companiesLoading = ref(false);
const companiesPage = ref(1);
const company = ref('');

const topLevelDepartment = ref('');
const topLevelDepartments = ref([]);
const topLevelDepartmentsLoading = ref(false);
const topLevelDepartmentsPage = ref(1);

const position = ref('');
const positions = ref([]);
const positionsLoading = ref(false);
const positionsPage = ref(1);

const status = ref('');
const statuses = ref([]);
const statusesLoading = ref(false);
const statusesPage = ref(1);

const createUser = () => {
   const rootDepartments = departments.value;
   const newDepartments = rootDepartments.slice(0, rootDepartments.length - 1);
   const department_ids = newDepartments.map(department => department?.id);
   const department = newDepartments[newDepartments.length - 1]?.id || null;
   const companyId = company.value?.id;
   const father_name = employee.value?.father_name;
   const first_name = employee.value?.first_name;
   const last_name = employee.value?.last_name;
   const phone = '99' + String(employee.value?.phone || '').replace(/ /g, '').replace(/\+/g, '');
   const pinfl = employee.value?.pinfl;
   const positionId = position.value?.id;
   const statusId = status.value?.id;
   const top_level_department = topLevelDepartment?.value?.id;
   if(first_name && last_name && String(pinfl || '')?.length === 14 && phone?.length === 12 && companyId && positionId && statusId && top_level_department) {
      loading.value = true;
      const data = { phone, first_name, last_name, father_name, pinfl, company: companyId, top_level_department, department, position: positionId, status: statusId, department_ids };
      axiosConfig
         .post('users/', data)
         .then(response => {
            if(response?.status === 201) {
               dispatchNotify(null, t('created-employee'), 'success');
               props.getFirstPageEmployees();
               updateVisible();
            }
         })
         .catch(() => {})
         .finally(() => {
            loading.value = false;
         });
   } else if(!first_name) {
     dispatchNotify(null, t('enter-first-name'), 'error');
   } else if(!last_name) {
     dispatchNotify(null, t('enter-last-name'), 'error');
   } else if(String(pinfl || '')?.length !== 14) {
     dispatchNotify(null, t('enter-pinfl'), 'error');
   } else if(phone?.length !== 12) {
     dispatchNotify(null, t('enter-phone-number'), 'error');
   } else if(!companyId) {
     dispatchNotify(null, t('enter-branch'), 'error');
   } else if(!top_level_department) {
     dispatchNotify(null, t('enter-department'), 'error');
   } else if(!positionId) {
     dispatchNotify(null, t('enter-position'), 'error');
   } else if(!statusId) {
     dispatchNotify(null, t('enter-status'), 'error');
   }
};
const searchCompanies = ({ search, page }) => {
   companiesLoading.value = true;
   company.value = search;
   departments.value = [''];
   topLevelDepartment.value = '';
   axiosConfig
      .get(`companies/?condition=A&page=${page}&search=${search}`)
      .then(response => {
         const newPage = response?.data?.next ? page + 1 : null;
         const results = response?.data?.results;
         const rootCompanies = page === 1 ? [] : companies.value;
         const newCompanies = Array.isArray(results) ? results : [];
         companiesPage.value = newPage;
         companies.value = [ ...rootCompanies, ...newCompanies ];
      })
      .catch(() => {
         companiesPage.value = null;
      })
      .finally(() => {
         companiesLoading.value = false;
      });
};
const searchTopLevelDepartments = ({ search, page }) => {
   departments.value = [''];
   topLevelDepartment.value = search;
   topLevelDepartmentsLoading.value = true;
   const companyId = company.value?.id;
   axiosConfig
      .get(`departments/top-level-departments/?condition=A,K&page=${page}&search=${search}&company=${companyId}`)
      .then(response => {
         const newPage = response?.data?.next ? page + 1 : null;
         const results = response?.data?.results;
         const rootTopLevelDepartments = page === 1 ? [] : topLevelDepartments.value;
         const newTopLevelDepartments = Array.isArray(results) ? results : [];
         topLevelDepartments.value = [...rootTopLevelDepartments, ...newTopLevelDepartments];
         topLevelDepartmentsPage.value = newPage;
      })
      .catch(() => {
         topLevelDepartmentsPage.value = null;
      })
      .finally(() => {
         topLevelDepartmentsLoading.value = false;
      });
};
const searchPositions = ({ search, page }) => {
   position.value = search;
   positionsLoading.value = true;
   axiosConfig
      .get(`positions/?is_active=true&page=${page}&search=${search}`)
      .then(response => {
         const newPage = response?.data?.next ? page + 1 : null;
         const results = response?.data?.results;
         const rootPositions = page === 1 ? [] : positions.value;
         const newPositions = Array.isArray(results) ? results : [];
         positions.value = [ ...rootPositions, ...newPositions];
         positionsPage.value = newPage;
      })
      .catch(() => {
         positionsPage.value = null;
      })
      .finally(() => {
         positionsLoading.value = false;
      });
};
const searchStatuses = ({ search, page }) => {
   statusesLoading.value = true;
   status.value = search;
   axiosConfig
      .get(`users/statuses/?page=${page}&search=${search}`)
      .then(response => {
         const newPage = response?.data?.next ? page + 1 : null;
         const results = response?.data;
         const rootStatuses = page === 1 ? [] : statuses.value;
         const newStatuses = Array.isArray(results) ? results : [];
         statuses.value = [ ...rootStatuses, ...newStatuses];
         statusesPage.value = newPage;
      })
      .catch(() => {
         statusesPage.value = null;
      })
      .finally(() => {
         statusesLoading.value = false;
      });
};
const updateVisible = () => {
   company.value = '';
   departments.value = [''];
   employee.value = defaultEmployee;
   position.value = '';
   props.setVisible(!props.visible);
   status.value = '';
   topLevelDepartment.value = '';
};
const setDepartments = newDepartments => {
   departments.value = newDepartments;
};
</script>
<template>
   <Dialog
      :closable="!loading"
      :pt="dialogConfig"
      :visible="visible"
      @update:visible="updateVisible"
      :header="t('create-employee')"
      modal
      >
      <div class="flex flex-col pb-10 pt-4">
         <p class="text-sm text-greyscale-500 font-medium mb-1">{{ t('first-name') }}<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="employee.first_name"
            :pt="{ root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']} }"
            :placeholder="t('enter-first-name')"
            type="text"
            @update:modelValue="value => {
               employee = { ...employee, first_name: replaceSpecChars(value) };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">{{ t('last-name') }}<span class="text-red-500 ml-1">*</span></p>
         <InputText
            @update:modelValue="value => {
               employee = { ...employee, last_name: replaceSpecChars(value) };
            }"
            :modelValue="employee.last_name"
            :pt="{ root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']} }"
            :placeholder="t('enter-last-name')"
            type="text"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">{{ t('father-name') }}</p>
         <InputText
            :modelValue="employee.father_name"
            :pt="{ root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']} }"
            :placeholder="t('enter-father-name')"
            type="text"
            @update:modelValue="value => {
               employee = { ...employee, father_name: replaceSpecChars(value) };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">{{ t('pinfl') }}<span class="text-red-500 ml-1">*</span></p>
         <InputNumber
            :maxFractionDigits="0"
            :pt="{ root: {class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm']}, input: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']} }"
            :useGrouping="false"
            :placeholder="t('enter-pinfl')"
            v-model="employee.pinfl"
            @input="({ value }) => {
               const pinfl = +value.toString().slice(0, 14)
               employee = { ...employee, pinfl }
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">{{ t('phone-number') }}<span class="text-red-500 ml-1">*</span></p>
         <InputNumber
            :maxFractionDigits="0"
            :pt="{ root: {class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm']}, input: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']} }"
            :useGrouping="false"
            :placeholder="t('enter-phone-number')"
            prefix="+99"
            v-model="employee.phone"
            @input="({ value }) => {
               const phone = value && value > 7 ? +value.toString().slice(0, 10) : 8;
               employee = { ...employee, phone }
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">{{ t('branch') }}<span class="text-red-500 ml-1">*</span></p>
         <base-auto-complete
            :loading="companiesLoading"
            :options="companies"
            :page="companiesPage"
            :value="company"
            @onInputChange="searchCompanies"
            key="id"
            label="name"
            :noOptionsMessage="t('not-found-branch')"
            :placeholder="t('enter-branch')"
            @onChange="value => {
               company = value;
               departments = [''];
               topLevelDepartment = '';
            }"
            >
            <template #option="{ option }">
               <div class="flex items-center h-11 px-3 text-base">{{ option.name }}</div>
            </template>
         </base-auto-complete>
         <template v-if="company && company.id">
            <p class="text-sm text-greyscale-500 font-medium mb-1 mt-6">{{ t('department') }}<span class="text-red-500 ml-1">*</span></p>
            <base-auto-complete
               :loading="topLevelDepartmentsLoading"
               :options="topLevelDepartments"
               :page="topLevelDepartmentsPage"
               :value="topLevelDepartment"
               @onInputChange="searchTopLevelDepartments"
               key="id"
               label="name"
               :noOptionsMessage="t('department-not-found')"
               :placeholder="t('enter-department')"
               @onChange="value => {
                  topLevelDepartment = value;
               }"
               >
               <template #option="{ option }">
                  <div class="flex items-center h-11 px-3 text-base">{{ option.name }}</div>
               </template>
            </base-auto-complete>
         </template>
         <template v-if="topLevelDepartment && topLevelDepartment.id">
            <Department
               :department="department"
               :departments="departments"
               :key="index"
               :order="index"
               :parent="index === 0 ? topLevelDepartment : departments[index - 1]"
               :setDepartments="setDepartments"
               v-for="(department, index) in departments"
            />
         </template>
         <p class="text-sm text-greyscale-500 font-medium mb-1 mt-6">{{ t('position') }}<span class="text-red-500 ml-1">*</span></p>
         <base-auto-complete
            :loading="positionsLoading"
            :options="positions"
            :page="positionsPage"
            :value="position"
            @onInputChange="searchPositions"
            key="id"
            label="name"
            :noOptionsMessage="t('not-found-position')"
            :placeholder="t('enter-position')"
            @onChange="value => {
               position = value;
            }"
            >
            <template #option="{ option }">
               <div class="flex items-center h-11 px-3 text-base">{{ option.name }}</div>
            </template>
         </base-auto-complete>
         <p class="text-sm text-greyscale-500 font-medium mb-1 mt-6">{{ t('status') }}<span class="text-red-500 ml-1">*</span></p>
         <base-auto-complete
            :loading="statusesLoading"
            :options="statuses"
            :page="statusesPage"
            :value="status"
            @onInputChange="searchStatuses"
            key="id"
            label="name"
            :noOptionsMessage="t('not-found-status')"
            :placeholder="t('enter-status')"
            @onChange="value => {
               status = value
            }"
            >
            <template #option="{ option }">
               <div class="flex items-center h-11 px-3 text-base">{{ option.name }}</div>
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
                  @click="() => { setVisible(!visible) }"
                  class="bg-white border-0 shadow-1 text-greyscale-900 p-component font-semibold text-sm !rounded-full py-[10px] px-4 ml-0 mr-3"
                  rounded
                  style="box-shadow: 0px 1px 1px 0px rgba(95, 110, 169, 0.03), 0px 2px 4px 0px rgba(47, 61, 87, 0.03)"
                  type="button"
               >
                 {{ t('cancel') }}
               </Button>
               <Button
                  @click="createUser"
                  class="p-button p-component font-semibold text-sm !rounded-full py-[9px] px-4"
                  rounded
                  type="button"
               >
                 {{ t('create') }}
               </Button>
            </template>
         </div>
      </template>
   </Dialog>
</template>
<style></style>
