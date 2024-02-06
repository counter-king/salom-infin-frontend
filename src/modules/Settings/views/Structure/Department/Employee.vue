<script setup>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import ProgressSpinner from 'primevue/progressspinner';
import Department from './Department.vue';
import axiosConfig from "@/services/axios.config";
import { dialogConfig, menuConfig } from './config';
import { dispatchNotify } from '@/utils/notify';
import { ref, onMounted, watch } from 'vue';
import { replaceSpecChars } from '@/utils/string';
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const props = defineProps({ data: Object, employees: Array, field: String, getFirstPageEmployees: Function, setEmployees: Function, activeDepartment: Object });
const deleteLoading = ref(false);
const deleteVisible = ref(false);
const editEmployee = ref({});
const editLoading = ref(false);
const editVisible = ref(false);
const items = ref([]);
const menu = ref(null);
const conditions = ref([]);

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

const employeeEdit = () => {
   const rootDepartments = departments.value;
   const newDepartments = rootDepartments.slice(0, rootDepartments.length - 1);
   const department_ids = newDepartments.map(department => department?.id);
   const department = newDepartments[newDepartments.length - 1]?.id;
   const companyId = company.value?.id;
   const employeeId =  editEmployee?.value?.id;
   const father_name = editEmployee.value?.father_name;
   const first_name = editEmployee.value?.first_name;
   const last_name = editEmployee.value?.last_name;
   const phone = '99' + String(editEmployee.value?.phone || '').replace(/ /g, '').replace(/\+/g, '');
   const pinfl = editEmployee.value?.pinfl;
   const positionId = position.value?.id;
   const statusId = status.value?.id;
   const top_level_department = topLevelDepartment.value?.id;
   if(first_name && last_name && father_name && String(pinfl || '')?.length === 14 && phone?.length === 12 && companyId && department && positionId && statusId && top_level_department) {
      editLoading.value = true;
      const data = { phone, first_name, last_name, father_name, pinfl, company: companyId, top_level_department, department, position: positionId, status: statusId, department_ids };
      axiosConfig
         .put(`users/${employeeId}/`, data)
         .then(response => {
            if(response?.status === 200) {
               dispatchNotify('Сотрудник создан', '', 'success');
               editVisible.value = false;
               props.getFirstPageEmployees();
            } else {
               dispatchNotify('Сотрудник не создан', '', 'error');
            }
         })
         .catch(() => {
            dispatchNotify('Сотрудник не создан', '', 'error');
         })
         .finally(() => {
            editLoading.value = false;
         });
   } else if(!first_name) {
      dispatchNotify('Введите имя', '', 'error');
   } else if(!last_name) {
      dispatchNotify('Введите фамилия', '', 'error');
   } else if(String(pinfl || '')?.length !== 14) {
      dispatchNotify('Введите ПИНФЛ', '', 'error');
   } else if(phone?.length !== 12) {
      dispatchNotify('Введите номер телефона', '', 'error');
   } else if(!companyId) {
      dispatchNotify('Введите филиал', '', 'error');
   } else if(!top_level_department) {
      dispatchNotify('Введите департаментa', '', 'error');
   } else if(!department) {
      dispatchNotify('Введите отдела', '', 'error');
   } else if(!positionId) {
      dispatchNotify('Введите должность', '', 'error');
   } else if(!statusId) {
      dispatchNotify('Введите статус', '', 'error');
   }
};
const searchCompanies = ({ search, page }) => {
   company.value = search;
   companiesLoading.value = true;
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
   topLevelDepartmentsLoading.value = true;
   topLevelDepartment.value = search;
   axiosConfig
      .get(`departments/top-level-departments/?condition=Apage=${page}&search=${search}`)
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
const employeeDelete = () => {
   console.log(props.data)
   // deleteLoading.value = true;
   // axiosConfig
   //    .delete(`users/${props?.data?.id}`)
   //    .then(response => {
   //       if(response?.status === 204) {
   //          deleteVisible.value = false;
   //          dispatchNotify('Сотрудник удален', '', 'success')
   //          props.getFirstPageEmployees();
   //       } else {
   //          dispatchNotify('Сотрудник не удален', '', 'error')
   //       }
   //    })
   //    .catch(() => {
   //       dispatchNotify('Сотрудник не удален', '', 'error')
   //    })
   //    .finally(() => {
   //       deleteLoading.value = false;
   //    });
};
const changeLanguage = () => {
   items.value = [
      { label: 'Активный', value: true, },
      { label: 'Неактивный', value: false }
   ];
   conditions.value = [
      { label: 'Перевод', value: 'transfer' },
      { label: 'Удалить', value: 'delete', },
   ];
};
const toggle = event => {
   menu.value.toggle(event);
}
const setDepartments = newDepartments => {
   departments.value = newDepartments;
};
watch(locale, () => {
   changeLanguage();
});
onMounted(() => {
   changeLanguage();
});
</script>
<template>
   <template v-if="field === 'action'">
      <div class="w-full h-full flex items-center justify-end">
         <Button
            @click="toggle"
            class="shadow-none p-0 m-0 w-[32px] h-[32px] flex items-center justify-center text-xs bg-transparent rounded-full"
            icon
            severity="secondary"
            text
            >
            <svg viewBox="0 0 24 24" width="20" height="20">
               <path fill="#6c757d" d="M12,7a2,2,0,1,0-2-2A2,2,0,0,0,12,7Zm0,10a2,2,0,1,0,2,2A2,2,0,0,0,12,17Zm0-7a2,2,0,1,0,2,2A2,2,0,0,0,12,10Z">
               </path>
            </svg>
         </Button>
         <Menu ref="menu" :model="conditions" style="width: initial !important" :popup="true" :pt="menuConfig">
            <template #item="{ item }">
               <div
                  @click="() => {
                     if(item.value === 'create') {
                     } else {
                        deleteVisible = true
                     }
                  }"
                  class="flex py-[7px] px-3 cursor-pointer">
                  <template v-if="item.value === 'transfer'">
                     <span class="mr-2">
                        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M2.45386 7.55555H1.80386V7.55556L2.45386 7.55555ZM2.45386 8.66667L1.99605 9.12809C2.24947 9.37953 2.65825 9.37953 2.91167 9.12809L2.45386 8.66667ZM4.03154 8.01698C4.28638 7.76414 4.288 7.35258 4.03515 7.09775C3.78231 6.84291 3.37076 6.84129 3.11592 7.09413L4.03154 8.01698ZM1.79179 7.09413C1.53696 6.84129 1.1254 6.84291 0.872563 7.09775C0.619721 7.35258 0.621338 7.76414 0.876174 8.01698L1.79179 7.09413ZM12.2832 5.00708C12.4712 5.3129 12.8716 5.4084 13.1774 5.2204C13.4832 5.03239 13.5787 4.63206 13.3907 4.32625L12.2832 5.00708ZM8.05323 1.35C4.60662 1.35 1.80386 4.12352 1.80386 7.55555H3.10386C3.10386 4.8511 5.31494 2.65 8.05323 2.65V1.35ZM1.80386 7.55556L1.80386 8.66667L3.10386 8.66667L3.10386 7.55555L1.80386 7.55556ZM2.91167 9.12809L4.03154 8.01698L3.11592 7.09413L1.99605 8.20525L2.91167 9.12809ZM2.91167 8.20525L1.79179 7.09413L0.876174 8.01698L1.99605 9.12809L2.91167 8.20525ZM13.3907 4.32625C12.2934 2.54143 10.3127 1.35 8.05323 1.35V2.65C9.84569 2.65 11.4143 3.59372 12.2832 5.00708L13.3907 4.32625Z" fill="#767994"/>
                           <path d="M13.5419 7.33594L13.9989 6.87364C13.7457 6.62337 13.3382 6.62337 13.085 6.87364L13.5419 7.33594ZM11.9609 7.98475C11.7055 8.23711 11.7031 8.64866 11.9555 8.90398C12.2079 9.1593 12.6194 9.1617 12.8747 8.90934L11.9609 7.98475ZM14.2092 8.90934C14.4645 9.1617 14.876 9.1593 15.1284 8.90398C15.3808 8.64866 15.3784 8.23711 15.123 7.98475L14.2092 8.90934ZM3.67229 10.9946C3.48376 10.6891 3.08327 10.5943 2.77778 10.7828C2.47228 10.9713 2.37746 11.3718 2.56599 11.6773L3.67229 10.9946ZM7.92117 14.6526C11.3773 14.6526 14.1919 11.8814 14.1919 8.44705H12.8919C12.8919 11.1492 10.6736 13.3526 7.92117 13.3526V14.6526ZM14.1919 8.44705V7.33594H12.8919V8.44705H14.1919ZM13.085 6.87364L11.9609 7.98475L12.8747 8.90934L13.9989 7.79823L13.085 6.87364ZM13.085 7.79823L14.2092 8.90934L15.123 7.98475L13.9989 6.87364L13.085 7.79823ZM2.56599 11.6773C3.66754 13.4623 5.65509 14.6526 7.92117 14.6526V13.3526C6.11979 13.3526 4.54442 12.4078 3.67229 10.9946L2.56599 11.6773Z" fill="#767994"/>
                        </svg>
                     </span>
                     <span class="text-sm font-medium" style="color: #6c757d">{{ item.label }}</span>
                  </template>
                  <template v-if="item.value === 'delete'">
                     <span class="mr-2">
                        <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                           <path d="M20.5001 6H3.5" stroke="#F3335C" stroke-width="2" stroke-linecap="round"/>
                           <path d="M18.8332 8.5L18.3732 15.3991C18.1962 18.054 18.1077 19.3815 17.2427 20.1907C16.3777 21 15.0473 21 12.3865 21H11.6132C8.95235 21 7.62195 21 6.75694 20.1907C5.89194 19.3815 5.80344 18.054 5.62644 15.3991L5.1665 8.5" stroke="#F3335C" stroke-width="2" stroke-linecap="round"/>
                           <path d="M9.5 11L10 16" stroke="#F3335C" stroke-width="2" stroke-linecap="round"/>
                           <path d="M14.5 11L14 16" stroke="#F3335C" stroke-width="2" stroke-linecap="round"/>
                           <path d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6" stroke="#F3335C" stroke-width="2"/>
                        </svg>
                     </span>
                     <span class="text-sm font-medium" style="color: #F3335C">{{ item.label }}</span>
                  </template>
               </div>
            </template>
         </Menu>
      </div>
   </template>
   <template v-else-if="field === 'position'">
      <span class="text-sm font-medium">{{ data[field] && data[field].name }}</span>
   </template>
   <template v-else>
      <span class="text-sm font-medium">{{ data[field] }}</span>
   </template>
   <Dialog
      :closable="!editLoading"
      :pt="dialogConfig"
      header="Изменить сотрудник"
      modal
      v-model:visible="editVisible">
      <div class="flex flex-col pb-10 pt-4">
         <p class="text-sm text-greyscale-500 font-medium mb-1">Имя<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="editEmployee.first_name"
            :pt="{ root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']} }"
            placeholder="Введите имя"
            type="text"
            @update:modelValue="value => {
               editEmployee = { ...editEmployee, first_name: replaceSpecChars(value) };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Фамилия<span class="text-red-500 ml-1">*</span></p>
         <InputText
            :modelValue="editEmployee.last_name"
            :pt="{ root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']} }"
            placeholder="Введите фамилия"
            type="text"
            @update:modeValue="value => {
               editEmployee = { ...editEmployee, last_name: replaceSpecChars(value) };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Отчество</p>
         <InputText
            :modelValue="editEmployee.father_name"
            :pt="{ root: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']} }"
            placeholder="Введите отчество"
            type="text"
            @update:modelValue="value => {
               editEmployee = { ...editEmployee, father_name: replaceSpecChars(value) };
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">ПИНФЛ<span class="text-red-500 ml-1">*</span></p>
         <InputNumber
            :maxFractionDigits="0"
            :pt="{ root: {class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm']}, input: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']} }"
            :useGrouping="false"
            placeholder="Введите ПИНФЛ"
            v-model="editEmployee.pinfl"
            @input="({ value }) => {
               const pinfl = +value.toString().slice(0, 14)
               editEmployee = { ...editEmployee, pinfl }
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Номер телефона<span class="text-red-500 ml-1">*</span></p>
         <InputNumber
            :maxFractionDigits="0"
            :pt="{ root: {class:['h-[44px] w-[500px] rounded-[12px] bg-greyscale-50 mb-6 text-sm']}, input: {class:['h-[44px] w-[500px] border-transparent focus:border-primary-500 rounded-[12px] bg-greyscale-50 mb-6 text-sm']} }"
            :useGrouping="false"
            placeholder="Введите номер телефона"
            prefix="+99"
            v-model="editEmployee.phone"
            @input="({ value }) => {
               const phone = value && value > 7 ? +value.toString().slice(0, 10) : 8;
               editEmployee = { ...editEmployee, phone }
            }"
            />
         <p class="text-sm text-greyscale-500 font-medium mb-1">Филиал<span class="text-red-500 ml-1">*</span></p>
         <base-auto-complete
            :loading="companiesLoading"
            :options="companies"
            :page="companiesPage"
            :value="company"
            @onInputChange="searchCompanies"
            key="id"
            label="name"
            noOptionsMessage="Филиал не найден"
            placeholder="Введите филиал"
            @onChange="value => {
               company = value;
            }"
            >
            <template #option="{ option }">
               <div class="flex items-center h-11 px-3 text-base">{{ option.name }}</div>
            </template>
         </base-auto-complete>
         <p class="text-sm text-greyscale-500 font-medium mb-1 mt-6">Департамент<span class="text-red-500 ml-1">*</span></p>
         <base-auto-complete
            :loading="topLevelDepartmentsLoading"
            :options="topLevelDepartments"
            :page="topLevelDepartmentsPage"
            :value="topLevelDepartment"
            @onInputChange="searchTopLevelDepartments"
            key="id"
            label="name"
            noOptionsMessage="Департамент не найден"
            placeholder="Введите департамент"
            @onChange="value => {
               topLevelDepartment = value;
            }"
            >
            <template #option="{ option }">
               <div class="flex items-center h-11 px-3 text-base">{{ option.name }}</div>
            </template>
         </base-auto-complete>
         <template v-if="topLevelDepartment?.id">
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
         <p class="text-sm text-greyscale-500 font-medium mb-1 mt-6">Должность<span class="text-red-500 ml-1">*</span></p>
         <base-auto-complete
            :loading="positionsLoading"
            :options="positions"
            :page="positionsPage"
            :value="position"
            @onInputChange="searchPositions"
            key="id"
            label="name"
            noOptionsMessage="Должность не найден"
            placeholder="Введите должность"
            @onChange="value => {
               position = value;
            }"
            >
            <template #option="{ option }">
               <div class="flex items-center h-11 px-3 text-base">{{ option.name }}</div>
            </template>
         </base-auto-complete>
         <p class="text-sm text-greyscale-500 font-medium mb-1 mt-6">Статусь<span class="text-red-500 ml-1">*</span></p>
         <base-auto-complete
            :loading="statusesLoading"
            :options="statuses"
            :page="statusesPage"
            :value="status"
            @onInputChange="searchStatuses"
            key="id"
            label="name"
            noOptionsMessage="Статусь не найден"
            placeholder="Введите статусь"
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
            <template v-if="editLoading">
               <ProgressSpinner class="m-0 w-10 h-10" animationDuration=".5s" strokeWidth="4" />
            </template>
            <template v-else>
               <Button
                  @click="editVisible = false"
                  class="bg-white border-0 shadow-1 text-greyscale-900 p-component font-semibold text-sm rounded-xl !rounded-full py-[10px] px-4 ml-0 mr-3"
                  rounded
                  style="box-shadow: 0px 1px 1px 0px rgba(95, 110, 169, 0.03), 0px 2px 4px 0px rgba(47, 61, 87, 0.03)"
                  type="button">
                  Отмена
               </Button>
               <Button
                  @click="employeeEdit"
                  class="p-button p-component font-semibold text-sm rounded-xl !rounded-full py-[9px] px-4"
                  rounded
                  type="button"
               >Изменить</Button>
            </template>
         </div>
      </template>
   </Dialog>
   <Dialog
      :closable="!deleteLoading"
      :pt="dialogConfig"
      header="Удалить сотрудник"
      modal
      v-model:visible="deleteVisible">
      <div class="flex flex-col items-center pb-10 pt-4">
         <div>
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
               <circle cx="40" cy="40" r="40" fill="#FFEEF2"/>
               <path d="M28 32.6978C28 32.1718 28.4356 31.7454 28.973 31.7454H35.3572C35.3658 30.6237 35.4874 29.0861 36.6005 28.0216C37.4765 27.1839 38.6774 26.666 40 26.666C41.3225 26.666 42.5235 27.1839 43.3995 28.0216C44.5126 29.0861 44.6341 30.6237 44.6428 31.7454H51.027C51.5644 31.7454 52 32.1718 52 32.6978C52 33.2237 51.5644 33.6501 51.027 33.6501H28.973C28.4356 33.6501 28 33.2237 28 32.6978Z" fill="#F3335C"/>
               <path fill-rule="evenodd" clip-rule="evenodd" d="M39.4608 53.3327H40.5392C44.2495 53.3327 46.1046 53.3327 47.3108 52.1514C48.517 50.9702 48.6404 49.0326 48.8872 45.1574L49.2428 39.5735C49.3767 37.4708 49.4437 36.4195 48.8386 35.7533C48.2335 35.0871 47.2116 35.0871 45.1679 35.0871H34.8321C32.7884 35.0871 31.7665 35.0871 31.1614 35.7533C30.5563 36.4195 30.6233 37.4708 30.7572 39.5735L31.1128 45.1574C31.3596 49.0326 31.483 50.9702 32.6892 52.1514C33.8954 53.3327 35.7505 53.3327 39.4608 53.3327ZM37.6617 40.2507C37.6067 39.6722 37.1167 39.2501 36.5672 39.308C36.0176 39.3658 35.6167 39.8817 35.6716 40.4601L36.3383 47.4777C36.3932 48.0561 36.8833 48.4782 37.4328 48.4203C37.9824 48.3625 38.3833 47.8467 38.3284 47.2682L37.6617 40.2507ZM43.4328 39.308C43.9824 39.3658 44.3833 39.8817 44.3284 40.4601L43.6617 47.4777C43.6068 48.0561 43.1167 48.4782 42.5672 48.4203C42.0176 48.3625 41.6167 47.8467 41.6716 47.2682L42.3383 40.2507C42.3933 39.6722 42.8833 39.2501 43.4328 39.308Z" fill="#F3335C"/>
            </svg>
         </div>
         <h2 class="text-center font-semibold text-3xl text-gray-900 p-0 mt-6">Удалить сотрудник?</h2>
         <p class="text-center py-0 px-6 mt-2 text-gray-400">
            Вы уверены, что хотите удалить этого сотрудник
         </p>
      </div>
      <template #footer>
         <div class="flex justify-end">
            <template v-if="deleteLoading">
               <ProgressSpinner class="m-0 w-10 h-10" animationDuration=".5s" strokeWidth="4" />
            </template>
            <template v-else>
               <Button
                  @click="deleteVisible = false"
                  class="bg-white border-0 shadow-1 text-greyscale-900 p-component font-semibold text-sm rounded-xl !rounded-full py-[10px] px-4 ml-0 mr-3"
                  rounded
                  style="box-shadow: 0px 1px 1px 0px rgba(95, 110, 169, 0.03), 0px 2px 4px 0px rgba(47, 61, 87, 0.03)"
                  type="button">
                  Отмена
               </Button>
               <Button
                  @click="employeeDelete"
                  class="p-button p-component font-semibold text-sm rounded-xl !rounded-full py-[9px] px-4"
                  rounded
                  type="button"
               >Удалить</Button>
            </template>
         </div>
      </template>
   </Dialog>
</template>
<style></style>