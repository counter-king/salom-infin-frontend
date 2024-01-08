<script setup>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import ProgressSpinner from 'primevue/progressspinner';
import SubDepartment from './SubDepartment.vue';
import axiosConfig from "@/services/axios.config";
import { dialogConfig } from './config';
import { dispatchNotify } from '@/utils/notify';
import { ref } from 'vue';
import { replaceSpecChars } from '@/utils/string';
const props = defineProps({ getFirstPageEmployees: Function, setVisible: Function, visible: Boolean });
const defaultEmployee = { first_name: '', last_name: '', father_name: '', phone: 8, pinfl: 0, top_level_department: '' };
const companies = ref([]);
const company = ref('');
const companyLoading = ref(false);
const topLevelDepartment = ref('');
const topLevelDepartmentLoading = ref(false);
const topLevelDepartments = ref([]);
const employee = ref(defaultEmployee);
const loading = ref(false);
const position = ref('');
const positionLoading = ref(false);
const positions = ref([]);
const status = ref('');
const statusLoading = ref(false);
const statuses = ref([]);
const createUser = () => {
   const companyId = company.value?.id;
   const departmentId = topLevelDepartment.value?.id;
   const father_name = employee.value?.father_name;
   const first_name = employee.value?.first_name;
   const last_name = employee.value?.last_name;
   const phone = employee.value?.phone.replace(/ /g, '').replace(/\+/g, '');
   const pinfl = employee.value?.pinfl;
   const positionId = position.value?.id;
   const statusId = status.value?.id;
   const top_level_department = employee?.value?.top_level_department;
   if(first_name && last_name && father_name && pinfl?.length === 14 && phone?.length === 12 && companyId && departmentId && positionId && statusId) {
      loading.value = true;
      const data = { phone, first_name, last_name, father_name, pinfl, company: companyId, top_level_department, department: departmentId, position: positionId, status: statusId };
      axiosConfig
         .post('users/', data)
         .then(response => {
            if(response?.status === 201) {
               dispatchNotify('Сотрудник создан', '', 'success');
               props.getFirstPageEmployees();
               props.setVisible(false);
            } else {
               dispatchNotify('Сотрудник не создан', '', 'error');
            }
         })
         .catch(() => {
            dispatchNotify('Сотрудник не создан', '', 'error');
         })
         .finally(() => {
            loading.value = false;
         });
   } else if(!first_name) {
      dispatchNotify('Введите имя', '', 'error');
   } else if(!last_name) {
      dispatchNotify('Введите фамилия', '', 'error');
   } else if(!father_name) {
      dispatchNotify('Введите отчество', '', 'error');
   } else if(pinfl?.length !== 14) {
      dispatchNotify('Введите ПИНФЛ', '', 'error');
   } else if(phone?.length !== 12) {
      dispatchNotify('Введите номер телефона', '', 'error');
   } else if(!companyId) {
      dispatchNotify('Введите филиал', '', 'error');
   } else if(!departmentId) {
      dispatchNotify('Введите департаментa', '', 'error');
   } else if(!positionId) {
      dispatchNotify('Введите должность', '', 'error');
   } else if(!statusId) {
      dispatchNotify('Введите статус', '', 'error');
   }
};
const searchCompanies = e => {
   const search = e.target.value;
   companyLoading.value = true;
   axiosConfig
      .get(`companies/?search=${search}`)
      .then(response => {
         const results = response?.data?.results;
         const newCompanies = Array.isArray(results) ? results : [];
         companies.value = newCompanies;
      })
      .catch(() => {
         companies.value = [];
      })
      .finally(() => {
         companyLoading.value = false;
      });
};
const searchTopLevelDepartments = e => {
   const search = e.target.value;
   topLevelDepartmentLoading.value = true;
   axiosConfig
      .get(`departments/top-level-departments/?search=${search}`)
      .then(response => {
         const results = response?.data?.results;
         const newTopLevelDepartments = Array.isArray(results) ? results : [];
         topLevelDepartments.value = newTopLevelDepartments;
      })
      .catch(() => {
         topLevelDepartments.value = [];
      })
      .finally(() => {
         topLevelDepartmentLoading.value = false;
      });
};
const searchPositions = e => {
   const search = e.target.value;
   positionLoading.value = true;
   axiosConfig
      .get(`positions/?search=${search}`)
      .then(response => {
         const results = response?.data?.results;
         const newPositions = Array.isArray(results) ? results : [];
         positions.value = newPositions;
      })
      .catch(() => {
         positions.value = [];
      })
      .finally(() => {
         positionLoading.value = false;
      });
};
const searchStatuses = e => {
   const search = e.target.value;
   statusLoading.value = true;
   axiosConfig
      .get(`users/statuses/?search=${search}`)
      .then(response => {
         const results = response?.data;
         const newStatuses = Array.isArray(results) ? results : [];
         statuses.value = newStatuses;
      })
      .catch(() => {
         statuses.value = [];
      })
      .finally(() => {
         statusLoading.value = false;
      });
};
const updateVisible = () => {
   companies.value = [];
   company.value = '';
   employee.value = defaultEmployee;
   position.value = '';
   positions.value = [];
   props.setVisible(!props.visible);
   status.value = '';
   statuses.value = [];
   topLevelDepartment.value = '';
   topLevelDepartments.value = [];
}
</script>
<template>
   <Dialog
      :closable="!loading"
      :pt="dialogConfig"
      :visible="visible"
      @update:visible="updateVisible"
      header="Создать сотрудник"
      modal
      >
      <div class="flex flex-col pb-10 pt-4">
         <p class="text-sm text-greyscale-500 font-medium mb-1">Имя<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="employee.first_name"
            :pt="{ root: {class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm']} }"
            placeholder="Введите имя"
            type="text"
            @update:modelValue="value => {
               employee = { ...employee, first_name: replaceSpecChars(value) };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Фамилия<span class="text-red-500 ml-1">*</span></p>
         <InputText
            @update:modelValue="value => {
               employee = { ...employee, last_name: replaceSpecChars(value) };
            }"
            :modelValue="employee.last_name"
            :pt="{ root: {class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm']} }"
            placeholder="Введите фамилия"
            type="text"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Отчество<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="employee.father_name"
            :pt="{ root: {class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm']} }"
            placeholder="Введите отчество"
            type="text"
            @update:modelValue="value => {
               employee = { ...employee, father_name: replaceSpecChars(value) };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">ПИНФЛ<span class="text-red-500 ml-1">*</span></p>
         <InputNumber
            :maxFractionDigits="0"
            :pt="{ root: {class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm']}, input: {class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm']} }"
            :useGrouping="false"
            placeholder="Введите ПИНФЛ"
            v-model="employee.pinfl"
            @input="({ value }) => {
               const pinfl = +value.toString().slice(0, 14)
               employee = { ...employee, pinfl }
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Номер телефона<span class="text-red-500 ml-1">*</span></p>
         <InputNumber
            :maxFractionDigits="0"
            :pt="{ root: {class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm']}, input: {class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm']} }"
            :useGrouping="false"
            placeholder="Введите номер телефона"
            prefix="+99"
            v-model="employee.phone"
            @input="({ value }) => {
               const phone = value && value > 7 ? +value.toString().slice(0, 10) : 8;
               employee = { ...employee, phone }
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Филиал<span class="text-red-500 ml-1">*</span></p>
         <base-auto-complete
            :hasValue="company"
            :loading="companyLoading"
            :options="companies"
            :value="company"
            @onChange="({ value }) => { company = value }"
            @onClear="() => { company = '' }"
            @onInputChange="searchCompanies"
            field="name"
            noOptionMessage="Филиал не найден"
            v-model="company"
            >
            <template #option="{ option }">
               <div class="flex items-center h-11 px-3 text-base">{{ option.name }}</div>
            </template>
         </base-auto-complete>
         <p class="text-sm text-greyscale-500 font-medium mb-1 mt-6">Департамент<span class="text-red-500 ml-1">*</span></p>
         <base-auto-complete
            :hasValue="topLevelDepartment"
            :loading="topLevelDepartmentLoading"
            :options="topLevelDepartments"
            :value="topLevelDepartment"
            @onChange="({ value }) => { topLevelDepartment = value }"
            @onClear="() => { topLevelDepartment = '' }"
            @onInputChange="searchTopLevelDepartments"
            field="name"
            noOptionMessage="Департамент не найден"
            v-model="topLevelDepartment"
            :setDepartment="top_level_department => {
               employee = { ...employee, top_level_department }
            }"
            >
            <template #option="{ option }">
               <div class="flex items-center h-11 px-3 text-base">{{ option.name }}</div>
            </template>
         </base-auto-complete>
         <template v-if="topLevelDepartment?.id">
            <SubDepartment :setTopLevelDepartment="top_level_department => { employee = { ...employee, top_level_department } }" :clearTopLevelDepartment="() => { employee = { ...employee, top_level_department: topLevelDepartment?.id } }" :department="topLevelDepartment" />
         </template>
         <p class="text-sm text-greyscale-500 font-medium mb-1 mt-6">Должность<span class="text-red-500 ml-1">*</span></p>
         <base-auto-complete
            :hasValue="position"
            :loading="positionLoading"
            :options="positions"
            :value="position"
            @onChange="({ value }) => { position = value }"
            @onClear="() => { position = '' }"
            @onInputChange="searchPositions"
            field="name"
            noOptionMessage="Должность не найден"
            v-model="position"
            >
            <template #option="{ option }">
               <div class="flex items-center h-11 px-3 text-base">{{ option.name }}</div>
            </template>
         </base-auto-complete>
         <p class="text-sm text-greyscale-500 font-medium mb-1 mt-6">Статусь<span class="text-red-500 ml-1">*</span></p>
         <base-auto-complete
            :hasValue="status"
            :loading="statusLoading"
            :options="statuses"
            :value="status"
            @onChange="({ value }) => { status = value }"
            @onClear="() => { status = '' }"
            @onInputChange="searchStatuses"
            field="name"
            noOptionMessage="Статусь не найден"
            v-model="status"
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
                  class="bg-white border-0 shadow-1 text-greyscale-900 p-component font-semibold text-sm rounded-xl !rounded-full py-[10px] px-4 ml-0 mr-3"
                  rounded
                  style="box-shadow: 0px 1px 1px 0px rgba(95, 110, 169, 0.03), 0px 2px 4px 0px rgba(47, 61, 87, 0.03)"
                  type="button">
                  Отмена
               </Button>
               <Button
                  @click="createUser"
                  class="p-button p-component font-semibold text-sm rounded-xl !rounded-full py-[9px] px-4"
                  rounded
                  type="button"
               >Создать</Button>
            </template>
         </div>
      </template>
   </Dialog>
</template>
<style></style>